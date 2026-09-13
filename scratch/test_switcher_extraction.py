# -*- coding: utf-8 -*-
import glob
import re

sample_files = [
    'index.html', 'ar/index.html', 'en/index.html',
    'services/index.html', 'ar/services/index.html', 'en/services/index.html',
    'services/ia-souveraine/index.html', 'ar/services/ia-souveraine/index.html', 'en/services/ia-souveraine/index.html'
]

for f in sample_files:
    with open(f, encoding='utf-8') as fh:
        c = fh.read()
    
    fr_href = re.search(r'<a\s+href=["\']([^"\']+)["\'][^>]*hreflang=["\']fr["\']', c)
    en_href = re.search(r'<a\s+href=["\']([^"\']+)["\'][^>]*hreflang=["\']en["\']', c)
    ar_href = re.search(r'<a\s+href=["\']([^"\']+)["\'][^>]*hreflang=["\']ar["\']', c)
    print(f, '-> FR:', fr_href.group(1) if fr_href else 'NONE',
             '| EN:', en_href.group(1) if en_href else 'NONE',
             '| AR:', ar_href.group(1) if ar_href else 'NONE')
