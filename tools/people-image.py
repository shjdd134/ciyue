"""Validate and resize a publisher photograph without cropping its composition."""
import sys
from PIL import Image, ImageOps

with Image.open(sys.argv[1]) as image:
    image.load()
    if image.width < 350 or image.height < 350:
        raise ValueError("Image is too small for a portrait feature")
    image = ImageOps.exif_transpose(image).convert("RGB")
    image.thumbnail((1100, 1400))
    for quality in (84, 76, 68, 60):
        image.save(sys.argv[2], "JPEG", quality=quality, optimize=True)
        import os
        if os.path.getsize(sys.argv[2]) <= 240 * 1024:
            break
    else:
        raise ValueError("Compressed image exceeds 240 KB")
