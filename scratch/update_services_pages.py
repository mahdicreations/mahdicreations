# -*- coding: utf-8 -*-
import io

card_ar = """<div class="reveal bg-dark-card border border-gold/30 rounded-3xl p-8 flex flex-col gap-6 hover:border-gold transition-all duration-300 group relative">
  <div class="absolute top-6 start-6 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-gold/15 text-gold border border-gold/30">
    جديد &middot; On-Premise
  </div>
  <div class="flex items-center gap-4">
    <div class="bg-gold/15 text-gold rounded-xl p-3 w-12 h-12 flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    </div>
    <h3 class="font-display font-medium text-xl text-text-white group-hover:text-gold transition-colors">الذكاء الاصطناعي السيادي بالمغرب</h3>
  </div>
  <p class="font-body text-sm text-text-muted leading-relaxed">نشر نماذج مفتوحة المصدر (Llama 3, DeepSeek) مستضافة على خوادمكم الخاصة أو سحابة مغربية معتمدة. صفر تبعية للـ APIs الأجنبية.</p>
  <ul class="flex flex-col gap-2">
    <li class="flex items-center gap-2 font-body text-xs text-text-muted"><span class="text-gold shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>100% من البيانات مستضافة داخل المغرب</li>
    <li class="flex items-center gap-2 font-body text-xs text-text-muted"><span class="text-gold shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>مطابقة تامة للقانون 09-08 وتوجيهات CNDP</li>
    <li class="flex items-center gap-2 font-body text-xs text-text-muted"><span class="text-gold shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>محرك بحث خاص Private RAG على PDF وExcel وERP</li>
    <li class="flex items-center gap-2 font-body text-xs text-text-muted"><span class="text-gold shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>دعم متعدد اللغات: العربية، الفرنسية والدارجة</li>
  </ul>
  <div class="border-t border-white/5 pt-4">
    <span class="text-[10px] font-body font-bold uppercase tracking-wider text-text-muted mb-2 block">مراحل التنفيذ:</span>
    <div class="flex flex-wrap gap-2">
      <span class="flex items-center gap-1 text-[11px] font-body text-text-muted"><span class="text-gold font-semibold">01.</span>التدقيق ومطابقة CNDP</span> <span class="text-gold/20">‹</span> <span class="flex items-center gap-1 text-[11px] font-body text-text-muted"><span class="text-gold font-semibold">02.</span>إعداد الخوادم</span> <span class="text-gold/20">‹</span> <span class="flex items-center gap-1 text-[11px] font-body text-text-muted"><span class="text-gold font-semibold">03.</span>فهرسة RAG</span> <span class="text-gold/20">‹</span> <span class="flex items-center gap-1 text-[11px] font-body text-text-muted"><span class="text-gold font-semibold">04.</span>إدارة الصلاحيات RBAC</span>
    </div>
  </div>
  <a href="/ar/services/ia-souveraine" class="mt-auto bg-gold-gradient text-dark font-body font-semibold text-sm py-2.5 rounded-full text-center hover:opacity-95 transition-all duration-300 shadow-md">
    اعرف المزيد
  </a>
</div>
"""

card_en = """<div class="reveal bg-dark-card border border-gold/30 rounded-3xl p-8 flex flex-col gap-6 hover:border-gold transition-all duration-300 group relative">
  <div class="absolute top-6 end-6 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-gold/15 text-gold border border-gold/30">
    New &middot; On-Premise
  </div>
  <div class="flex items-center gap-4">
    <div class="bg-gold/15 text-gold rounded-xl p-3 w-12 h-12 flex items-center justify-center shrink-0 group-hover:bg-gold/25 transition-colors">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    </div>
    <h3 class="font-display font-medium text-xl text-text-white group-hover:text-gold transition-colors">Sovereign AI in Morocco</h3>
  </div>
  <p class="font-body text-sm text-text-muted leading-relaxed">Deployment of open-source models (Llama 3, DeepSeek) hosted on your On-Premise servers or certified Moroccan cloud. 0 foreign API dependency.</p>
  <ul class="flex flex-col gap-2">
    <li class="flex items-center gap-2 font-body text-xs text-text-muted"><span class="text-gold shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>100% of data hosted inside Morocco</li>
    <li class="flex items-center gap-2 font-body text-xs text-text-muted"><span class="text-gold shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Full Law 09-08 & CNDP directives compliance</li>
    <li class="flex items-center gap-2 font-body text-xs text-text-muted"><span class="text-gold shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Private RAG engine over PDFs, Excel & ERP</li>
    <li class="flex items-center gap-2 font-body text-xs text-text-muted"><span class="text-gold shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Multilingual support: French, Arabic & Darija</li>
  </ul>
  <div class="border-t border-white/5 pt-4">
    <span class="text-[10px] font-body font-bold uppercase tracking-wider text-text-muted mb-2 block">Process:</span>
    <div class="flex flex-wrap gap-2">
      <span class="flex items-center gap-1 text-[11px] font-body text-text-muted"><span class="text-gold font-semibold">01.</span>Audit & CNDP</span> <span class="text-gold/20">›</span> <span class="flex items-center gap-1 text-[11px] font-body text-text-muted"><span class="text-gold font-semibold">02.</span>Server Setup</span> <span class="text-gold/20">›</span> <span class="flex items-center gap-1 text-[11px] font-body text-text-muted"><span class="text-gold font-semibold">03.</span>RAG Indexing</span> <span class="text-gold/20">›</span> <span class="flex items-center gap-1 text-[11px] font-body text-text-muted"><span class="text-gold font-semibold">04.</span>RBAC Control</span>
    </div>
  </div>
  <a href="/en/services/ia-souveraine" class="mt-auto bg-gold-gradient text-dark font-body font-semibold text-sm py-2.5 rounded-full text-center hover:opacity-95 transition-all duration-300 shadow-md">
    Learn more
  </a>
</div>
"""

# Update Arabic page: ar/services/index.html
with io.open("ar/services/index.html", "r", encoding="utf-8") as f:
    content_ar = f.read()

target_grid_ar = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">\n'
if target_grid_ar in content_ar and "ia-souveraine" not in content_ar:
    content_ar = content_ar.replace(target_grid_ar, target_grid_ar + card_ar + "\n")
    print("Added Sovereign AI card to ar/services/index.html")

target_footer_ar = '<li><a href="/ar/services/creation-web"'
if target_footer_ar in content_ar:
    repl_footer_ar = '<li><a href="/ar/services/ia-souveraine" class="text-gold font-medium hover:text-gold-light transition-colors">الذكاء الاصطناعي السيادي بالمغرب</a></li>\n        ' + target_footer_ar
    content_ar = content_ar.replace(target_footer_ar, repl_footer_ar)
    print("Added Sovereign AI footer link to ar/services/index.html")

with io.open("ar/services/index.html", "w", encoding="utf-8") as f:
    f.write(content_ar)

# Update English page: en/services/index.html
with io.open("en/services/index.html", "r", encoding="utf-8") as f:
    content_en = f.read()

target_grid_en = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">\n'
if target_grid_en in content_en and "ia-souveraine" not in content_en:
    content_en = content_en.replace(target_grid_en, target_grid_en + card_en + "\n")
    print("Added Sovereign AI card to en/services/index.html")

target_footer_en = '<li><a href="/en/services/creation-web"'
if target_footer_en in content_en:
    repl_footer_en = '<li><a href="/en/services/ia-souveraine" class="text-gold font-medium hover:text-gold-light transition-colors">Sovereign AI in Morocco</a></li>\n        ' + target_footer_en
    content_en = content_en.replace(target_footer_en, repl_footer_en)
    print("Added Sovereign AI footer link to en/services/index.html")

with io.open("en/services/index.html", "w", encoding="utf-8") as f:
    f.write(content_en)

print("SUCCESS: Updated ar/services/index.html and en/services/index.html")
