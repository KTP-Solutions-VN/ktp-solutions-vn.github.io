# BOOK-079 — Chuẩn bị đón khách VIP (VIP Arrival Prep)

**Loại:** Trang đầy đủ (mở từ BOOK-078)
**Route:** Booking/preparationWork/:button/:booking_id
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Form ghi nhận nhật ký công việc chuẩn bị đón khách VIP: tình trạng dọn dẹp (cleaning) và chuẩn bị đón khách (check-in), phục vụ đội vận hành trước khi khách VIP đến.

**Lưu ý về route:** Có 2 action liên quan cùng nhóm chức năng này:
- `preparationWork($button = null, $booking_id = null)` (dòng ~16796): đây là action **thực sự render view `preparation_work.ctp`** — nhận tham số `$button` (`green-icon` nếu đã có lịch sử, hoặc giá trị khác nếu tạo mới) và `$booking_id`; khi POST sẽ lưu log vào bảng `VipGuestInformation` rồi redirect về BOOK-078. Đây là Route chính của màn hình này.
- `viewPreparationWork()` (dòng ~16909): action AJAX thuần trả JSON (`response`/`result`/`message`, có `_serialize`) để component khác lấy lịch sử log — **không render UI**, không tạo file riêng.

## Mô tả chi tiết

### Form
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Cleaning (Dọn dẹp) | `cleaning` | Textarea | Có | Ghi chú tình trạng dọn dẹp; phía trên hiển thị lịch sử các ghi chú cũ (người tạo, ngày, nội dung) nếu `$button = green-icon` |
| 2 | Check-in (Chuẩn bị đón) | `check_in` | Textarea | Có | Ghi chú công việc chuẩn bị đón khách; tương tự hiển thị lịch sử cũ |

## Chức năng/nút thao tác
- Nút **"Let's get ready!"** (submit) — lưu log mới vào `VipGuestInformation.data` (nối thêm vào mảng lịch sử `cleaning`/`check_in` nếu đã tồn tại), sau đó redirect về BOOK-078 (Khách VIP sắp đến)
- Nút **Cancel** (reset) — xoá nội dung đang nhập trên form

## Điều hướng
- Mở từ: BOOK-078 (Khách VIP sắp đến) — bấm icon "Get Ready" (xanh dương/xanh lá) trên một booking
- Điều hướng tới: quay lại BOOK-078 sau khi lưu thành công hoặc thất bại
