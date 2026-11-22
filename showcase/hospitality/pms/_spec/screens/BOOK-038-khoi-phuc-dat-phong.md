# BOOK-038 — Tra cứu đặt chỗ (Reservation Lookup)

**Loại:** Trang đầy đủ
**Route:** Booking/retrieveBooking (mặc định: `/booking/retrieve-booking`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Màn hình tra cứu toàn bộ đặt phòng theo khoảng ngày đặt/ngày nhận phòng và trạng thái (bao gồm cả các trạng thái đã huỷ), phục vụ tra cứu/khôi phục thông tin booking, kèm liên kết truy cập cổng thông tin khách (Access Portal), trạng thái khai báo SGAC và người phụ trách (Leader).

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngày đặt | `booking_date` | Datepicker | Không | |
| 2 | Khoảng ngày đặt | `booking_range` | Date range picker | Không | |
| 3 | Ngày nhận phòng | `check_in_date` | Datepicker | Không | |
| 4 | Khoảng ngày nhận phòng | `check_in_range` | Date range picker | Không | |
| 5 | Trạng thái | `status[]` | Checkbox nhiều lựa chọn | Không | Bao gồm cả trạng thái đã huỷ |

### Cột hiển thị danh sách
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Booking Date | |
| 2 | Check-in | |
| 3 | Check-out | |
| 4 | Villa | |
| 5 | Name | Tên khách |
| 6 | Nationality | Quốc tịch |
| 7 | OTA | Kênh đặt |
| 8 | Access Portal | Liên kết truy cập cổng thông tin khách |
| 9 | SGAC | Trạng thái khai báo SGAC (SG Arrival Card) |
| 10 | Leader | Người phụ trách |
| 11 | Status | Trạng thái booking |
| 12 | Actions | Thao tác |

## Chức năng/nút thao tác
- Lọc theo khoảng ngày đặt/nhận phòng và trạng thái (kể cả Cancelled)
- Xem chi tiết / khôi phục thông tin từng booking
- Truy cập nhanh Access Portal, xem trạng thái SGAC

## Điều hướng
- Mở từ: Menu module Đặt chỗ > Reservation Lookup
- Điều hướng tới: BOOK-028 (Hồ sơ đặt chỗ) khi xem chi tiết
