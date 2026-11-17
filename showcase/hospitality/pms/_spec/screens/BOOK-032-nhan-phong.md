# BOOK-032 — Nhận phòng (Check-in)

**Loại:** Trang đầy đủ
**Route:** Booking/checkIn (mặc định: `/booking/check-in`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Danh sách villa/booking đang chờ thực hiện nhận phòng trong ngày, cho nhân viên chọn để bắt đầu quy trình nhận phòng tại hiện trường (xác nhận vị trí GPS trước khi vào quy trình chi tiết).

## Mô tả chi tiết
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Property Name | Tên villa |
| 2 | Check-in Date | Ngày nhận phòng |
| 3 | Pending Check-in | Trạng thái đang chờ nhận phòng |

Trường ẩn: `lat`, `lon` (toạ độ GPS thiết bị), `date` — gửi kèm khi bắt đầu quy trình.

## Chức năng/nút thao tác
- Chọn villa để bắt đầu quy trình nhận phòng (xác nhận GPS) → chuyển tới BOOK-033 (Tiến trình nhận phòng)

## Điều hướng
- Mở từ: Menu module Đặt phòng > Check-in (dành cho nhân viên/concierge hiện trường)
- Điều hướng tới: BOOK-033 (Tiến trình nhận phòng)
