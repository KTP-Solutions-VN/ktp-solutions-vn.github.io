"""Chạy prototype ở local: python3 serve.py [cổng] — mặc định 8734.
Như `python3 -m http.server` nhưng đường dẫn không phải file (VD /e/jobs, /p/home) trả về index.html để tải lại trang không bị 404."""
import http.server
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app")


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def send_head(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        if "." not in os.path.basename(path) and not os.path.exists(os.path.join(ROOT, path.lstrip("/"))):
            self.path = "/index.html"
        return super().send_head()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8734
print(f"http://127.0.0.1:{port}/?lang=vi")
http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
