#!/usr/bin/env python3
"""从 assets/icons/icon-512.png 生成 Android 壳的启动图标。

为什么要生成而不是直接把 icon-512.png 塞进去：
  · 传统图标（API < 26 兜底）要的是 192×192 这个量级，塞 512 会被系统当 mdpi 放大，糊；
  · 自适应图标（API 26+ 真正生效的那个）的**前景**必须留出安全区 ——
    108dp 画布里只有中间 72dp（66.7%）一定可见，外围会被各家启动器裁成圆形/方圆形/水滴形。
    把 512 原图整张当前景，等于让 logo 的四角永远被切掉。

产物（都进仓库；改图标后重跑本脚本）：
  mobile/android/res/mipmap/ic_launcher.png                     192×192  传统图标兜底
  mobile/android/res/mipmap-xxxhdpi/ic_launcher_foreground.png  432×432  自适应前景（logo 占中间 288px）

用法：C:/Users/sekiro/.workbuddy/binaries/python/envs/default/Scripts/python.exe tools/build-icons.py
"""
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("缺 Pillow：先 pip install Pillow（见 tools/README 或 .android-toolchain 说明）")

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "icons" / "icon-512.png"
RES = ROOT / "mobile" / "android" / "res"

if not SRC.exists():
    sys.exit(f"找不到源图标：{SRC}")

src = Image.open(SRC).convert("RGBA")

# ① 传统图标兜底：无密度限定符的 mipmap/ 下放一张 192×192
legacy = RES / "mipmap" / "ic_launcher.png"
legacy.parent.mkdir(parents=True, exist_ok=True)
src.resize((192, 192), Image.LANCZOS).save(legacy, optimize=True)

# ② 自适应前景：432×432（= 108dp @ xxxhdpi），logo 居中放进中间 288×288（= 72dp 安全区）
CANVAS, SAFE = 432, 288
fg = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
logo = src.resize((SAFE, SAFE), Image.LANCZOS)
fg.paste(logo, ((CANVAS - SAFE) // 2, (CANVAS - SAFE) // 2), logo)
fore = RES / "mipmap-xxxhdpi" / "ic_launcher_foreground.png"
fore.parent.mkdir(parents=True, exist_ok=True)
fg.save(fore, optimize=True)

for p in (legacy, fore):
    print(f"  {p.relative_to(ROOT)}  {p.stat().st_size / 1024:.1f} KB  {Image.open(p).size}")
print("图标生成完成")
