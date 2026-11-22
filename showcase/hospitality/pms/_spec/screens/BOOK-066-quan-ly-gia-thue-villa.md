# BOOK-066 — Trung tâm giá (Pricing Hub)

**Loại:** Trang đầy đủ
**Route:** Booking/rates (mặc định: `/booking/rates`)
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)
**Module:** Đặt chỗ

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
- Nút **Status** — mở BOOK-067 (Trạng thái gói giá)
- Nút **Recommendations** — mở màn hình gợi ý giá (ngoài phạm vi tài liệu này)
- Nút **Logs** — mở BOOK-070 (Ghi chú thay đổi giá)
- Nút **Seasons** — mở BOOK-073 (Lịch mùa)
- Nút **Season Logs** — mở BOOK-074 (Đối chiếu giá theo mùa)

## Điều hướng
- Mở từ: Menu module Đặt chỗ > Pricing Hub
- Điều hướng tới: BOOK-067, BOOK-070, BOOK-073, BOOK-074 (và màn hình Recommendations ngoài phạm vi nhóm này)
