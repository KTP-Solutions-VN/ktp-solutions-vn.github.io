# BOOK-042 — Danh sách đặt phòng trực tiếp (Direct Booking)

**Loại:** Trang đầy đủ
**Route:** Booking/directBookingList (mặc định: `/booking/direct-booking-list`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Danh sách các yêu cầu đặt phòng trực tiếp (không qua OTA) do chủ villa/đối tác gửi lên, chờ duyệt hoặc đã xử lý, kèm trạng thái phê duyệt.

## Mô tả chi tiết
| # | Cột | Ghi chú |
|---|---|---|
| 1 | No | STT |
| 2 | Property | Villa |
| 3 | Check-in Date | |
| 4 | Check-out Date | |
| 5 | Requested By | Người yêu cầu |
| 6 | On | Ngày yêu cầu |
| 7 | Status | Trạng thái (chờ duyệt/đã duyệt/từ chối) |
| 8 | Processed By | Người xử lý |
| 9 | Action | Xem/Duyệt/Từ chối/Sửa/Xoá |

## Chức năng/nút thao tác
- Thêm mới yêu cầu đặt phòng trực tiếp (mở BOOK-043)
- Xem chi tiết (mở BOOK-045)
- Sửa (mở BOOK-044)
- Duyệt yêu cầu (approveDirectBooking)
- Từ chối yêu cầu (rejectDirectBooking)
- Xoá yêu cầu (deleteDirectBooking)

## Điều hướng
- Mở từ: Menu module Đặt phòng > Direct Booking
- Điều hướng tới: BOOK-043 (Thêm), BOOK-044 (Sửa), BOOK-045 (Xem), BOOK-046 (Danh sách đã huỷ)
