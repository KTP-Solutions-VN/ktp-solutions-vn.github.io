# GST-003 — Chi tiết chuyến đi (Trip Details)

**Loại:** Trang đầy đủ
**Route:** `Guest::yourBooking($booking_id = null)` — mặc định `/guest/your-booking/:booking_id`; route đẹp: `/guest/your-booking` (khai báo tường minh trong `Routes.php`, không truyền `booking_id` trong URL đẹp — khi không truyền, hệ thống lấy booking mặc định của khách `user['guest_booking_id']`)
**Module:** Không gian khách

## Mô tả ngắn gọn
Trang chi tiết một đặt phòng cụ thể: hiển thị địa chỉ villa, ngày nhận/trả phòng, và cho phép khách xác nhận hoặc điều chỉnh giờ đến/giờ đi dự kiến (pre-arrival). Khi cả hai mốc giờ đã được xác nhận, khách được mở khoá nút vào GST-004 (Lối tắt). Đây cũng là trang mặc định sau khi đăng nhập (`Auth.loginRedirect`) và là đích của `home_redirect` khi booking gần nhất chưa hoàn tất xác nhận giờ.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Tên biệt thự | `Villa.name` (`property_name`) | Text hiển thị | Không | |
| 2 | Địa chỉ villa | `VillaLocation.address` | Text hiển thị (click mở bản đồ) | Không | Click cả dòng sẽ mở `google_map_url` ở tab mới |
| 3 | Link bản đồ | `VillaLocation.google_map_url` | Link (window.open) | Không | |
| 4 | Ngày nhận phòng | `Booking.check_in_date` | Text hiển thị (`d M y`) | Không | |
| 5 | Ngày trả phòng | `Booking.check_out_date` | Text hiển thị (`d M y`, +1 ngày) | Không | |
| 6 | Giờ đến dự kiến | `PreArrivalDetail.estimated_arrival` | Input text + time picker (`mdtimepicker`, `hh:mm`) | Có, khi ở chế độ chỉnh sửa | Không cho chọn giờ nằm trong khoảng 00:00 → giờ check-in chuẩn của villa/business unit |
| 7 | Nơi đến (arrival place) | `PreArrivalDetail.arrival_place` | Radio: `at_the_airport` / `at_the_property` | Có | Mặc định `at_the_property`, danh sách lấy từ `CommonController::_getArrivalPlace()` |
| 8 | Người thiết lập giờ đến | `check_in_time_set_by` | Hidden input | Không | Giá trị `auto` (hệ thống) hoặc `guest` (khách tự đổi) |
| 9 | Trạng thái xác nhận giờ đến | `PreArrivalDetail.check_in_status` | Trạng thái hệ thống (`no_action`/`unapproved`/`approved`/`reject`) | Không | Điều khiển hiện/ẩn khối chỉnh sửa và nút Confirm |
| 10 | Thông báo giờ đến | (chuỗi dựng động `check_in_message`) | Text hiển thị (HTML) | Không | Ghép văn bản tĩnh + giờ + người xác nhận + thời điểm cập nhật |
| 11 | Giờ đi dự kiến | `PreArrivalDetail.estimated_departure` | Input text + time picker | Có, khi ở chế độ chỉnh sửa | Không cho chọn giờ nằm trong khoảng giờ check-out chuẩn → 00:00 |
| 12 | Người thiết lập giờ đi | `check_out_time_set_by` | Hidden input | Không | Giá trị `auto`/`guest` |
| 13 | Trạng thái xác nhận giờ đi | `PreArrivalDetail.check_out_status` | Trạng thái hệ thống | Không | |
| 14 | Thông báo giờ đi | (chuỗi dựng động `check_out_message`) | Text hiển thị (HTML) | Không | |
| 15 | Số lượng đặt phòng của khách | `guest_booking_count` | Số | Không | Ảnh hưởng câu chào banner |

## Chức năng/nút thao tác
- **Nút "Confirm" (giờ đến)**: gọi AJAX `POST /guest/confirm-time` (action `confirmTime`, chỉ trả JSON) với `arrival_time`, `arrival_place`, `check_in_time_set_by`, `booking_id` → cập nhật `PreArrivalDetail` (đặt `check_in_status = unapproved`, tăng `guest_checkin_request_count` nếu trạng thái trước đó khác `unapproved`).
- **Nút bút chì "Change" (giờ đến)**: mở lại form chỉnh sửa giờ đến đã xác nhận trước đó.
- **Nút "Confirm" (giờ đi)**: gọi AJAX tương tự cho `departure_time`, `check_out_time_set_by`.
- **Nút bút chì "Change" (giờ đi)**: mở lại form chỉnh sửa giờ đi.
- **Link/nút "Access Portal"**: chỉ là link thật (điều hướng GST-004) khi cả `check_in_modify_date` và `check_out_modify_date` đã có giá trị; nếu chưa, hiển thị nút mờ màu xám và khi click sẽ hiện cảnh báo "vui lòng xác nhận giờ đến/đi trước khi truy cập cổng thông tin".
- Icon **Home** → theo `home_redirect`.
- Icon **Logout** → đăng xuất, về GST-001.

## Điều hướng
- → GST-004 (Lối tắt) khi đã xác nhận cả giờ đến và giờ đi
- → GST-002 (Đặt chỗ của tôi) qua icon Home (tuỳ trạng thái)
- → GST-001 (đăng xuất)
