# -*- coding: utf-8 -*-
import math
import os

os.makedirs("assets/images/flags", exist_ok=True)

# 1. France
fr_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="900" height="600">
  <rect width="300" height="600" fill="#002654"/>
  <rect x="300" width="300" height="600" fill="#ffffff"/>
  <rect x="600" width="300" height="600" fill="#ce1126"/>
</svg>"""

with open("assets/images/flags/fr.svg", "w", encoding="utf-8") as f:
    f.write(fr_svg)

# 2. Great Britain
gb_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="60" height="30">
  <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
  <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
  <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4"/>
  <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
  <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
</svg>"""

with open("assets/images/flags/gb.svg", "w", encoding="utf-8") as f:
    f.write(gb_svg)

# 3. Morocco
cx, cy = 450, 300
R = 170
pts = []
for i in [0, 2, 4, 1, 3]:
    angle = -math.pi/2 + i * 2 * math.pi / 5
    x = cx + R * math.cos(angle)
    y = cy + R * math.sin(angle)
    pts.append(f"{x:.1f},{y:.1f}")
pts_str = " L ".join(pts) + " Z"

ma_svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="900" height="600">
  <rect width="900" height="600" fill="#c1272d"/>
  <path d="M {pts_str}" fill="none" stroke="#006233" stroke-width="24" stroke-linejoin="miter" stroke-miterlimit="4"/>
</svg>"""

with open("assets/images/flags/ma.svg", "w", encoding="utf-8") as f:
    f.write(ma_svg)

print("SUCCESS: All 3 SVG flags created in assets/images/flags/")
