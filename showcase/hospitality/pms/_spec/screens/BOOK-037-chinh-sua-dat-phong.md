# BOOK-037 — Điều chỉnh đặt chỗ (Modify Reservation)

**Loại:** Trang đầy đủ
**Route:** Booking/edit/:id (mặc định: `/booking/edit/:id`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Trang chỉnh sửa đặt phòng gồm 3 khối form độc lập (mỗi khối submit riêng bằng AJAX): thông tin khách/booking (xem tại BOOK-028 phần tương ứng), thông tin nhận/trả phòng, và đặc biệt là khối **Dịch vụ thêm (Extra Services)** — nơi ghi nhận các dịch vụ khách yêu cầu. Có modal gán concierge phụ trách.

## Mô tả chi tiết

### Khối Dịch vụ thêm (Extra Services) — form riêng, submit AJAX
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Giường phụ | `extra_bed` | Text | Không | |
| 2 | Giao đồ ăn | `food_delivery` | Text | Không | |
| 3 | Nôi em bé | `baby_cot` | Text | Không | |
| 4 | Ghế ăn trẻ em | `high_chair` | Text | Không | |
| 5 | Đầu bếp riêng | `meal_chef` | Text | Không | |
| 6 | BBQ | `bbq` | Text | Không | |
| 7 | Thuê xe | `vehicle_rental` | Text | Không | |
| 8 | Tham quan (excursion) | `excursion` | Text | Không | |
| 9 | Yêu cầu đặc biệt | `special_request` | Text | Không | |
| 10 | Điểm đón | `pick_up_point` | Text | Không | |
| 11 | Giờ đón | `pick_up_time` | Time picker (H:i) | Không | |
| 12 | Công ty vận chuyển | `transport_company` | Text | Không | |
| 13 | Số điện thoại liên hệ | `phone_number` | Text | Không | |

### Khối Thông tin booking, Thông tin khách, Ngày/giờ nhận-trả phòng
Bố cục và field tương tự khối tương ứng tại BOOK-028 (Hồ sơ đặt chỗ), nhưng ở đây các field là **input chỉnh sửa được** (không phải readonly) và mỗi khối có nút Submit AJAX riêng.

### Modal gán concierge (`#exampleModalLabel1`)
Popup chọn/gán nhân viên concierge phụ trách booking.

### Khối Booking Images (hiển thị có điều kiện)
Danh sách ảnh đính kèm booking, có thể xem/quản lý.

## Chức năng/nút thao tác
- Submit riêng từng khối (Booking Details, Guest Details, Arrival & Departure, Extra Services) — mỗi khối có nút Submit AJAX độc lập
- Gán concierge qua modal
- Quản lý ảnh đính kèm booking

## Điều hướng
- Mở từ: BOOK-002 (Tất cả đặt chỗ), BOOK-028 (Hồ sơ đặt chỗ) — nút Sửa
- Điều hướng tới: quay lại BOOK-028/BOOK-002 sau khi lưu
