# BOOK-066 — Quản lý giá thuê villa (trang tổng quan)

**Loại:** Trang đầy đủ
**Route:** Booking/rates (mặc định: `/booking/rates`)
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Trang trung tâm điều hướng của nhóm chức năng "Giá thuê & mùa giá": không có bảng dữ liệu hay bộ lọc riêng, chỉ gồm các nút bấm dẫn tới các màn hình con quản lý giá (trạng thái giá, nhật ký giá, mùa giá, nhật ký giá theo mùa...).

## Mô tả chi tiết
Trang không có form nhập liệu hay bảng dữ liệu. Nội dung chỉ gồm 5 nút liên kết dạng thẻ (card) xếp hàng ngang:

| # | Tên nút | Điều hướng tới | Ghi chú |
|---|---|---|---|
| 1 | Status | `rates-status` (action `ratesStatus`) | BOOK-067 |
| 2 | Recommendations | `recommendations` (action `recommendations`) | Ngoài phạm vi nhóm "Giá thuê & mùa giá" (thuộc nhóm gợi ý giá khác) |
| 3 | Logs | `rates-logs` (action `ratesLogs`) | BOOK-070 |
| 4 | Seasons | action `seasons` | BOOK-073 |
| 5 | Season Logs | action `seasonPriceLogs` | BOOK-074 |

## Chức năng/nút thao tác
- Nút **Status** — mở BOOK-067 (Trạng thái cập nhật giá villa)
- Nút **Recommendations** — mở màn hình gợi ý giá (ngoài phạm vi tài liệu này)
- Nút **Logs** — mở BOOK-070 (Nhật ký thay đổi giá)
- Nút **Seasons** — mở BOOK-073 (Quản lý mùa giá)
- Nút **Season Logs** — mở BOOK-074 (Nhật ký giá theo mùa)

## Điều hướng
- Mở từ: Menu module Đặt phòng > Rates
- Điều hướng tới: BOOK-067, BOOK-070, BOOK-073, BOOK-074 (và màn hình Recommendations ngoài phạm vi nhóm này)
