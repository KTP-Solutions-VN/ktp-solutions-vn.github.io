# USR-022 — Đồng hồ chấm công (Time Clock)

**Loại:** Trang đầy đủ

**Route:** `UserController::clockIn()` — mặc định `user/clockIn`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Trang cho phép nhân viên bắt đầu ngày làm việc (Start my day), kết thúc ngày làm việc (End my day) hoặc đánh dấu nghỉ trong ngày (Day off today). Hệ thống lấy vị trí GPS hiện tại của trình duyệt, so khớp với văn phòng đã đăng ký để hiển thị thông báo "Tôi đang ở [tên văn phòng]".

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Vĩ độ (latitude) | `lat` | Hidden | Có | Lấy tự động qua `navigator.geolocation` |
| 2 | Kinh độ (longitude) | `lon` | Hidden | Có | Lấy tự động qua `navigator.geolocation` |
| 3 | Thời gian | `time` | Hidden | Có | Tự động điền thời gian hiện tại, cập nhật mỗi phút |

## Chức năng/nút thao tác
- **Bắt đầu ngày làm việc (Start my day):** hiển thị khi chưa chấm công trong ngày; lưu `clock_in_time`, `clock_in_location` (so khớp văn phòng theo bán kính 100m), đặt session `is_start_clock_in = yes`.
- **Nghỉ hôm nay (Day off today):** đánh dấu `is_user_day_off = yes` cho ngày hiện tại, sau đó đăng xuất người dùng.
- **Kết thúc ngày làm việc (End my day):** hiển thị khi đã chấm công vào và chưa chấm công ra; lưu `clock_out_time`, `clock_out_location`, sau đó đăng xuất người dùng.
- Thông báo vị trí (ajax `getClockInMessage`) hiển thị "I am at [tên văn phòng]" kèm ảnh văn phòng nếu khớp, hoặc thông báo không xác định được vị trí.

## Điều hướng
- Vào từ: menu chính (dành cho nhân viên chấm công) hoặc bắt buộc khi đăng nhập nếu chưa chấm công (tuỳ cấu hình quyền).
- Điều hướng đến: LOG-001 (Đăng nhập) sau khi "End my day" hoặc "Day off today" (hệ thống đăng xuất).
