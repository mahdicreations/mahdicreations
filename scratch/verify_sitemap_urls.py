# -*- coding: utf-8 -*-
import re

with open("sitemap.xml", "r", encoding="utf-8") as f:
    text = f.read()

# Let's inspect all <xhtml:link> and <loc> tags
urls = re.findall(r'(?:<loc>|href=")(https://mahdicreations\.dev[^"<]+)', text)
print(f"Total URL occurrences in sitemap.xml: {len(urls)}")

# Check distinct URLs
distinct_urls = sorted(list(set(urls)))
print(f"Distinct URLs: {len(distinct_urls)}")

for u in distinct_urls:
    path = u.replace("https://mahdicreations.dev", "")
    if path in ["", "/", "/en/", "/ar/"]:
        print(f"ROOT/LANG HOME: {u}")
    else:
        if u.endswith("/"):
            print(f"WARNING: Subpage with trailing slash: {u}")

print("\nChecking if any loc doesn't match canonicals in files...")
