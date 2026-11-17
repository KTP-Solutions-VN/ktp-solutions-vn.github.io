# OWP-008 — Lịch đặt phòng theo biệt thự

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::calendar($villa_id)` — không có route đẹp riêng, mở từ OWP-005 (icon lịch), dạng `.../calendar/{villa_id_base64}`

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Lịch đặt phòng (booking calendar) dạng bảng theo ngày cho một biệt thự cụ thể hoặc tất cả biệt thự, hiển thị các đặt phòng theo khoảng thời gian được chọn. Dữ liệu tải qua AJAX (`getVillaBookingDetail`).

## Mô tả chi tiết

Bộ lọc:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Khoảng thời gian | date_range | Date range picker | Có | |
| 2 | Biệt thự | villa | Select2 | Có | Có tuỳ chọn "Tất cả" (All) |

Danh sách/lịch — hiển thị theo dạng bảng ngày x biệt thự, mỗi ô là đặt phòng (tên khách, trạng thái theo màu: Cancelled/Confirmed/New/Request/Black).

## Chức năng/nút thao tác

- Lọc theo biệt thự và khoảng thời gian
- Click vào ô đặt phòng để xem nhanh chi tiết (popup, dùng chung OWP-010-P1)

## Điều hướng

- Vào từ OWP-005 (icon lịch trên từng dòng biệt thự)
- Click ô đặt phòng → OWP-010-P1 (popup xem nhanh đặt phòng)
