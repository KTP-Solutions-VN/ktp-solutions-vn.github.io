# BOOK-043 — Thêm đặt phòng trực tiếp

**Loại:** Popup (mở từ BOOK-042)
**Route:** Booking/addDirectBooking/:id? (mặc định: `/booking/add-direct-booking`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Form gửi yêu cầu đặt phòng trực tiếp cho villa (thường dùng bởi chủ villa/đối tác), gồm thông tin khách, ngày ở và điều kiện đặc biệt.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa | `property` | Select | Có | |
| 2 | Ngày check-in | `check_in_date` | Datepicker | Có | |
| 3 | Ngày check-out | `check_out_date` | Datepicker | Có | |
| 4 | Số đêm | `nights` | Số (tự tính) | - | |
| 5 | Tên khách | `first_name` | Text | Có | |
| 6 | Họ khách | `last_name` | Text | Có | |
| 7 | Email | `email` | Text | Không | |
| 8 | Số điện thoại | `phone_number` | Text | Có | |
| 9 | Số lượng khách | `guests` | Số | Có | |
| 10 | Loại đặt phòng | `type` | Select | Có | |
| 11 | Số tiền | `amount` | Số | Có | |
| 12 | Trạng thái thanh toán | `paid` | Select/Checkbox | Không | |
| 13 | Yêu cầu đặc biệt | `requested_by` | Text | Không | |
| 14 | Điều kiện đặc biệt | `special_conditions` | Textarea | Không | |
| 15 | Người yêu cầu (By) | `by` | Text | Không | |

## Chức năng/nút thao tác
- Nút **Gửi yêu cầu** — tạo mới yêu cầu đặt phòng trực tiếp, chuyển vào BOOK-042 chờ duyệt

## Điều hướng
- Mở từ: BOOK-042 (Danh sách đặt phòng trực tiếp)
- Điều hướng tới: quay lại BOOK-042
