# -*- coding: utf-8 -*-
import io
import re

with open("sitemap.xml", "r", encoding="utf-8") as f:
    lines = f.readlines()

locs = []
links = []

for line in lines:
    m_loc = re.search(r'<loc>(.*?)</loc>', line)
    if m_loc:
        locs.append(m_loc.group(1))
    m_link = re.search(r'href="(.*?)"', line)
    if m_link:
        links.append(m_link.group(1))

print(f"Total <loc>: {len(locs)}")
slash_locs = [u for u in locs if u.endswith("/")]
no_slash_locs = [u for u in locs if not u.endswith("/")]
print(f"Locs ending with /: {len(slash_locs)}")
print(f"Locs NOT ending with /: {len(no_slash_locs)}")

print("\nExamples of locs ending with /:")
for u in slash_locs[:10]:
    print(" ", u)

print("\nExamples of locs NOT ending with /:")
for u in no_slash_locs[:10]:
    print(" ", u)
