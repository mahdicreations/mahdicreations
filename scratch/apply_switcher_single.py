# -*- coding: utf-8 -*-
import io
import re

def generate_switcher(cur_lang, fr_url, en_url, ar_url):
    if cur_lang == "ar":
        cur_flag = "/assets/images/flags/ma.svg"
        cur_code = "AR"
        aria_label = "محدد اللغة"
        align_class = "start-0"
    elif cur_lang == "en":
        cur_flag = "/assets/images/flags/gb.svg"
        cur_code = "EN"
        aria_label = "Language Selector"
        align_class = "right-0"
    else: # fr
        cur_flag = "/assets/images/flags/fr.svg"
        cur_code = "FR"
        aria_label = "Sélecteur de langue"
        align_class = "right-0"
    
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
    
    margin_class = "mr-3 md:mr-4 lg:mr-6" if cur_lang == "ar" else "ml-3 md:ml-4 lg:ml-6"

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

# Test on en/services/index.html
with io.open("en/services/index.html", "r", encoding="utf-8") as f:
    content = f.read()

pattern = r'<!--\s*Language Switcher\s*-->\s*<div class="relative group[^"]*">[\s\S]*?</div>\s*</div>'
m = re.search(pattern, content)
if m:
    block = m.group(0)
    fr_url = re.search(r'<a\s+href=["\']([^"\']+)["\'][^>]*hreflang=["\']fr["\']', block).group(1)
    en_url = re.search(r'<a\s+href=["\']([^"\']+)["\'][^>]*hreflang=["\']en["\']', block).group(1)
    ar_url = re.search(r'<a\s+href=["\']([^"\']+)["\'][^>]*hreflang=["\']ar["\']', block).group(1)
    
    new_block = generate_switcher("en", fr_url, en_url, ar_url)
    new_content = content[:m.start()] + new_block + content[m.end():]
    with io.open("en/services/index.html", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("SUCCESS: Updated en/services/index.html")
