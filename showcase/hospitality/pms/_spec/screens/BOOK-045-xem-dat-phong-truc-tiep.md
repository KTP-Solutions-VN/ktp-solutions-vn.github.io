# BOOK-045 — Xem đặt phòng trực tiếp

**Loại:** Popup (mở từ BOOK-042)
**Route:** Booking/viewDirectBooking/:id (mặc định: `/booking/view-direct-booking/:id`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Popup xem chi tiết (chỉ đọc) yêu cầu đặt phòng trực tiếp, bao gồm thông tin duyệt/từ chối.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa | `property` | Text (readonly) | - | |
| 2 | Ngày check-in/check-out | `check_in_date`/`check_out_date` | Text (readonly) | - | |
| 3 | Số đêm | `nights` | Text (readonly) | - | |
| 4 | Tên khách (họ/tên) | `first_name`/`family_name` | Text (readonly) | - | |
| 5 | Liên hệ | `contact` | Text (readonly) | - | |
| 6 | Số khách | `guests` | Text (readonly) | - | |
| 7 | Loại | `type` | Text (readonly) | - | |
| 8 | Số tiền / Đã thanh toán | `amount`/`paid` | Text (readonly) | - | |
| 9 | Điều kiện đặc biệt | `special_conditions` | Text (readonly) | - | |
| 10 | Yêu cầu bởi / Ngày | `requested_text`/`on_text` | Text (readonly) | - | |
| 11 | Trạng thái | `status` (Approved/Rejected) | Text (readonly) | - | |
| 12 | Lý do (nếu từ chối) | `reason` | Text (readonly) | - | |

## Chức năng/nút thao tác
- Chỉ xem, không chỉnh sửa

## Điều hướng
- Mở từ: BOOK-042 (Danh sách đặt phòng trực tiếp) — nút Xem
- Đóng popup quay lại BOOK-042
