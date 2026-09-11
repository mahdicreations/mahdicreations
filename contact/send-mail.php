<?php
/**
 * Mahdi Créations — contact.php
 * Brevo SMTP mailer — replaces Next.js /api/contact route
 * Deploy at: /api/contact.php on your Apache/PHP server
 *
 * PHPMailer is used for reliable SMTP delivery.
 * Install via: composer require phpmailer/phpmailer
 * OR use the bundled PHPMailer class below (no composer needed).
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée.']);
    exit;
}

// ── SMTP Configuration (Hostinger) ──
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 465);
define('SMTP_USER', 'contact@mahdicreations.dev');
define('SMTP_PASS', 'aAA1991369@@');
define('SMTP_FROM_NAME', 'Mahdi Créations');
define('SMTP_FROM_EMAIL', 'contact@mahdicreations.dev');
define('CONTACT_RECEIVER', 'mahdicreation.group@gmail.com');

// ── Read + Sanitize Input (JSON or standard POST) ──
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data && !empty($_POST)) {
    $data = $_POST;
}

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Données invalides ou formulaire vide.']);
    exit;
}

$type     = isset($data['type'])     ? sanitize($data['type'])     : 'contact';
$name     = isset($data['name'])     ? sanitize($data['name'])     : '';
$phone    = isset($data['phone'])    ? sanitize($data['phone'])    : '';
$email    = isset($data['email'])    ? sanitize($data['email'])    : '';
$service  = isset($data['service'])  ? sanitize($data['service'])  : '';
$message  = isset($data['message'])  ? sanitize($data['message'])  : '';
$callDate = isset($data['callDate']) ? sanitize($data['callDate']) : '';

// Basic validation
if (!$name || !$phone) {
    http_response_code(400);
    echo json_encode(['error' => 'Le nom et le numéro de téléphone sont obligatoires.']);
    exit;
}

// ── Build Email Content ──
if ($type === 'callback') {
    $dateLabel = $callDate ? $callDate : 'Au plus vite';
    $subject = "[Demande de Rappel] {$name} - {$dateLabel}";
    $formattedDate = $callDate ? date('d/m/Y à H:i', strtotime($callDate)) : 'Dès que possible';
    $body = buildCallbackHtml($name, $phone, $formattedDate);
} else {
    $subject = "[Nouveau Contact] {$name}" . ($service ? " ({$service})" : '');
    $body = buildContactHtml($name, $email, $phone, $service, $message);
}

// ── Send via SMTP ──
$result = sendMail(CONTACT_RECEIVER, $subject, $body);

if ($result === true) {
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès.']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de l\'envoi: ' . $result]);
}

// ────────────────────────────────────────────────────────────
// Functions
// ────────────────────────────────────────────────────────────

function sanitize($val) {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

function sendMail($to, $subject, $htmlBody) {
    // Use socket-based SMTP (no external dependency)
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
  <p style="font-size:11px;color:#9CA3AF;text-align:center;margin-top:20px;">Envoyé depuis le formulaire de contact de mahdicreations.ma</p>
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
  <p style="font-size:11px;color:#9CA3AF;text-align:center;margin-top:20px;">Envoyé depuis le formulaire de rappel de mahdicreations.ma</p>
</div>
HTML;
}

// ────────────────────────────────────────────────────────────
// SimpleSMTP — lightweight SMTP client (no composer needed)
// ────────────────────────────────────────────────────────────
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
            if (substr($r, 0, 1) > '3') return "Erreur identifiant SMTP ({$this->user}): {$r}";

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
