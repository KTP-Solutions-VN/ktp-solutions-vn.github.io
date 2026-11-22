# GST-002 — Đặt chỗ của tôi (My Reservations)

**Loại:** Trang đầy đủ
**Route:** `Guest::bookings()` — mặc định `/guest/bookings`; route đẹp (fallback DashedRoute): `/guest/bookings`
**Module:** Không gian khách

## Mô tả ngắn gọn
Liệt kê tất cả đặt phòng (booking) gắn với `access_code` của khách đang đăng nhập, chia thành "đặt phòng sắp tới" và "đặt phòng trong quá khứ". Đây là trang khách được chuyển tới sau khi đăng nhập thành công bằng access code ở GST-001.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Ảnh nền banner | `banner_image` (từ `CmsImage` tag=`Main` theo `villa_id`) | Ảnh nền | Không | Lấy theo villa của booking sắp tới gần nhất; mặc định `img2.jpg` nếu chưa có |
| 2 | Tiêu đề chào mừng | `staticText.banner_title_23_text` / `banner_title_21_text` | Text hiển thị (đa ngôn ngữ) | Không | Đổi câu theo `guest_booking_count` (1 hay nhiều booking) |
| 3 | Ảnh biệt thự (mỗi thẻ booking) | `Villa.villa_image` (ảnh đầu tiên) | Ảnh | Không | Mặc định `default.jpg` nếu villa chưa có ảnh |
| 4 | Tên biệt thự | `Villa.name` | Text hiển thị | Không | |
| 5 | Ngày nhận phòng | `Booking.check_in_date` | Text hiển thị (định dạng `d M y`) | Không | |
| 6 | Ngày trả phòng | `Booking.check_out_date` | Text hiển thị (định dạng `d M y`, +1 ngày) | Không | |
| 7 | Nhãn "Đặt phòng quá khứ" | `staticText.your_past_booking_text` | Text hiển thị | Không | Chỉ hiện khi vừa có booking tương lai vừa có booking quá khứ |
| 8 | Gợi ý hoàn tất check-in online | `staticText.complete_your_online_check_in_...` | Link text | Không | Chỉ hiện khi có ít nhất 1 booking sắp tới |
| 9 | Tổng số đặt phòng | `guest_booking_count` | Số | Không | Dùng để chọn văn bản banner số ít/nhiều |

## Chức năng/nút thao tác
- Click vào thẻ **booking sắp tới** → mở GST-003 (Chi tiết chuyến đi) theo `booking_id`.
- Click vào thẻ **booking quá khứ** → mở GST-004 (Lối tắt) theo `booking_id`.
- Click link **"Hoàn tất check-in online để mở khoá gợi ý..."** → mở GST-003 với `booking_id` của booking sắp tới đầu tiên.
- Icon **Home** (góc trái banner) → điều hướng theo `home_redirect` (mặc định về chính trang này, hoặc GST-004 nếu booking gần nhất đã xác nhận cả giờ đến/đi).
- Icon **Logout** (góc phải banner) → đăng xuất, quay về GST-001.

## Điều hướng
- → GST-003 (booking sắp tới)
- → GST-004 (booking quá khứ)
- → GST-001 (đăng xuất)
