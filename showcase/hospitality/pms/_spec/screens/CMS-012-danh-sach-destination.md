# CMS-012 — Danh sách điểm đến (Destination)

**Loại:** Trang đầy đủ

**Route:** `CmsController::destination($action, $id)` — mặc định `/cms/destination/:action/:id`

**Module:** CMS = Nội dung trang chủ villa

## Mô tả ngắn gọn
Danh sách toàn bộ điểm đến (quận/huyện — `District`, kèm Country/Region) để chọn vào chỉnh sửa nội dung giới thiệu điểm đến hiển thị trên website. Không phân trang server-side (lấy toàn bộ `District->find('all')`).

## Mô tả chi tiết

Danh sách (bảng dữ liệu):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | (tính trên client) | |
| 2 | Quốc gia | `Country.name` | |
| 3 | Vùng/Region | `Region.name` | |
| 4 | Quận/Huyện (District) | `District.name` | |
| 5 | Ngày tạo | `District.created_at` | Định dạng `d M Y H:i` |
| 6 | Hành động | — | Nút Edit |

Sắp xếp mặc định: Quốc gia → Vùng → District (tăng dần). Không có filter/tìm kiếm server-side, không phân trang server-side, không có nút xoá/thêm mới (danh sách nguồn là bảng `District` có sẵn, không tạo mới District ở đây).

Lưu ý: tham số `$action`/`$id` trên route không được controller sử dụng trong logic (không có xử lý delete) — đây là 2 tham số còn sót trên route nhưng không có tác dụng thực tế trong action hiện tại.

## Chức năng/nút thao tác
- **Edit:** điều hướng đến CMS-013 (`/cms/destination-edit/:district_id`) để chỉnh nội dung/ảnh giới thiệu của điểm đến (theo district) đó.

## Điều hướng
- Vào từ: CMS-005 (Common Text, nút "Destination").
- Điều hướng đến: CMS-013 (sửa nội dung điểm đến theo villa/district).
