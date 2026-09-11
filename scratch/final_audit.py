import urllib.request, re, os, gzip

def fetch(url):
    req = urllib.request.Request(url, headers={'Accept-Encoding': 'identity'})
    with urllib.request.urlopen(req) as r:
        return r.read().decode('utf-8', errors='replace'), r.status, dict(r.headers)

html, status, hdrs = fetch('http://localhost:4000/')
print('HTTP status:', status)
print('Set-Cookie header:', hdrs.get('Set-cookie', 'NONE'))
print()

# CSS loaded
css_matches = re.findall(r'href="(/assets/css/[^"]+)"', html)
print('Stylesheet links:', css_matches)

# JS loaded
js_matches = re.findall(r'src="(/assets/js/[^"]+)"', html)
print('Script sources:', js_matches)

# Favicon
fav = re.findall(r'rel="icon"[^>]+', html)
print('Favicon links count:', len(fav))

# Preloaded fonts
fonts = re.findall(r'href="(/assets/fonts/[^"]+)"', html)
print('Preloaded fonts:', fonts)

# GA
print('GA ID G-EY4LVT535S present:', 'G-EY4LVT535S' in html)
print('GA deferred (loadGtag):', 'loadGtag' in html)
print('gtag.js in critical path (script src in head):', bool(re.search(r'<head>.*?googletagmanager\.com/gtag/js.*?</head>', html, re.DOTALL)))

# localStorage / cookie tracking
print('localStorage in HTML:', 'localStorage' in html)
print('document.cookie in HTML:', 'document.cookie' in html)
print('cookiebanner / consent strings:', any(x in html.lower() for x in ['cookie-banner', 'cookieconsent', 'cookie-consent', 'cookie banner']))

# Forms
forms = re.findall(r'action="/contact/send-mail\.php"', html)
print('Callback forms pointing to /contact/send-mail.php:', len(forms))

# Tawk
print('Tawk.to present:', 'tawk' in html.lower())

# Headings
h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
print('h1 count:', len(h1s))
if h1s:
    print('h1 text (truncated):', h1s[0][:80].strip().replace('\n', ' '))

# Robots / canonical
robots = re.findall(r'<meta name="robots" content="([^"]+)"', html)
print('Robots meta:', robots)
canonical = re.findall(r'<link rel="canonical" href="([^"]+)"', html)
print('Canonical URL:', canonical)

# Google Fonts render-blocking check
gfonts_blocking = bool(re.search(r'<link[^>]+rel="stylesheet"[^>]+fonts\.googleapis\.com', html))
print('Google Fonts blocking stylesheet in head:', gfonts_blocking)

# Check for preload+onload pattern (non-blocking)
gfonts_preload = bool(re.search(r'rel="preload"[^>]+fonts\.googleapis\.com', html))
print('Google Fonts preload (non-blocking):', gfonts_preload)

print()
print("=== HTTP 200 for all key assets ===")
key_assets = [
    '/assets/css/style.min.css?v=6',
    '/assets/js/main.min.js?v=6',
    '/assets/fonts/inter-latin.woff2',
    '/assets/fonts/cormorant-garamond-latin.woff2',
    '/favicon.ico',
    '/favicon-32x32.png',
    '/apple-touch-icon.png',
    '/sitemap.xml',
    '/robots.txt',
]
for path in key_assets:
    try:
        req2 = urllib.request.Request(f'http://localhost:4000{path}')
        with urllib.request.urlopen(req2) as r:
            ct = r.headers.get('Content-Type', '')
            print(f'  {r.status} {path} [{ct[:30]}]')
    except Exception as e:
        print(f'  ERROR {path}: {e}')
