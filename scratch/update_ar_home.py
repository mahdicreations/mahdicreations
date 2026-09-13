# -*- coding: utf-8 -*-
import io

card_ar = """<a href="/ar/services/ia-souveraine" class="reveal bg-dark-card border border-gold/30 rounded-2xl p-6 flex flex-col gap-4 hover:border-gold hover:shadow-lg hover:shadow-gold/10 transition-all duration-300 group relative">
  <div class="absolute top-4 start-4 px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider bg-gold/15 text-gold border border-gold/30">
    جديد &middot; On-Premise
  </div>
  <div class="bg-gold/10 text-gold rounded-xl p-3 w-12 h-12 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  </div>
  <div>
    <h3 class="font-display font-medium text-xl text-text-white mb-2 group-hover:text-gold transition-colors">الذكاء الاصطناعي السيادي بالمغرب</h3>
    <p class="font-body text-sm leading-relaxed text-text-muted">نماذج ذكاء اصطناعي مفتوحة المصدر (Llama 3, DeepSeek) مستضافة على خوادمكم الخاصة بالمغرب. مطابقة تامة للقانون 09-08 والـ CNDP دون مغادرة البيانات.</p>
  </div>
  <div class="mt-auto pt-4 border-t border-white/5 flex items-center gap-1 text-xs font-semibold text-gold group-hover:text-gold-light transition-colors">
    اعرف المزيد <span class="transform group-hover:-translate-x-1 transition-transform"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg></span>
  </div>
</a>

"""

with io.open("ar/index.html", "r", encoding="utf-8") as f:
    html = f.read()

target = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">\n      \n<a href="/ar/services/creation-web"'
if target not in html:
    # try with \r\n
    target = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">\r\n      \r\n<a href="/ar/services/creation-web"'

if target in html:
    replacement = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">\n      \n' + card_ar + '<a href="/ar/services/creation-web"'
    html = html.replace(target, replacement, 1)
    with io.open("ar/index.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("SUCCESS: Added to ar/index.html")
else:
    print("TARGET NOT FOUND")
