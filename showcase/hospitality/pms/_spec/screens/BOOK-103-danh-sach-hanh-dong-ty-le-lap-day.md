# BOOK-103 — Điều chỉnh giá (Pricing Adjustments)

**Loại:** Trang đầy đủ

**Route:** Booking/action (mặc định: `/booking/action`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Danh sách các lượt phân tích/hành động điều chỉnh giá theo tỷ lệ lấp đầy (occupancy) đã tạo, theo từng đơn vị kinh doanh và khoảng thời gian. Là màn hình gốc để tạo mới (BOOK-104) và theo dõi kết quả từng lượt hành động (BOOK-105).

## Mô tả chi tiết

**Danh sách:**

| # | Cột hiển thị | Field code | Ghi chú |
|---|---|---|---|
| 1 | Business Unit | business_unit.short_name | |
| 2 | Start | start_date | Định dạng d-M-y |
| 3 | End | end_date | Định dạng d-M-y |
| 4 | Created by | created_by | Tên người tạo |
| 5 | On | created_at | Ngày tạo, định dạng d-M-y |
| 6 | Action | — | Icon "Follow up" → mở BOOK-105 |

Sắp xếp theo `VillaAction.id` giảm dần (mới nhất trước).

## Chức năng/nút thao tác

- Nút "+ Action" (góc trên phải) → mở BOOK-104 (Tạo điều chỉnh giá).
- Icon "Follow up" trên từng dòng → mở BOOK-105 (Theo dõi điều chỉnh) với id được base64_encode.

## Điều hướng

- Vào từ menu chính (icon "Pricing Adjustments", active_menu = 1000).
- → BOOK-104 khi bấm "+ Action".
- → BOOK-105 khi bấm icon Follow up trên một dòng.
