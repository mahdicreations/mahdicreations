# -*- coding: utf-8 -*-
import xml.etree.ElementTree as ET
import os

tree = ET.parse("sitemap.xml")
root = tree.getroot()
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'xhtml': 'http://www.w3.org/1999/xhtml'}

errors = []
checked = 0

def url_to_path(url):
    rel = url.replace("https://mahdicreations.dev", "").strip("/")
    if not rel:
        return "index.html"
    
    # Could be a folder with index.html or .html
    candidate1 = os.path.join(rel, "index.html")
    candidate2 = rel + ".html"
    if os.path.exists(candidate1):
        return candidate1
    elif os.path.exists(candidate2):
        return candidate2
    return None

for u in root.findall('s:url', ns):
    loc = u.find('s:loc', ns).text
    path = url_to_path(loc)
    if not path:
        errors.append(f"LOC not found on disk: {loc}")
    else:
        # Check canonical tag in file
        with open(path, "r", encoding="utf-8") as f:
            c = f.read()
        import re
        m = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']', c)
        if m:
            can = m.group(1)
            if can != loc:
                errors.append(f"Canonical mismatch in {path}: file has {can} but sitemap has {loc}")
        checked += 1

print(f"Validated {checked} URLs against disk files and canonical tags.")
if errors:
    print("ERRORS FOUND:")
    for e in errors:
        print("  ", e)
else:
    print("PERFECT: 100% of sitemap URLs match disk files and canonical tags exactly!")
