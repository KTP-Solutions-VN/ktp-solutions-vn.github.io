# BOOK-036 — Thêm đặt phòng mới

**Loại:** Trang đầy đủ
**Route:** Booking/addBooking/:id? (mặc định: `/booking/add-booking`, có id thì là sửa booking thủ công)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Form tạo nhanh một đặt phòng thủ công (manual booking) không qua kênh OTA: nhập thông tin khách, villa, ngày nhận/trả phòng, kênh đặt, số tiền và trạng thái thanh toán.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên khách | `first_name` | Text | Có | |
| 2 | Họ khách | `last_name` | Text | Có | |
| 3 | Liên hệ khách (SĐT/Email) | `contact` | Text | Có | |
| 4 | Villa | `villa_id` | Select (select2) | Có | Lọc theo villa đang mở (status=Open) và quyền business unit của user |
| 5 | Ngày nhận phòng | `check_in_date` | Datepicker | Có | |
| 6 | Ngày trả phòng | `check_out_date` | Datepicker | Có | |
| 7 | Kênh đặt (Referer) | `referer` | Select | Có | Azura / Owner... |
| 8 | Số tiền đặt phòng | `amount` | Số | Có | |
| 9 | Thanh toán | `payment` | Text/Select | Không | |
| 10 | Trạng thái | `status` | Select | Có | |

Ghi chú: có action ẩn `why_here_form_1` phục vụ log/khảo sát nội bộ, không phải nghiệp vụ chính.

Lưu ý kỹ thuật: mã nguồn có sẵn các action `step3()`…`step8()` (view step1.ctp, step5.ctp, step6.ctp, step7.ctp, step8.ctp — đa phần chỉ vài dòng) là tàn dư của một luồng wizard nhiều bước cũ, hiện dường như không còn được liên kết chủ động từ giao diện chính; không tạo màn hình riêng cho các bước này.

## Chức năng/nút thao tác
- Nút **Lưu** — tạo booking thủ công mới, ghi vào bảng ManualBooking/Booking
- Nút **Xem danh sách booking đã tạo thủ công** — mở BOOK-036-P1

## Điều hướng
- Mở từ: Menu module Đặt phòng > Thêm đặt phòng
- Điều hướng tới: BOOK-036-P1 (Danh sách đặt phòng thủ công)
