# BOOK-035 — Trả phòng (Check-out) — Bước 1: Chọn villa

**Loại:** Trang đầy đủ (bước đầu quy trình trả phòng nhiều bước)
**Route:** Booking/checkOut (mặc định: `/booking/check-out`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Danh sách villa/booking đang chờ trả phòng trong ngày, cho nhân viên chọn villa để bắt đầu quy trình trả phòng (xác nhận GPS trước khi vào các bước chi tiết).

## Mô tả chi tiết
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Property Name | Tên villa |
| 2 | Check-out Date | Ngày trả phòng |
| 3 | Pending Check-out | Trạng thái đang chờ trả phòng |

Trường ẩn: `lat`, `lon` (toạ độ GPS thiết bị) gửi kèm khi bắt đầu quy trình.

## Chức năng/nút thao tác
- Chọn villa để bắt đầu quy trình trả phòng → chuyển tới BOOK-035-P2 (Bước 2: Kiểm tra villa/hư hỏng)

## Điều hướng
- Mở từ: Menu module Đặt phòng > Check-out (dành cho nhân viên/concierge hiện trường)
- Điều hướng tới: BOOK-035-P2
