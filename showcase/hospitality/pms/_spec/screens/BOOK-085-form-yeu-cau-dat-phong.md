# BOOK-085 — Form yêu cầu đặt phòng (Booking Enquiry)

**Loại:** Trang đầy đủ (dành cho khách hàng/khách vãng lai, không phải trang quản trị nội bộ)
**Route:** Booking/bookingEnquiry/:id
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (lưu ý: route `/booking-enquiry` trong Routes.php trỏ tới `Api2::bookingEnquiry`, KHÁC với action này)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Trang công khai (public-facing) hiển thị thông tin villa và cho phép khách điền form gửi yêu cầu đặt phòng trực tiếp tới chủ villa (qua email), kèm lịch chọn ngày có đánh dấu các ngày đã kín phòng. Đây là form dành cho khách hàng/đối tác bên ngoài điền, không phải công cụ nội bộ của nhân viên vận hành.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên | `first_name` | Text | Có | Giá trị được lưu cookie 30 ngày để điền sẵn lần sau |
| 2 | Họ | `last_name` | Text | Có | Lưu cookie tương tự |
| 3 | Số điện thoại | `phone_number` | Text | Có | Lưu cookie tương tự |
| 4 | Email | `email` | Email | Có | Lưu cookie tương tự |
| 5 | Số người lớn | `adult` | Number | Có | Mặc định 2 |
| 6 | Số trẻ em | `children` | Number | Có | Mặc định 0 |
| 7 | Khoảng ngày đặt | `booking_range` | Date range picker | Có | Định dạng `DD-MM-YYYY/DD-MM-YYYY`; disable các ngày đã có booking (`Booking.check_in/check_out`), kiểm tra số đêm tối thiểu (`minimum_stay` của villa) |

### Thông tin hiển thị (không nhập)
- Tên villa, ảnh đại diện villa
- Lời chào "Thank you for booking with us + tên villa"

## Chức năng/nút thao tác
- Nút **Submit** — kiểm tra ngày chọn có trùng booking hiện có không (nếu trùng: cảnh báo "Dates already booked..." và quay lại); nếu hợp lệ, gửi email yêu cầu tới email của đơn vị kinh doanh sở hữu villa (`business_unit.email`), rồi điều hướng sang BOOK-086 (Xác nhận gửi yêu cầu thành công)
- Chuyển tháng lịch (nút prev/next trên date range picker) — gọi AJAX `getOccupiedDates` để tải các ngày đã kín phòng của tháng đó

## Điều hướng
- Mở từ: Trang chi tiết villa (public) khi khách bấm "Enquire"/"Book now"
- Điều hướng tới: BOOK-086 (Xác nhận gửi yêu cầu thành công) sau khi submit thành công
