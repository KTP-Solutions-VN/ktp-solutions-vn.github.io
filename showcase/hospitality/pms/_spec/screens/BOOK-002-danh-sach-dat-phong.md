# BOOK-002 — Tất cả đặt chỗ (All Reservations)
**Loại:** Trang đầy đủ
**Route:** Booking/bookingList (mặc định: `/booking/booking-list`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Màn hình tra cứu/tìm kiếm danh sách đặt phòng theo ngày check-in, cho phép lọc theo đơn vị kinh doanh, villa, tên khách. Kết quả hiển thị dạng bảng nhóm theo villa/business unit kèm các nút thao tác nhanh: sửa, xem chi tiết, tải PDF booking.

## Mô tả chi tiết

### Bộ lọc tìm kiếm
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select (select2) | Không | "All" + danh sách BU/zone theo quyền user |
| 2 | Villa | `villa_id` | Select (select2, required) | Có | Khi đổi Business Unit sẽ AJAX nạp lại danh sách villa tương ứng (endpoint `/VM/common/getBusinessUnitVilla`) |
| 3 | Tên khách | `guest_name` | Text | Không | Placeholder "Guest Name" |
| 4 | Loại ngày | `calendar_date` | Select | Không | `any` (Bất kỳ) / `other` (Ngày khác) — chỉ hiện khi đã chọn 1 villa cụ thể |
| 5 | Ngày check-in | `check_in` | Text + Datepicker (dd-mm-yyyy) | Không | Chỉ hiện khi `calendar_date = other` hoặc chưa chọn villa |
| 6 | Nút Tìm kiếm | `search` | Submit button | - | Gửi form POST để tải lại danh sách |
| 7 | Điều hướng ngày check-in | mũi tên trái/phải + datepicker ẩn | Button/Datepicker | Không | Xem nhanh ngày trước/sau |

### Cột hiển thị bảng kết quả (nhóm theo villa/business unit)
- Ngày check-in
- Giờ check-in
- Villa (tên)
- Tên khách
- Quốc tịch (icon cờ)
- Số đêm ở (days)
- Kênh đặt phòng/OTA (referer)
- Hành động: Sửa (icon bút), Xem chi tiết (icon mắt), Tải PDF booking (icon download)

## Chức năng/nút thao tác
- Tìm kiếm/lọc danh sách theo Business Unit, Villa, tên khách, ngày check-in
- Chuyển đổi nhanh ngày xem (mũi tên trái/phải hoặc chọn ngày trên lịch)
- Sửa booking (điều hướng tới BOOK-010)
- Xem nhanh chi tiết booking (điều hướng tới BOOK-002-P1 — `viewBooking`)
- Tải xuống file PDF thông tin booking (action `downloadBookingPdf`, không có màn hình riêng — chỉ là thao tác tải file)

## Điều hướng
- Mở từ: Menu module Đặt chỗ (mục "All Reservations")
- Điều hướng tới: BOOK-010 (Điều chỉnh đặt chỗ — nút Sửa), BOOK-002-P1 (Xem nhanh đặt chỗ — nút Xem chi tiết)
- Popup con: không có (viewBooking mở dưới dạng trang riêng, xem ghi chú tại BOOK-002-P1)
