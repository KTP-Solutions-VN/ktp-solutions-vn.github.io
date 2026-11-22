# PROP-042 — Cài đặt đặt ngay (Instant Book Settings)

**Loại:** Trang đầy đủ
**Route:** property/booking-restriction
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang liệt kê danh sách Property (trạng thái Open) cùng loại hình đặt phòng (Instant Booking / Non-Instant Booking) hiện tại, lọc theo Business Unit và loại đặt phòng. Cho phép bật/tắt (toggle) nhanh chế độ Instant Booking ngay trên danh sách, dữ liệu lưu bảng `VillaBookingType`.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 (có option "All") | Có (class `required`) | Đổi giá trị → reload với query `business_unit_id`, lưu cookie |
| 2 | Booking Type | `booking_type` | Select2 (All/Instant booking/Non-Instant Booking) | Có | Đổi giá trị → reload với query `booking_type` |

### Cột hiển thị
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | No | — | Text | — | Số thứ tự |
| 2 | Property | `villa.name` | Text | — | Qua contain Villa |
| 3 | Status | `villa.status` | Text | — | |
| 4 | Advance Booking | `booking_type` | Toggle icon (on/off) | — | Icon "toggle-on" nếu = Instant Booking, ngược lại "toggle-off" |
| 5 | Action | — | Icon-button | — | Icon Edit → mở tab "OTA Management" của trang Villa (PROP villa chưa tách mã tab) |

## Chức năng/nút thao tác
- Đổi Business Unit/Booking Type → reload danh sách theo điều kiện lọc.
- Click icon toggle (bật/tắt) trên dòng Property → gọi AJAX `updateBookingRestriction` để đổi `booking_type` giữa "Instant Booking" và "Non-Instant Booking", cập nhật lại icon tại chỗ, hiện Flash message.
- Icon Edit → điều hướng tới `property/villa/ota management/{villa_id}` (tab "OTA Management" của màn hình Villa Detail).

## Điều hướng
- Mở từ: Menu Hồ sơ tài sản (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: `property/villa/ota management/:villa_id` (tab OTA Management thuộc action `villa`, ngoài phạm vi các mã đã tài liệu hóa).
- Popup con: Không có.
