# -*- coding: utf-8 -*-
import xml.etree.ElementTree as ET
import re

# Read sitemap without the duplicate namespace first to parse it
with open("sitemap.xml", "r", encoding="utf-8") as f:
    xml_text = f.read()

# Fix duplicate attribute for parsing test
clean_xml = xml_text.replace('xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xhtml="http://www.w3.org/1999/xhtml"', 'xmlns:xhtml="http://www.w3.org/1999/xhtml"')

root = ET.fromstring(clean_xml)
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'xhtml': 'http://www.w3.org/1999/xhtml'}

print(f"Total URL elements in sitemap: {len(root.findall('s:url', ns))}")

inconsistencies = []

for url_el in root.findall('s:url', ns):
    loc = url_el.find('s:loc', ns).text
    links = [l.get('href') for l in url_el.findall('xhtml:link', ns)]
    
    # Check if loc ends with slash
    # If it's the root domain https://mahdicreations.dev or https://mahdicreations.dev/
    for href in links:
        # Check if there's a mismatch in trailing slash for same path
        # e.g., loc without slash vs link with slash or vice versa
        pass

# List all locs
for url_el in root.findall('s:url', ns):
    loc = url_el.find('s:loc', ns).text
    links = {l.get('hreflang'): l.get('href') for l in url_el.findall('xhtml:link', ns)}
    print(f"LOC: {loc}")
    for lang, href in links.items():
        if (loc.rstrip('/') == href.rstrip('/')) and (loc != href):
            print(f"  MISMATCH: loc={loc} vs {lang}_link={href}")
