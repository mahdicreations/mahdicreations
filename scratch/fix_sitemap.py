# -*- coding: utf-8 -*-
import xml.etree.ElementTree as ET
import re

with open("sitemap.xml", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix duplicate xmlns:xhtml
content = content.replace(
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
)

# 2. Harmonize root URL with trailing slash (matching index.html canonical <link rel="canonical" href="https://mahdicreations.dev/">)
# Only replace when it's precisely the root domain (followed by </loc> or " or '):
content = re.sub(r'<loc>https://mahdicreations\.dev</loc>', r'<loc>https://mahdicreations.dev/</loc>', content)
content = re.sub(r'href="https://mahdicreations\.dev"', r'href="https://mahdicreations.dev/"', content)

with open("sitemap.xml", "w", encoding="utf-8") as f:
    f.write(content)

# 3. Validate XML
try:
    tree = ET.parse("sitemap.xml")
    root = tree.getroot()
    print("SUCCESS: sitemap.xml is 100% valid XML!")
    print(f"Root tag: {root.tag}")
    
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'xhtml': 'http://www.w3.org/1999/xhtml'}
    urls = root.findall('s:url', ns)
    print(f"Total <url> entries: {len(urls)}")
    
    # Check consistency
    for u in urls:
        loc = u.find('s:loc', ns).text
        # Verify no double slashes like // except after https:
        assert '//' not in loc.replace('https://', ''), f"Double slash in {loc}"
        
    print("ALL checks passed successfully!")

except Exception as e:
    print(f"ERROR validating XML: {e}")
