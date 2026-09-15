#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""把人物的已下载图片拼成带序号的联系表，供人工核对图片是否属于本人/是否混入广告图。
用法（必须用带 Pillow 的 python）：
  PYTHON=... python tools/_people-sheet.py
输出：.tmp/people/<id>-sheet.jpg
"""
import json, os, sys
from PIL import Image, ImageDraw

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rep = json.load(open(os.path.join(root, '.tmp/people/prepared.json'), encoding='utf-8'))

CELL = 300
PAD = 26
COLS = 4

for it in rep['prepared']:
    files = [p['file'] for p in it['photos']]
    if not files:
        continue
    rows = (len(files) + COLS - 1) // COLS
    W = COLS * CELL + (COLS + 1) * PAD
    H = rows * (CELL + PAD + 18) + PAD
    sheet = Image.new('RGB', (W, H), (255, 255, 255))
    d = ImageDraw.Draw(sheet)
    for n, f in enumerate(files):
        r, c = divmod(n, COLS)
        try:
            im = Image.open(f).convert('RGB')
        except Exception as e:
            print('SKIP', f, e)
            continue
        im.thumbnail((CELL, CELL))
        x = PAD + c * (CELL + PAD)
        y = PAD + r * (CELL + PAD + 18)
        sheet.paste(im, (x, y))
        d.rectangle([x, y, x + im.width, y + im.height], outline=(200, 60, 60), width=2)
        d.text((x + 2, y + im.height + 3), '#%d  %dx%d  %.0fKB' % (n, im.width, im.height, os.path.getsize(f) / 1024), fill=(20, 20, 20))
    out = os.path.join(root, '.tmp/people', it['id'] + '-sheet.jpg')
    sheet.save(out, quality=88)
    print('写出', out, sheet.size, len(files), '张')
