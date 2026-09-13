# -*- coding: utf-8 -*-
import glob
import re
import os

html_files = glob.glob("**/*.html", recursive=True)
html_files = [f for f in html_files if not f.startswith("node_modules") and not f.startswith(".")]

matched = []
unmatched = []

for f in sorted(html_files):
    with open(f, "r", encoding="utf-8") as fh:
        content = fh.read()
    
    # Pattern to find the language switcher block
    m = re.search(r'<!--\s*Language Switcher\s*-->\s*<div class="relative group[^"]*">[\s\S]*?</div>\s*</div>', content)
    if m:
        matched.append(f)
    else:
        unmatched.append(f)

print(f"Matched: {len(matched)} / {len(html_files)}")
if unmatched:
    print("Unmatched files:", unmatched)
