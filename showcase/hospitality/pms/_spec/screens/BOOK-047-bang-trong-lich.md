# BOOK-047 — Lưới phòng trống (Availability Grid)

**Loại:** Trang đầy đủ (có thể nhúng/chia sẻ cho đối tác — public widget theo `referer`/`bu`)
**Route:** Booking/availability (mặc định: `/booking/availability`, hỗ trợ query `referer` hoặc `bu`, `district`, `villa_id`)
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php cho action này (dùng route mặc định)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Trang hiển thị lịch trống của các villa (dạng lưới villa x ngày), có thể lọc theo vị trí/quận (district), villa cụ thể, hoặc theo đối tác/agent (qua tham số `referer` để đổi logo thương hiệu hiển thị). Dùng để chia sẻ nhanh tình trạng phòng trống cho đối tác/khách hàng.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Vị trí/Địa chỉ | `location`/`address` | Select/Text | Không | |
| 2 | Đơn vị kinh doanh | `bu` | Query param | Không | Xác định logo/thương hiệu hiển thị |
| 3 | Đối tác (Referer) | `referer` | Query param | Không | Nếu khác "Azura" sẽ hiển thị logo của Agent |
| 4 | Quận/khu vực | `district` | Select | Không | |
| 5 | Villa | `villa_id` | Select | Không | |

### Hiển thị
Lưới villa theo ngày thể hiện trạng thái trống/đã đặt, kèm giá (`price_text`) mỗi villa.

## Chức năng/nút thao tác
- Lọc theo vị trí/quận/villa
- Nút **Filter** — áp dụng bộ lọc
- Nút **Book** — chuyển sang luồng đặt phòng cho villa trống
- Nút **Download** — tải bảng trống lịch

## Điều hướng
- Mở từ: Menu module Đặt chỗ > Availability Grid, hoặc link chia sẻ trực tiếp cho đối tác
- Điều hướng tới: luồng đặt phòng (BOOK-036/OTA) khi bấm Book
