# -*- coding: utf-8 -*-
import glob
import re

html_files = glob.glob("**/*.html", recursive=True)
html_files = [f for f in html_files if not f.startswith("node_modules") and not f.startswith(".")]

valid = 0
invalid = []

for f in sorted(html_files):
    with open(f, "r", encoding="utf-8") as fh:
        content = fh.read()
    
    m = re.search(r'<!--\s*Language Switcher\s*-->\s*<div class="relative group[^"]*">[\s\S]*?</div>\s*</div>', content)
    if m:
        block = m.group(0)
        m_fr = re.search(r'<a\s+href=["\']([^"\']+)["\'][^>]*hreflang=["\']fr["\']', block)
        m_en = re.search(r'<a\s+href=["\']([^"\']+)["\'][^>]*hreflang=["\']en["\']', block)
        m_ar = re.search(r'<a\s+href=["\']([^"\']+)["\'][^>]*hreflang=["\']ar["\']', block)
        if m_fr and m_en and m_ar:
            valid += 1
        else:
            invalid.append((f, bool(m_fr), bool(m_en), bool(m_ar)))

print(f"Valid URLs: {valid} / {len(html_files)}")
if invalid:
    print("Invalid:", invalid)
