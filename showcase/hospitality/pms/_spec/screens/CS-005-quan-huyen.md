# CS-005 — Thiết lập quận/huyện (District Setup)

**Loại:** Trang đầy đủ

**Route:** `CommonSettingController::districts()` — mặc định `/common-setting/districts`

**Module:** CS = Dữ liệu tham chiếu

## Mô tả ngắn gọn
Danh sách quản lý danh mục Quận/Huyện (District) trực thuộc Vùng và Quốc gia. Mỗi District đồng bộ với một bản ghi `CmsDestination` (trang điểm đến trên website).

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`, sắp xếp theo Country > Region > District):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Quốc gia | `country.name` | |
| 3 | Vùng | `region.name` | |
| 4 | Quận/Huyện | `name` | |
| 5 | Ngày tạo | `created_at` | `d M Y H:i` |
| 6 | Hành động | — | Sửa, Xóa (mở popup CS-005-P1) |

## Chức năng/nút thao tác
- **Add new:** mở popup CS-005-P1 (Thêm mới).
- **Sửa:** mở popup CS-005-P1, nạp sẵn Country/Region/Name (Region cascade theo Country qua AJAX `getData`); khi lưu, đồng thời cập nhật `title`/`district_id` của bản ghi `CmsDestination` liên quan (nếu có).
- **Xóa:** mở popup CS-005-P1 ở chế độ xác nhận xóa; xóa cascade `Area` có `district_id` tương ứng và bản ghi `CmsDestination` liên quan.

## Điều hướng
- Vào từ: menu Cấu hình > Dữ liệu tham chiếu > Thiết lập quận/huyện.
- Điều hướng đến: CS-005-P1 (popup Form quận/huyện).
