# OWP-010 — Đặt chỗ (Reservations)

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::bookingList()` — không có route đẹp riêng (mặc định `/external-user/booking-list`)

**Module:** Không gian chủ nhà

## Mô tả ngắn gọn

Danh sách toàn bộ đặt phòng (booking) thuộc các biệt thự của Chủ sở hữu, có bộ lọc theo biệt thự, trạng thái, ngày/khoảng ngày nhận phòng.

## Mô tả chi tiết

Bộ lọc:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại lọc theo ngày | select_date | Select | Không | "Date" hoặc "Date Range" |
| 2 | Ngày nhận phòng | check_in_date | Date | Không | Hiện khi chọn loại "Date" |
| 3 | Khoảng ngày nhận phòng | check_in_range | Date range | Không | Hiện khi chọn loại "Date Range" |
| 4 | Biệt thự | villa_id | Select2 | Không | |
| 5 | Trạng thái | status | Select2 | Không | Cancelled/Confirmed/New/Request/Black |

Danh sách — cột hiển thị:

| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Biệt thự | villa.name | |
| 2 | Nguồn đặt | referer | |
| 3 | Tên khách | guest.first_name + family_name | |
| 4 | Quốc gia | guest.country | Hiển thị cờ quốc gia |
| 5 | Thời gian nhận phòng | check_in_date | |
| 6 | Concierge phụ trách | user.first_name + family_name | |
| 7 | Trạng thái đặt phòng | status | |
| 8 | Trạng thái chat với khách | pre_arrival_detail.guest_chat_status | |
| 9 | Thao tác | — | Xem chi tiết |

## Chức năng/nút thao tác

- Tìm kiếm/lọc đặt phòng
- Xem chi tiết đặt phòng (icon mắt → OWP-010-P1)

## Điều hướng

- Truy cập từ menu chính (Reservations)
- Click icon xem chi tiết → OWP-010-P1 (popup chi tiết đặt phòng)
