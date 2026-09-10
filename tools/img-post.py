#!/usr/bin/env python
"""WordLens 图片后处理：把目录里的图片统一压到 720px 宽 / JPEG q82。

用法： python tools/img-post.py assets/covers
"""
import sys
import os
import glob
from PIL import Image


def run(d, maxw=720, quality=82):
    files = sorted(glob.glob(os.path.join(d, "*.jpg")) +
                   glob.glob(os.path.join(d, "*.jpeg")) +
                   glob.glob(os.path.join(d, "*.png")))
    if not files:
        return
    before = after = 0
    ok = 0
    for f in files:
        try:
            before += os.path.getsize(f)
            im = Image.open(f)
            im = im.convert("RGB")
            if im.width > maxw:
                h = round(im.height * maxw / im.width)
                im = im.resize((maxw, h), Image.LANCZOS)
            target = os.path.splitext(f)[0] + ".jpg"
            im.save(target, "JPEG", quality=quality, optimize=True, progressive=True)
            if target != f and os.path.exists(f):
                os.remove(f)
            after += os.path.getsize(target)
            ok += 1
        except Exception as e:  # noqa: BLE001
            print(f"  ! 跳过 {os.path.basename(f)}: {e}")
    if ok:
        print(f"  图片优化 {ok} 张：{before // 1024}KB -> {after // 1024}KB")


if __name__ == "__main__":
    run(sys.argv[1] if len(sys.argv) > 1 else ".")
