# OWP-012 — Khách sắp đến (Upcoming Arrivals)

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::checkIn()` — không có route đẹp riêng (mặc định `/external-user/check-in`)

**Module:** Không gian chủ nhà

## Mô tả ngắn gọn

Danh sách các đặt phòng ở trạng thái nhận phòng (check-in), có bộ lọc theo biệt thự và khoảng ngày nhận phòng; hỗ trợ xuất dữ liệu ra file Excel (.xls).

## Mô tả chi tiết

Bộ lọc:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại lọc theo ngày | select_date | Select | Không | "Date" hoặc "Date Range" |
| 2 | Khoảng ngày nhận phòng | check_in_range | Date range | Không | |
| 3 | Biệt thự | villa_id | Select2 | Không | |

Danh sách — cột hiển thị:

| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Nhân viên check-in | check_in_detail.check_in_staff | |
| 2 | Biệt thự | villa.name | |
| 3 | Kênh đặt phòng | referer | |
| 4 | Tên khách | guest.first_name + family_name | |
| 5 | Quốc gia | guest.country | Hiển thị cờ |
| 6 | Thời gian nhận phòng | check_in_date | |
| 7 | Thông tin đưa đón | pre_arrival_detail.transfer_data | |
| 8 | Giờ đến dự kiến | pre_arrival_detail.estimated_arrival | |
| 9 | Concierge phụ trách | user.first_name + family_name | |
| 10 | Trạng thái chat khách | pre_arrival_detail.guest_chat_status | |

## Chức năng/nút thao tác

- Tìm kiếm/lọc theo biệt thự và khoảng ngày
- Xuất danh sách ra file Excel (.xls)

## Điều hướng

- Truy cập từ menu chính (Upcoming Arrivals)
- Không có điều hướng chi tiết riêng (là danh sách tổng hợp)
