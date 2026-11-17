# BOOK-065 — Đặt phòng mới nhất (Latest Bookings)

**Loại:** Trang đầy đủ
**Route:** Booking/latestBookings (mặc định: `/booking/latest-bookings`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Bảng theo dõi các đặt phòng mới phát sinh (mặc định trong 24 giờ gần nhất, hoặc theo khoảng ngày chọn), kèm biểu đồ doanh thu ròng theo tháng, dùng để theo dõi nhanh dòng booking mới và loại trừ các booking của chủ nhà (owner booking) khỏi doanh thu thực.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select2 | Không | |
| 2 | Khoảng thời gian | `period` | Date range | Không | Mặc định 24h gần nhất |
| 3 | Chu kỳ hiển thị biểu đồ | `duration` | Select | Không | Day/Week/Month |
| 4 | Đơn vị tiền tệ quy đổi | `currency` | Select2 | Không | Dùng cho biểu đồ doanh thu ròng |

### Danh sách (cột)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Booking Date | |
| 2 | Check-in Date | |
| 3 | Check-out Date | |
| 4 | Channel | Kênh OTA |
| 5 | Property | |
| 6 | Guest Name | |
| 7 | Currency | |
| 8 | Value | Doanh thu ròng (net, sau hoa hồng OTA) |
| 9 | Actions | Xem chi tiết/tải xuống |

## Chức năng/nút thao tác
- Lọc theo BU/khoảng thời gian/đơn vị tiền tệ
- Xem biểu đồ doanh thu ròng theo tháng
- Tải xuống danh sách (`downloadLatestBooking`)

## Điều hướng
- Mở từ: Menu module Đặt phòng > Latest Bookings
- Điều hướng tới: BOOK-028 (Chi tiết đặt phòng) khi bấm vào một dòng
