# -*- coding: utf-8 -*-
import io

# 1. Update ar/index.html footer
with io.open("ar/index.html", "r", encoding="utf-8") as f:
    c = f.read()

target_ar = '<li><a href="/ar/services/creation-web" class="hover:text-gold transition-colors">إنشاء مواقع الويب</a></li>'
repl_ar = '<li><a href="/ar/services/ia-souveraine" class="text-gold font-medium hover:text-gold-light transition-colors">الذكاء الاصطناعي السيادي بالمغرب</a></li>\n        ' + target_ar

if target_ar in c:
    c = c.replace(target_ar, repl_ar, 1)
    with io.open("ar/index.html", "w", encoding="utf-8") as f:
        f.write(c)
    print("ar/index.html footer updated")
else:
    print("target_ar not found")

# 2. Check en/index.html
with io.open("en/index.html", "r", encoding="utf-8") as f:
    c_en = f.read()

# In en/index.html let's see if there is a services column or add one before Sitemap
target_en_sitemap = '<div class="flex flex-col gap-6">\n      <h3 class="font-display font-medium text-lg text-gold">Sitemap</h3>'
services_col_en = """    <!-- Col 2: Services -->
    <div class="flex flex-col gap-6">
      <h3 class="font-display font-medium text-lg text-gold">Our Services</h3>
      <ul class="flex flex-col gap-3 font-body text-sm text-text-muted">
        <li><a href="/en/services/ia-souveraine" class="text-gold font-medium hover:text-gold-light transition-colors">Sovereign AI in Morocco</a></li>
        <li><a href="/en/services/creation-web" class="hover:text-gold transition-colors">Website Creation</a></li>
        <li><a href="/en/services" class="hover:text-gold transition-colors">Custom Web Development</a></li>
        <li><a href="/en/services" class="hover:text-gold transition-colors">Web Apps & SaaS</a></li>
        <li><a href="/en/services" class="hover:text-gold transition-colors">Graphic Design & Logos</a></li>
        <li><a href="/en/services/seo" class="hover:text-gold transition-colors">Organic SEO</a></li>
        <li><a href="/en/services/marketing" class="hover:text-gold transition-colors">Digital Marketing</a></li>
        <li><a href="/en/services" class="hover:text-gold transition-colors">Web Hosting & Domains</a></li>
        <li><a href="/en/services" class="hover:text-gold transition-colors">Web Maintenance & Support</a></li>
      </ul>
    </div>\n\n    <!-- Col 3: Site Map -->\n    """ + target_en_sitemap

if target_en_sitemap in c_en:
    c_en = c_en.replace(target_en_sitemap, services_col_en, 1)
    with io.open("en/index.html", "w", encoding="utf-8") as f:
        f.write(c_en)
    print("en/index.html footer services column added")
else:
    print("target_en_sitemap not found")
