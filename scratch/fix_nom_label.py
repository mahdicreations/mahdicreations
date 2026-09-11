import re

pages_suffix = [
    ('index.html', 'home'),
    ('services/index.html', 'svc'),
    ('services/creation-web/index.html', 'cw'),
    ('services/seo/index.html', 'seo'),
    ('services/marketing/index.html', 'mkt'),
]

for page, suffix in pages_suffix:
    with open(page, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()
    
    uid = f'cb-name-{suffix}'
    old = '<label class="form-label ">Nom complet *</label>'
    new = f'<label class="form-label" for="{uid}">Nom complet *</label>'
    if old in html:
        html = html.replace(old, new, 1)
        with open(page, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'Fixed {page}')
    elif f'for="{uid}"' in html:
        print(f'Already OK: {page}')
    else:
        m = re.search(r'<label[^>]*>Nom complet', html)
        if m:
            print(f'Unexpected label in {page}: {m.group()[:80]}')
        else:
            print(f'No callback form found: {page}')
