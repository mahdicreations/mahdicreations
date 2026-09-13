# -*- coding: utf-8 -*-
import glob
import io
import os
import re

def generate_switcher(cur_lang, fr_url, en_url, ar_url):
    if cur_lang == "ar":
        cur_flag = "/assets/images/flags/ma.svg"
        cur_code = "AR"
        aria_label = "محدد اللغة"
        align_class = "start-0"
        margin_class = "mr-3 md:mr-4 lg:mr-6"
    elif cur_lang == "en":
        cur_flag = "/assets/images/flags/gb.svg"
        cur_code = "EN"
        aria_label = "Language Selector"
        align_class = "right-0"
        margin_class = "ml-3 md:ml-4 lg:ml-6"
    else: # fr
        cur_flag = "/assets/images/flags/fr.svg"
        cur_code = "FR"
        aria_label = "Sélecteur de langue"
        align_class = "right-0"
        margin_class = "ml-3 md:ml-4 lg:ml-6"
    
    check_icon = '<svg class="w-3.5 h-3.5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
    
    fr_active = (cur_lang == "fr")
    en_active = (cur_lang == "en")
    ar_active = (cur_lang == "ar")
    
    fr_cls = "bg-gold/15 text-gold font-semibold" if fr_active else "text-text-muted hover:text-white hover:bg-white/5"
    en_cls = "bg-gold/15 text-gold font-semibold" if en_active else "text-text-muted hover:text-white hover:bg-white/5"
    ar_cls = "bg-gold/15 text-gold font-semibold" if ar_active else "text-text-muted hover:text-white hover:bg-white/5"
    
    fr_curr = ' aria-current="page"' if fr_active else ""
    en_curr = ' aria-current="page"' if en_active else ""
    ar_curr = ' aria-current="page"' if ar_active else ""
    
    fr_check = check_icon if fr_active else ""
    en_check = check_icon if en_active else ""
    ar_check = check_icon if ar_active else ""

    html = f'''<!-- Language Switcher -->
    <div class="relative group {margin_class} flex items-center">
      <button type="button" aria-label="{aria_label}" aria-expanded="false" class="flex items-center gap-2 text-xs font-body text-text-white hover:text-gold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 transition-all rounded-full px-2.5 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
        <img src="{cur_flag}" alt="{cur_code}" class="w-4 h-3 rounded-[2px] object-cover shadow-sm shrink-0" width="16" height="12">
        <span class="font-medium tracking-wide">{cur_code}</span>
        <svg class="w-3 h-3 text-text-muted group-hover:text-gold transition-transform duration-200 group-hover:rotate-180 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="absolute {align_class} top-full mt-2 w-44 bg-dark-card border border-white/10 rounded-2xl shadow-2xl p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden backdrop-blur-xl" dir="ltr">
        <a href="{fr_url}" class="flex items-center justify-between px-3 py-2 rounded-xl transition-all text-xs {fr_cls}" hreflang="fr"{fr_curr}>
          <div class="flex items-center gap-2.5">
            <img src="/assets/images/flags/fr.svg" alt="Français" class="w-4 h-3 rounded-[2px] object-cover shadow-sm shrink-0" width="16" height="12">
            <span>Français</span>
          </div>
          {fr_check}
        </a>
        <a href="{en_url}" class="flex items-center justify-between px-3 py-2 rounded-xl transition-all text-xs {en_cls}" hreflang="en"{en_curr}>
          <div class="flex items-center gap-2.5">
            <img src="/assets/images/flags/gb.svg" alt="English" class="w-4 h-3 rounded-[2px] object-cover shadow-sm shrink-0" width="16" height="12">
            <span>English</span>
          </div>
          {en_check}
        </a>
        <a href="{ar_url}" class="flex items-center justify-between px-3 py-2 rounded-xl transition-all text-xs {ar_cls}" hreflang="ar"{ar_curr}>
          <div class="flex items-center gap-2.5">
            <img src="/assets/images/flags/ma.svg" alt="العربية" class="w-4 h-3 rounded-[2px] object-cover shadow-sm shrink-0" width="16" height="12">
            <span class="font-body">العربية</span>
          </div>
          {ar_check}
        </a>
      </div>
    </div>'''
    return html

html_files = glob.glob("**/*.html", recursive=True)
html_files = [f for f in html_files if not f.startswith("node_modules") and not f.startswith(".")]

updated_count = 0
pattern = r'<!--\s*Language Switcher\s*-->\s*<div class="relative group[^"]*">[\s\S]*?</div>\s*</div>'

for f in sorted(html_files):
    norm = f.replace("\\", "/")
    if norm.startswith("ar/"):
        cur_lang = "ar"
    elif norm.startswith("en/"):
        cur_lang = "en"
    else:
        cur_lang = "fr"
    
    with io.open(f, "r", encoding="utf-8") as fh:
        content = fh.read()
    
    m = re.search(pattern, content)
    if not m:
        continue
    
    block = m.group(0)
    m_fr = re.search(r'<a\s+href=["\']([^"\']+)["\'][^>]*hreflang=["\']fr["\']', block)
    m_en = re.search(r'<a\s+href=["\']([^"\']+)["\'][^>]*hreflang=["\']en["\']', block)
    m_ar = re.search(r'<a\s+href=["\']([^"\']+)["\'][^>]*hreflang=["\']ar["\']', block)
    
    if not (m_fr and m_en and m_ar):
        print(f"Skipping {f} - could not extract all 3 URLs")
        continue
    
    fr_url = m_fr.group(1)
    en_url = m_en.group(1)
    ar_url = m_ar.group(1)
    
    new_block = generate_switcher(cur_lang, fr_url, en_url, ar_url)
    new_content = content[:m.start()] + new_block + content[m.end():]
    
    with io.open(f, "w", encoding="utf-8") as fh:
        fh.write(new_content)
    
    updated_count += 1

print(f"SUCCESS: Updated {updated_count} / {len(html_files)} HTML files!")
