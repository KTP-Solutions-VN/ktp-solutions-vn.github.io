# BOOK-028 — Chi tiết đặt phòng (đầy đủ)

**Loại:** Trang đầy đủ
**Route:** Booking/viewDetails/:id (mặc định: `/booking/view-details/:id`, id được base64_encode)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Trang xem chi tiết đầy đủ (chỉ đọc) của một đặt phòng, gồm nhiều khối thông tin: thông tin booking, thông tin khách, thông tin trước khi đến (pre-arrival), giờ nhận/trả phòng, và hình ảnh đính kèm booking. Khác với BOOK-002-P1 (Xem nhanh) ở chỗ có thêm khối Pre-arrival Details, Arrival & Departure (giờ/nhân viên check-in-out) và Booking Images.

## Mô tả chi tiết

### Khối 1 — Booking Details
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Mã booking (Beds24) | `beds_24_booking_id` | Text (readonly) | - | |
| 2 | Kênh đặt (Referer) | `referer` | Text (readonly) | - | |
| 3 | Ngày đặt | `booking_date` | Text (readonly) | - | Định dạng d, D M Y H:i:s |
| 4 | Trạng thái | `status` | Text (readonly) | - | |
| 5 | Ngày check-in | `check_in_detail.check_in_date/time` | Text (readonly) | - | |
| 6 | Ngày check-out | `check_in_detail.check_out_date/time` | Text (readonly) | - | |
| 7 | Số tiền | `amount` | Text (readonly) | - | |
| 8 | Hoa hồng | `commission` | Text (readonly) | - | |
| 9 | Thuế | `tax` | Text (readonly) | - | |
| 10 | Số tiền còn nợ | `outstanding_payment` | Text (readonly) | - | |
| 11 | Trạng thái thanh toán | `payment_status` | Text (readonly) | - | |
| 12 | Đơn vị tiền tệ thanh toán | `payment_currency` | Text (readonly) | - | |
| 13 | Villa | `villa.name` | Text (readonly) | - | |
| 14 | Chủ sở hữu | `owner.name` | Text (readonly) | - | |
| 15 | Mô tả thanh toán | `payment_description` | Text (readonly) | - | |
| 16 | Thông báo API | `api_message` | Text (readonly) | - | |
| 17 | Tin nhắn | `message` | Text (readonly) | - | |
| 18 | Ghi chú | `notes` | Text (readonly) | - | |

### Khối 2 — Guest Details
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên khách | `guest.first_name` | Text (readonly) | - | |
| 2 | Họ khách | `guest.family_name` | Text (readonly) | - | |
| 3 | Email | `guest.email` | Text (readonly) | - | |
| 4 | Quốc gia | `guest.country` | Text (readonly) | - | |
| 5 | Ngôn ngữ | `guest.language` | Text (readonly) | - | |
| 6 | Tổng số khách | `guest.guest_no` | Text (readonly) | - | |
| 7 | Người lớn | `guest.adult` | Text (readonly) | - | |
| 8 | Trẻ em | `guest.child` | Text (readonly) | - | |
| 9 | Số điện thoại di động | `guest.mobile_number` | Text (readonly) | - | |

### Khối 3 — Pre-arrival Details
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Leader (trưởng nhóm chat) | `group_chat.leader_name` | Text (readonly) | - | Hiện "Not assigned" nếu chưa gán |
| 2 | Giờ dự kiến đến | `pre_arrival_detail.estimated_arrival` | Text (readonly) | - | |
| 3 | Có cần đưa đón không | `pre_arrival_detail.transfer_required` | Text (readonly) | - | |
| 4 | Thông tin đưa đón | `pre_arrival_detail.transfer_data` | Text (readonly) | - | |
| 5 | Yêu cầu thêm | `pre_arrival_detail.extra_requirement` | Text (readonly) | - | |
| 6 | Trạng thái chat với khách | `group_chat_status` | Text (readonly) | - | |

### Khối 4 — Arrival & Departure
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Giờ check-in | `check_in_detail.check_in_time` | Text (readonly) | - | |
| 2 | Giờ check-out | `check_in_detail.check_out_time` | Text (readonly) | - | |
| 3 | Nhân viên check-in | `check_in_detail.check_in_staff` | Text (readonly) | - | |
| 4 | Nhân viên check-out | `check_in_detail.check_out_staff` | Text (readonly) | - | |

### Khối 5 — Booking Images (hiển thị có điều kiện khi có ảnh)
Danh sách ảnh đính kèm booking (`booking_images`), hiển thị dạng lưới ảnh.

## Chức năng/nút thao tác
- Trang chỉ đọc, không có nút chỉnh sửa trực tiếp — chỉnh sửa thực hiện qua BOOK "Chỉnh sửa đặt phòng" (edit)
- Breadcrumb điều hướng: Trang chủ > Danh sách đặt phòng > Chi tiết đặt phòng

## Điều hướng
- Mở từ: BOOK-002 (Danh sách đặt phòng), BOOK-001 (Lịch check-in/check-out) — click vào tên khách/villa
- Điều hướng tới: quay lại BOOK-002 qua breadcrumb
