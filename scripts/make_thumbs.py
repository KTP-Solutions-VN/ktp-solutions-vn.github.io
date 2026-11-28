#!/usr/bin/env python3
"""Sinh bản ảnh nhỏ <tên>-w1200.jpg cho ảnh bìa / ảnh chụp prototype dùng trên website (srcset cho điện thoại).

    python3 scripts/make_thumbs.py

Ảnh gốc 1800–2400px rất nặng để giải mã trên điện thoại (mỗi ảnh ~5,7 MP); thẻ trên màn 390px @3x chỉ cần ~1100px.
KTP.srcset() trong assets/js/global.js trỏ tới bản -w1200 cho các ảnh trong DIRS; check_rules.py (R10) báo ảnh thiếu bản nhỏ.
Chỉ sinh lại khi ảnh gốc mới hơn bản nhỏ. Cần Pillow.
"""
import pathlib

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
DIRS = ["showcase/assets/covers", "assets/img/du-an-trien-khai"]
WIDTH = 1200


def sources():
    for d in DIRS:
        for p in sorted((ROOT / d).glob("*.jpg")):
            if not p.stem.endswith(f"-w{WIDTH}"):
                yield p


if __name__ == "__main__":
    made = 0
    for src in sources():
        dst = src.with_name(f"{src.stem}-w{WIDTH}.jpg")
        if dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
            continue
        im = Image.open(src).convert("RGB")
        if im.width > WIDTH:
            im = im.resize((WIDTH, round(im.height * WIDTH / im.width)), Image.LANCZOS)
        im.save(dst, quality=80, optimize=True, progressive=True)
        made += 1
        print(f"{dst.relative_to(ROOT)} {im.size[0]}x{im.size[1]} {dst.stat().st_size // 1024} KB")
    print(f"Xong: {made} ảnh mới.")
