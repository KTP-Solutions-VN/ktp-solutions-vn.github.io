# BOOK-002-P1 — Xem nhanh đặt phòng
**Loại:** Trang đầy đủ (LƯU Ý: xem ghi chú cuối trang — không phải popup dù đặt tên "Xem nhanh")
**Route:** Booking/viewBooking/:id (mặc định: `/booking/view-booking/:id`, id được base64_encode)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Trang hiển thị thông tin chi tiết (chỉ đọc) của một đặt phòng: mã booking, kênh đặt, ngày đặt, trạng thái, ngày/giờ check-in - check-out, số tiền, hoa hồng OTA, số tiền thực nhận, thông tin khách (ngôn ngữ, số khách, người lớn/trẻ em, số điện thoại).

## Mô tả chi tiết
Bảng field hiển thị (toàn bộ dạng text/label, không có input chỉnh sửa):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Mã booking (Beds24) | `beds_24_booking_id` | Text (readonly) | - | Hiển thị trên tiêu đề card |
| 2 | Kênh đặt phòng | `referer` | Text (readonly) | - | Ví dụ Booking.com, Expedia... |
| 3 | Ngày đặt | `booking_date` | Text (readonly) | - | Định dạng d, D M Y H:i:s |
| 4 | Trạng thái | `status` | Text (readonly) | - | Confirmed/Cancelled/New/Request/Black |
| 5 | Ngày check-in | `check_in_detail.check_in_date` + `check_in_time` | Text (readonly) | - | |
| 6 | Ngày check-out | `check_in_detail.check_out_date` + `check_out_time` | Text (readonly) | - | |
| 7 | Số tiền (Amount) | `amount` | Số (readonly) | - | Làm tròn 2 chữ số thập phân |
| 8 | Hoa hồng OTA | tính toán từ `commission` | Số (readonly) | - | Với Booking.com cộng thêm VAT 7% |
| 9 | Số tiền thực nhận (Net amount) | tính toán `net_amount` | Số (readonly) | - | = Gross - hoa hồng OTA |
| 10 | Ngôn ngữ khách | `guest.language` | Text (readonly) | - | N/A nếu trống |
| 11 | Tổng số khách | `guest.guest_no` | Số (readonly) | - | |
| 12 | Số người lớn | `guest.adult` | Số (readonly) | - | |
| 13 | Số trẻ em | `guest.child` | Số (readonly) | - | |
| 14 | Số điện thoại di động | `guest.mobile_number` | Text (readonly) | - | |

## Chức năng/nút thao tác
- Chỉ xem thông tin, không có nút chỉnh sửa/lưu trên màn hình này.

## Điều hướng
- Mở từ: BOOK-002 (Danh sách đặt phòng — nút "Xem chi tiết"), BOOK-004 (Đặt phòng mới nhất — nút "View Booking")
- Điều hướng tới: không có (màn hình cuối luồng, chỉ xem)
- Popup con: không có

## Ghi chú kỹ thuật (khuyến nghị điều chỉnh)
Đã kiểm tra `view_booking.ctp`: view render đầy đủ `page-breadcrumb` + `container-fluid` như một trang layout độc lập, được mở bằng thẻ `<a href>` link thông thường (`$this->Html->link(..., ['action' => 'viewBooking', ...])`) từ `latest_bookings.ctp` và `booking_list.ctp` — KHÔNG có cấu trúc `.modal`/AJAX nạp vào popup. Do đó đây thực chất là một **trang riêng (Trang đầy đủ)**, không phải Popup như mô tả ban đầu trong yêu cầu. Đề xuất đổi Loại màn hình thành "Trang đầy đủ" (mở từ BOOK-002/BOOK-004).
