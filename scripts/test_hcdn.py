import urllib.request, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers_list = [
    ('Standard Chrome Desktop', {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'fr,fr-FR;q=0.9,en;q=0.8'
    }),
    ('Mobile Chrome Android', {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }),
    ('Googlebot Smartphone', {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.118 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': '*/*'
    }),
    ('Googlebot Desktop', {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': '*/*'
    }),
    ('Google Search Console / Inspection Bot', {
        'User-Agent': 'Google-InspectionTool/1.0',
        'Accept': '*/*'
    })
]

url = 'https://mahdicreations.dev/'

for name, h in headers_list:
    print(f"\n==========================================")
    print(f"Testing User-Agent: {name}")
    print(f"==========================================")
    try:
        req = urllib.request.Request(url, headers=h)
        with urllib.request.urlopen(req, context=ctx, timeout=12) as resp:
            print(f"HTTP Status: {resp.status}")
            print("Headers:")
            for k, v in resp.headers.items():
                if any(x in k.lower() for x in ['server', 'cf-', 'x-', 'strict', 'content-security', 'permissions', 'set-cookie', 'cache-control', 'refresh']):
                    print(f"  {k}: {v}")
            body = resp.read().decode('utf-8', errors='ignore')
            title = 'No <title>'
            if '<title>' in body:
                title = body.split('<title>')[1].split('</title>')[0]
            print(f"Title: {title.strip()}")
            has_challenge = "checking your browser" in body.lower() or "just a moment" in body.lower()
            has_noindex = "noindex" in body.lower()
            has_real_content = "Mahdi Créations" in body or "Mahdi Cr" in body
            print(f"Challenge Screen Detected: {has_challenge}")
            print(f"Noindex Detected: {has_noindex}")
            print(f"Real Content Present: {has_real_content}")
            print(f"Body size: {len(body)} characters")
    except urllib.error.HTTPError as e:
        print(f"HTTPError: {e.code}")
        body = e.read().decode('utf-8', errors='ignore')
        print(f"Snippet: {body[:250]}")
    except Exception as e:
        print(f"Error: {e}")
