<?php
/**
 * Mahdi Créations — contact/send-mail.php
 * Secure Contact & Callback API endpoint
 * Replaces old form handler with hardened validation, anti-bot & rate limiting
 */

// Safe UTF-8 handling
if (function_exists('mb_internal_encoding')) {
    mb_internal_encoding('UTF-8');
}

// Handle CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://mahdicreations.dev');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, X-Test-Request');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée.']);
    exit;
}

// ── Rate Limiting (Max 5 submissions per IP per hour) ──
$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$ipHash = md5($ip . '_mc_salt_2026');
$rateLimitFile = sys_get_temp_dir() . '/mc_rl_' . $ipHash . '.json';

$now = time();
$attempts = [];
if (file_exists($rateLimitFile)) {
    $content = @file_get_contents($rateLimitFile);
    $data = json_decode($content, true);
    if (is_array($data)) {
        // Keep attempts from the last 3600 seconds
        $attempts = array_filter($data, function($t) use ($now) {
            return ($now - $t) < 3600;
        });
    }
}

if (count($attempts) >= 5) {
    http_response_code(429);
    logRejection($ip, 'rate_limit_exceeded');
    echo json_encode(['error' => 'Trop de demandes. Veuillez patienter avant de réessayer ou nous contacter sur WhatsApp.']);
    exit;
}

// Record attempt
$attempts[] = $now;
@file_put_contents($rateLimitFile, json_encode($attempts), LOCK_EX);

// ── Read + Parse Input (JSON or standard POST) ──
$isJson = false;
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$raw = file_get_contents('php://input');
if (empty($raw) && php_sapi_name() === 'cli') {
    $raw = file_get_contents('php://stdin');
}

$input = json_decode($raw, true);
if ($input && is_array($input)) {
    $isJson = true;
} else {
    $input = $_POST;
}

// Honeypot check: 'website_url' must be empty
if (!empty($input['website_url'])) {
    logRejection($ip, 'honeypot_triggered');
    // Pretend success to bot without sending email
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès.']);
    exit;
}

// Submission Timing check: refuse if under 3 seconds
if (isset($input['form_time'])) {
    $formTime = (int)$input['form_time'];
    if ($formTime > 100000000000) { $formTime = (int)($formTime / 1000); }
    if ($formTime > 0 && ($now - $formTime) < 3) {
        logRejection($ip, 'submission_too_fast');
        http_response_code(400);
        echo json_encode(['error' => 'Envoi trop rapide. Veuillez patienter quelques secondes.']);
        exit;
    }
}

// Sanitize & Validate fields
$type     = sanitize($input['type'] ?? 'contact', 20);
$name     = sanitize($input['name'] ?? '', 100);
$email    = sanitize($input['email'] ?? '', 150);
$phone    = sanitize($input['phone'] ?? '', 30);
$service  = sanitize($input['service'] ?? '', 100);
$message  = sanitize($input['message'] ?? '', 3000);
$callDate = sanitize($input['callDate'] ?? '', 50);

// Prevent CRLF Injection in headers
if (hasCrlf($name) || hasCrlf($email) || hasCrlf($phone) || hasCrlf($service)) {
    logRejection($ip, 'crlf_detected');
    http_response_code(400);
    echo json_encode(['error' => 'Caractères non autorisés détectés.']);
    exit;
}

// Validation based on type
if ($type === 'callback') {
    if (empty($name) || empty($phone)) {
        http_response_code(400);
        echo json_encode(['error' => 'Le nom et le numéro de téléphone sont obligatoires.']);
        exit;
    }
} else {
    // All 5 fields required for contact form (as per asterisks)
    if (empty($name) || empty($email) || empty($phone) || empty($service) || empty($message)) {
        http_response_code(400);
        echo json_encode(['error' => 'Tous les champs obligatoires (*) doivent être remplis.']);
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Adresse email invalide.']);
        exit;
    }
}

// Validate phone characters
if (!preg_match('/^[0-9+()\s.-]{6,25}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Numéro de téléphone invalide.']);
    exit;
}

// Test Mode: Never send real emails in test mode!
$isTest = !empty($_SERVER['HTTP_X_TEST_REQUEST']) || !empty($input['is_test']);
if ($isTest) {
    echo json_encode(['success' => true, 'message' => '[TEST MODE] Validated successfully without sending email.']);
    exit;
}

// SMTP credentials (prefer env var, fallback to current Hostinger config)
define('SMTP_HOST', getenv('SMTP_HOST') ?: 'smtp.hostinger.com');
define('SMTP_PORT', (int)(getenv('SMTP_PORT') ?: 465));
define('SMTP_USER', getenv('SMTP_USER') ?: 'contact@mahdicreations.dev');
define('SMTP_PASS', getenv('SMTP_PASS') ?: 'aAA1991369@@');
define('SMTP_FROM_NAME', 'Mahdi Créations');
define('SMTP_FROM_EMAIL', 'contact@mahdicreations.dev');
define('CONTACT_RECEIVER', getenv('CONTACT_RECEIVER') ?: 'mahdicreation.group@gmail.com');

// Build email content
if ($type === 'callback') {
    $dateLabel = $callDate ? $callDate : 'Au plus vite';
    $subject = "[Demande de Rappel] {$name} - {$dateLabel}";
    $formattedDate = $callDate ? date('d/m/Y à H:i', strtotime($callDate)) : 'Dès que possible';
    $body = buildCallbackHtml($name, $phone, $formattedDate);
} else {
    $subject = "[Nouveau Contact] {$name}" . ($service ? " ({$service})" : '');
    $body = buildContactHtml($name, $email, $phone, $service, $message);
}

// Send via SMTP
$result = sendMail(CONTACT_RECEIVER, $subject, $body);

if ($result === true) {
    if (!$isJson) {
        header('Location: /contact/?status=success');
        exit;
    }
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès.']);
} else {
    if (!$isJson) {
        header('Location: /contact/?status=error');
        exit;
    }
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de l\'envoi: ' . $result]);
}

// ────────────────────────────────────────────────────────────
// Helper Functions
// ────────────────────────────────────────────────────────────

function sanitize($val, $maxLen = 500) {
    $clean = htmlspecialchars(strip_tags(trim((string)$val)), ENT_QUOTES, 'UTF-8');
    return function_exists('mb_substr') ? mb_substr($clean, 0, $maxLen, 'UTF-8') : substr($clean, 0, $maxLen);
}

function hasCrlf($str) {
    return preg_match('/[\r\n]/', (string)$str);
}

function logRejection($ip, $reason) {
    $logFile = sys_get_temp_dir() . '/mc_contact_rejections.log';
    $anonymizedIp = preg_replace('/(\d+)\.(\d+)\.(\d+)\.(\d+)/', '$1.$2.xxx.xxx', $ip);
    $entry = date('Y-m-d H:i:s') . " | IP: {$anonymizedIp} | Reason: {$reason}\n";
    @file_put_contents($logFile, $entry, FILE_APPEND | LOCK_EX);
}

function sendMail($to, $subject, $htmlBody) {
    $smtp = new SimpleSMTP(SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS);
    return $smtp->send(
        SMTP_FROM_EMAIL,
        SMTP_FROM_NAME,
        $to,
        $subject,
        $htmlBody
    );
}

function buildContactHtml($name, $email, $phone, $service, $message) {
    $safePhone = preg_replace('/[^0-9+]/', '', $phone);
    return <<<HTML
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;">
  <div style="text-align:center;margin-bottom:20px;border-bottom:2px solid #c9960c;padding-bottom:15px;">
    <h1 style="color:#111827;margin:0;font-size:24px;">Mahdi Créations</h1>
    <p style="color:#6B7280;margin:5px 0 0;font-size:14px;">Nouveau message de contact</p>
  </div>
  <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:10px 0;font-weight:bold;color:#374151;width:35%;">Nom :</td><td style="padding:10px 0;color:#4B5563;">{$name}</td></tr>
    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:10px 0;font-weight:bold;color:#374151;">Email :</td><td style="padding:10px 0;color:#4B5563;"><a href="mailto:{$email}" style="color:#c9960c;">{$email}</a></td></tr>
    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:10px 0;font-weight:bold;color:#374151;">Téléphone :</td><td style="padding:10px 0;color:#4B5563;"><a href="tel:{$phone}" style="color:#c9960c;font-weight:bold;">{$phone}</a> | <a href="https://wa.me/{$safePhone}" style="color:#25D366;font-weight:bold;">WhatsApp</a></td></tr>
    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:10px 0;font-weight:bold;color:#374151;">Service :</td><td style="padding:10px 0;color:#4B5563;font-weight:bold;">{$service}</td></tr>
  </table>
  <div style="background:#f9fafb;border-left:4px solid #c9960c;padding:15px;border-radius:4px;">
    <h3 style="margin:0 0 10px;font-size:14px;color:#374151;">Description du projet :</h3>
    <p style="margin:0;color:#4B5563;font-size:14px;line-height:1.6;white-space:pre-wrap;">{$message}</p>
  </div>
  <p style="font-size:11px;color:#9CA3AF;text-align:center;margin-top:20px;">Envoyé depuis le formulaire de contact de mahdicreations.dev</p>
</div>
HTML;
}

function buildCallbackHtml($name, $phone, $formattedDate) {
    $safePhone = preg_replace('/[^0-9+]/', '', $phone);
    return <<<HTML
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;">
  <div style="text-align:center;margin-bottom:20px;border-bottom:2px solid #c9960c;padding-bottom:15px;">
    <h1 style="color:#111827;margin:0;font-size:24px;">Mahdi Créations</h1>
    <p style="color:#6B7280;margin:5px 0 0;font-size:14px;">Demande de rappel téléphonique</p>
  </div>
  <table style="width:100%;border-collapse:collapse;">
    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:10px 0;font-weight:bold;color:#374151;width:35%;">Nom :</td><td style="padding:10px 0;color:#4B5563;">{$name}</td></tr>
    <tr style="border-bottom:1px solid #f3f4f6;"><td style="padding:10px 0;font-weight:bold;color:#374151;">Téléphone :</td><td style="padding:10px 0;color:#4B5563;"><a href="tel:{$phone}" style="color:#c9960c;font-weight:bold;">{$phone}</a> | <a href="https://wa.me/{$safePhone}" style="color:#25D366;">WhatsApp</a></td></tr>
    <tr><td style="padding:10px 0;font-weight:bold;color:#374151;">Date & Heure :</td><td style="padding:10px 0;color:#4B5563;font-weight:bold;">{$formattedDate}</td></tr>
  </table>
  <p style="font-size:11px;color:#9CA3AF;text-align:center;margin-top:20px;">Envoyé depuis le formulaire de rappel de mahdicreations.dev</p>
</div>
HTML;
}

class SimpleSMTP {
    private $host;
    private $port;
    private $user;
    private $pass;
    private $conn;

    public function __construct($host, $port, $user, $pass) {
        $this->host = $host;
        $this->port = $port;
        $this->user = $user;
        $this->pass = $pass;
    }

    public function send($fromEmail, $fromName, $to, $subject, $htmlBody) {
        try {
            $prefix = ($this->port == 465) ? 'ssl://' : 'tls://';
            $this->conn = @fsockopen($prefix . $this->host, $this->port, $errno, $errstr, 15);
            if (!$this->conn) {
                $altPrefix = ($prefix === 'ssl://') ? 'tls://' : 'ssl://';
                $this->conn = @fsockopen($altPrefix . $this->host, $this->port, $errno, $errstr, 15);
                if (!$this->conn) {
                    $this->conn = @fsockopen($this->host, $this->port, $errno, $errstr, 15);
                    if (!$this->conn) return "Connexion SMTP impossible: {$errstr} (code: {$errno})";
                }
            }
            stream_set_timeout($this->conn, 15);

            $r = $this->read();
            if (substr($r, 0, 3) !== '220') return "Erreur d'accueil SMTP: {$r}";

            $r = $this->cmd("EHLO mahdicreations.dev");
            if (substr($r, 0, 1) > '3') return "Erreur EHLO: {$r}";

            $r = $this->cmd("AUTH LOGIN");
            if (substr($r, 0, 1) > '3') return "Erreur AUTH LOGIN: {$r}";

            $r = $this->cmd(base64_encode($this->user));
            if (substr($r, 0, 1) > '3') return "Erreur identifiant SMTP: {$r}";

            $r = $this->cmd(base64_encode($this->pass));
            if (substr($r, 0, 1) > '3') return "Erreur mot de passe SMTP: {$r}";

            $r = $this->cmd("MAIL FROM:<{$fromEmail}>");
            if (substr($r, 0, 1) > '3') return "Erreur MAIL FROM ({$fromEmail}): {$r}";

            $r = $this->cmd("RCPT TO:<{$to}>");
            if (substr($r, 0, 1) > '3') return "Erreur RCPT TO ({$to}): {$r}";

            $r = $this->cmd("DATA");
            if (substr($r, 0, 1) > '3') return "Erreur DATA: {$r}";

            $headers  = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>\r\n";
            $headers .= "To: {$to}\r\n";
            $headers .= "Reply-To: <{$fromEmail}>\r\n";
            $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            $headers .= "Content-Transfer-Encoding: base64\r\n";
            $headers .= "X-Mailer: MahdiCreations-PHP\r\n";

            $encodedBody = chunk_split(base64_encode($htmlBody));
            $this->write($headers . "\r\n" . $encodedBody . "\r\n.\r\n");
            $r = $this->read();
            if (substr($r, 0, 1) > '3') return "Erreur transmission corps du message: {$r}";

            $this->cmd("QUIT");
            fclose($this->conn);
            return true;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    private function cmd($str) {
        $this->write($str . "\r\n");
        return $this->read();
    }

    private function write($str) {
        fwrite($this->conn, $str);
    }

    private function read() {
        $response = '';
        while ($line = fgets($this->conn, 515)) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return $response;
    }
}
