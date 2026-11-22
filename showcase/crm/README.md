# DEMO CRM Prototype

Prototype CRM (thay hệ thống CRM hiện tại) cho Apex Industrial. File tĩnh trong `app/`, dữ liệu là dữ liệu giả.

## Chạy ở local
URL dạng gọn (`/home`, `/jobs`, `/jobs/jo3`, `/approvals`, `/board`, `/reports/r10`, `/settings/tenant`) nên server phải trả `index.html` cho đường dẫn không phải file. Chọn 1 cách:

| Cách | Lệnh |
|---|---|
| Python (Mac / Linux thường có sẵn) | `python3 serve.py` (ở thư mục gốc, cổng 8734) |
| Node.js | `npx serve -s app -l 8734` (`-s` = chế độ single-page) |

Mở http://127.0.0.1:8734/ (mặc định tiếng Anh) hoặc `?lang=vi` (tiếng Việt, có Kịch bản demo / Hiện mã feature). Ngôn ngữ đã chọn được nhớ cho các lần sau.
Không dùng `python3 -m http.server` / VS Code Live Server: tải lại trang ở `/jobs`… sẽ bị 404.
Sửa file xong mà chưa thấy đổi: tải lại hẳn trang (Ctrl + Shift + R). Link cũ (`/#/p/home`, `/e/jobs`, `/p/myjobs`…) vẫn mở được, tự chuyển sang URL gọn.
Trên Vercel: `app/vercel.json` làm việc tương tự (rewrite về `index.html`).
Trên website (GitHub Pages): app chạy ở thư mục con `/showcase/crm/app/` (tiền tố tự nhận trong `index.html`, biến `APP_BASE`); tải lại ở link sâu thì `404.html` ở gốc website chuyển về `?__p=<đường dẫn>` để app mở đúng màn.

## Sửa ở đâu
Sửa trong `app/`, lưu file rồi Ctrl + Shift + R là thấy (không cần chạy lệnh).

| Muốn sửa | File |
|---|---|
| Chữ trên giao diện (menu, nút, tiêu đề, thông báo) | `app/i18n/vi.json`, `app/i18n/en.json` |
| Màu, nước, tiền tệ, GST, năm tài chính của từng pháp nhân | `app/mock-api/meta/config/tenants.json` (`color`, `country`, `currency`, `gst`, `fy`) |
| Kiểu dáng chung (khoảng cách, cỡ chữ, màu trạng thái) | `app/css/app.css` |
| Bố cục một màn | `app/templates/<màn>.html` — VD `home`, `kanban`, `list`, `detail`, `myjobs` (Phê duyệt của tôi), `work` (Bảng điều phối việc), `reports` (Phân tích) |
| Menu trái, bộ phận (menu theo bộ phận) | `app/mock-api/meta/config/menu.json`, `teams.json` |
| User mẫu, quyền theo profile | `app/mock-api/meta/config/users.json`, `profiles.json` |
| Quy tắc duyệt DoA | `app/mock-api/meta/config/approval_rules.json` |
| Kịch bản demo | `app/mock-api/meta/config/tour.json` |
| Field, loại biểu mẫu (layout), cột danh sách, trạng thái của module | `app/mock-api/meta/entities/<module>.json` * |
| Dữ liệu mẫu | `app/mock-api/data/<module>.json` * |
| Bối cảnh vùng của dữ liệu mẫu: APE, APA, APL, FLE ở Úc (A$ / AUD, GST 10%, `Pty Ltd`, khu công nghiệp NSW / VIC / QLD / WA, điện thoại +61, biển số kiểu `XA 34 XN`, plant registration / EPA / NHVR / Privacy Act); BH ở Singapore (S$ / SGD, GST 9%, `Pte Ltd`, Tuas / Jurong / Woodlands / Ubi, điện thoại +65, biển số kiểu `GBL488Z`) | khối "bối cảnh vùng" đầu `_src/build_model.py` * (BH: `to_sg`); ký hiệu tiền theo pháp nhân ở `money()` trong `app/js/app.js`; ngày lễ, tỷ giá ở trang Cài đặt (`viewSetting` trong `app/js/app.js`) |
| Logic màn hình (view mặc định, tab lọc, thẻ Kanban, danh sách báo cáo, luật tự tạo task…) | `app/js/app.js` — tìm hằng `DEFAULT_VIEW`, `PRESET_VIEWS`, `LEGACY_VIEWS`, `KB_CARD`, `KB_QUICK`, `REPORTS`, `HIGHLIGHT`, `AUTO_RULES` |

\* Sinh tự động bằng `_src/build_model.py`: sửa tay được, nhưng chạy lại script sẽ ghi đè — muốn sửa lâu dài thì sửa trong script.

## Sinh lại dữ liệu mẫu (không bắt buộc)
Chỉ cần khi đổi cấu trúc entity / dữ liệu giả. Cần Python 3 + `pip install openpyxl` + file Entity List của BA.
```
mkdir -p /tmp/out/mock-api/meta && cp -r app/mock-api/meta/config /tmp/out/mock-api/meta/
python3 _src/build_model.py /tmp/out [đường_dẫn_Entity_List.xlsx]
diff -rq /tmp/out/mock-api app/mock-api   # kiểm tra rồi mới copy file cần đổi vào app/mock-api
```
Cấu hình sửa tay (không cần chạy script, F5 là thấy): `app/mock-api/meta/config/*.json` (pháp nhân, user, bộ phận, quyền, menu, quy tắc duyệt, kịch bản demo).
`_src/source/` chứa cấu hình hệ thống cũ của khách — chỉ dùng nội bộ. Tên module / màn / quy trình hiển thị trong prototype đặt lại ở `_src/build_model.py` (`ENT_LABEL`, `ACTIONS`, khối "tên hiển thị CRM mới") và `app/i18n/*.json`.
