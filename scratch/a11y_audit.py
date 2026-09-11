import re, os, gzip, urllib.request

# ────────────────────────────────────────────────
# Accessibility audit – callback form labels
# ────────────────────────────────────────────────

pages = [
    'index.html',
    'contact/index.html',
    'services/index.html',
    'services/creation-web/index.html',
    'services/seo/index.html',
    'services/marketing/index.html',
]

print("=== FORM LABEL / INPUT ASSOCIATION ===")
for page in pages:
    with open(page, encoding='utf-8', errors='replace') as f:
        html = f.read()

    # find all callback-form blocks
    cb_blocks = re.findall(r'class="callback-form[^"]*".*?</form>', html, re.DOTALL)
    if not cb_blocks:
        continue
    print(f"\n--- {page} ---")
    for i, block in enumerate(cb_blocks, 1):
        labels = re.findall(r'<label[^>]*>(.*?)</label>', block, re.DOTALL)
        inputs = re.findall(r'<input[^>]+>', block)
        for_attrs = re.findall(r'for="([^"]+)"', block)
        input_ids = re.findall(r'id="([^"]+)"', block)
        print(f"  Block {i}: {len(labels)} labels, {len(inputs)} inputs")
        print(f"    Labels: {[l.strip()[:40] for l in labels]}")
        print(f"    Label for= attrs: {for_attrs}")
        print(f"    Input id= attrs: {input_ids}")
        # Check: labels should either have `for` pointing to input `id`, OR wrap the input
        # Callback form currently uses implicit labeling (label wraps input or uses data-field)
        if not for_attrs and not input_ids:
            print("    WARNING: No for/id association - labels are implicit (visual only)")
        elif set(for_attrs) != set(input_ids):
            print(f"    WARNING: for/id mismatch: for={for_attrs} vs id={input_ids}")
        else:
            print("    OK: for/id association correct")

# ────────────────────────────────────────────────
# Check heading order in index.html
# ────────────────────────────────────────────────
print("\n=== HEADING ORDER (index.html) ===")
with open('index.html', encoding='utf-8', errors='replace') as f:
    html = f.read()

headings = re.findall(r'<(h[1-6])[^>]*>(.*?)</\1>', html, re.DOTALL | re.IGNORECASE)
order = [h[0] for h in headings[:30]]
texts = [re.sub(r'<[^>]+>', '', h[1]).strip()[:50] for h in headings[:30]]
for i, (tag, text) in enumerate(zip(order, texts)):
    print(f"  {tag}: {text.replace(chr(10),' ')}")

# ────────────────────────────────────────────────
# Check for label `for` on main contact form
# ────────────────────────────────────────────────
print("\n=== CONTACT FORM (contact/index.html) ===")
with open('contact/index.html', encoding='utf-8', errors='replace') as f:
    chtml = f.read()

# Find main contact-form block
cform = re.search(r'id="contact-form".*?</form>', chtml, re.DOTALL)
if cform:
    block = cform.group()
    fors = re.findall(r'for="([^"]+)"', block)
    ids = re.findall(r'id="([^"]+)"', block)
    print(f"  label for= attrs: {fors}")
    print(f"  input id= attrs: {ids}")
    if set(fors) == set(ids):
        print("  OK: All labels correctly associated via for/id")
    else:
        missing = set(fors) - set(ids)
        print(f"  WARNING: Unmatched for attrs: {missing}")

# ────────────────────────────────────────────────
# Check for-attr on callback form in contact page
# ────────────────────────────────────────────────
print("\n=== CALLBACK FORM LABELS (contact/index.html) ===")
cb = re.search(r'class="callback-form.*?</form>', chtml, re.DOTALL)
if cb:
    block = cb.group()
    fors = re.findall(r'for="([^"]+)"', block)
    ids = re.findall(r'id="([^"]+)"', block)
    labels = re.findall(r'<label[^>]*>(.*?)</label>', block, re.DOTALL)
    print(f"  labels: {[l.strip()[:40] for l in labels]}")
    print(f"  for attrs: {fors}")
    print(f"  input ids: {ids}")
    if not fors:
        print("  INFO: Callback form uses implicit labeling (no for/id) - AT risk")

# ────────────────────────────────────────────────
# localStorage / tracking check in main.js
# ────────────────────────────────────────────────
print("\n=== TRACKING IN main.js ===")
with open('assets/js/main.js', encoding='utf-8', errors='replace') as f:
    js = f.read()
print("  localStorage:", 'localStorage' in js)
print("  document.cookie:", 'document.cookie' in js)
print("  sessionStorage:", 'sessionStorage' in js)
print("  IndexedDB:", 'indexedDB' in js)
print("  gtag (shouldn't be here):", 'gtag' in js)
print("  fetch /contact/send-mail.php:", '/contact/send-mail.php' in js)

# ────────────────────────────────────────────────
# Check .htaccess 404 does not serve 200
# ────────────────────────────────────────────────
print("\n=== 404 HANDLING ===")
try:
    req = urllib.request.Request('http://localhost:4000/this-does-not-exist')
    with urllib.request.urlopen(req) as r:
        print(f"  /this-does-not-exist: {r.status} (PROBLEM: should be 404)")
except urllib.error.HTTPError as e:
    print(f"  /this-does-not-exist: {e.code} (OK: returns 404)")
except Exception as e:
    print(f"  /this-does-not-exist: ERROR {e}")

# sitemap check 
print("\n=== SITEMAP ENTRIES ===")
req2 = urllib.request.Request('http://localhost:4000/sitemap.xml')
with urllib.request.urlopen(req2) as r:
    sitemap_text = r.read().decode('utf-8')
urls = re.findall(r'<loc>(.*?)</loc>', sitemap_text)
print(f"  Total URLs in sitemap: {len(urls)}")
for url in urls:
    print(f"    {url}")
