# -*- coding: utf-8 -*-
import glob
import re

html_files = glob.glob("**/*.html", recursive=True)
html_files = [f for f in html_files if not f.startswith("node_modules") and not f.startswith(".")]

canonicals = []
for f in sorted(html_files):
    with open(f, "r", encoding="utf-8") as fh:
        c = fh.read()
    m = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']', c)
    if m:
        canonicals.append((f, m.group(1)))

print(f"Total canonicals found: {len(canonicals)}")
slash_can = [c for c in canonicals if c[1].endswith("/")]
no_slash_can = [c for c in canonicals if not c[1].endswith("/")]
print(f"Canonicals ending with /: {len(slash_can)}")
print(f"Canonicals NOT ending with /: {len(no_slash_can)}")

print("\nCanonicals ending with /:")
for f, u in slash_can:
    print(f"  {f} -> {u}")

print("\nCanonicals NOT ending with / (first 10):")
for f, u in no_slash_can[:10]:
    print(f"  {f} -> {u}")
