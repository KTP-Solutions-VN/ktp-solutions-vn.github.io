"""Chụp ảnh prototype cho slide (cần server đang chạy: python3 ../serve.py).

python3 shots.py http://127.0.0.1:8734 ../anh-slide   (server chạy bằng ../serve.py)
"""
import json
import os
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor

BASE, OUT = sys.argv[1].rstrip("/"), os.path.abspath(sys.argv[2])
HERE = os.path.dirname(os.path.abspath(__file__))
META = os.path.join(HERE, "..", "app", "mock-api", "meta")
APP = json.load(open(os.path.join(META, "app.json"), encoding="utf-8"))
for n in ("menu", "teams", "profiles", "tenants", "users", "tour", "approval_rules"):  # cấu hình sửa tay
    APP.update(json.load(open(os.path.join(META, "config", n + ".json"), encoding="utf-8")))

R = [("/login", "dang-nhap"), ("/pick", "chon-phap-nhan"), ("/home", "trang-chu"), ("/approvals", "cho-duyet")]
for g in [{"items": APP["common"]}] + APP["menu"]:
    for it in g["items"]:
        k = it.get("entity")
        if not k:
            continue
        m = json.load(open(os.path.join(HERE, "..", "app", "mock-api", "meta", "entities", k + ".json"), encoding="utf-8"))
        first = json.load(open(os.path.join(HERE, "..", "app", "mock-api", "data", k + ".json"), encoding="utf-8"))[0]["id"]
        R += [(f"/{k}/list", f"{k}_danh-sach"), (f"/{k}/{first}", f"{k}_chi-tiet"), (f"/{k}/new", f"{k}_tao-moi")]  # /e/k mở Kanban nếu module có
        if m["status"] and m["states"]:
            R.append((f"/{k}/kanban", f"{k}_kanban"))
R += [("/board", "bang-cong-viec"), ("/reports", "bao-cao"), ("/reports/r10", "bao-cao_du-bao")]  # Dashboard → trang chủ, Dự báo → báo cáo
R += [(f"/settings/{s['page'][2:]}", "cai-dat_" + s["page"][2:]) for s in APP["settings"]]

jobs = []
for lang in ("vi", "en"):
    d = os.path.join(OUT, lang.upper())
    os.makedirs(d, exist_ok=True)
    for i, (route, name) in enumerate(R, 1):
        jobs.append((f"{BASE}{route}{'&' if '?' in route else '?'}lang={lang}&shot=1", os.path.join(d, f"{i:02d}_{name}.png")))  # đường dẫn chuẩn, không dùng #


def shot(j, budget=6000):
    url, png = j
    prof = png + ".prof"
    subprocess.run(["google-chrome", "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={prof}",
                    "--force-device-scale-factor=1.5", "--window-size=1600,900", f"--virtual-time-budget={budget}",
                    f"--screenshot={png}", url], capture_output=True, timeout=120)
    subprocess.run(["rm", "-rf", prof])
    return os.path.exists(png)


with ThreadPoolExecutor(4) as ex:
    ok = list(ex.map(shot, jobs))
# ảnh trắng (< 30 KB: trang chưa dựng xong khi nhiều Chrome chạy song song) → chụp lại từng ảnh, chờ lâu hơn
for attempt in range(3):
    blank = [j for j in jobs if not os.path.exists(j[1]) or os.path.getsize(j[1]) < 30000]
    if not blank:
        break
    print("chụp lại", len(blank), "ảnh trắng")
    for j in blank:
        shot(j, 15000)
blank = [j[1] for j in jobs if not os.path.exists(j[1]) or os.path.getsize(j[1]) < 30000]
print(len(R), "routes;", len(jobs) - len(blank), "/", len(jobs), "ok", *(["; còn trắng:"] + blank if blank else []))
