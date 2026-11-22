# OWP-013 — Khách sắp đi (Upcoming Departures)

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::checkOut()` — không có route đẹp riêng (mặc định `/external-user/check-out`)

**Module:** Không gian chủ nhà

## Mô tả ngắn gọn

Danh sách các đặt phòng ở trạng thái trả phòng (check-out), có bộ lọc theo biệt thự và khoảng ngày trả phòng; hỗ trợ xuất dữ liệu ra file Excel (.xls).

## Mô tả chi tiết

Bộ lọc:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại lọc theo ngày | select_date | Select | Không | "Date" hoặc "Date Range" |
| 2 | Khoảng ngày trả phòng | check_in_range | Date range | Không | Lọc theo `check_out_date` |
| 3 | Biệt thự | villa_id | Select2 | Không | |

Danh sách — cột hiển thị:

| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Nhân viên check-in | check_in_detail.check_in_staff | |
| 2 | Biệt thự | villa.name | |
| 3 | Quốc gia | guest.country | Hiển thị cờ |
| 4 | Thời gian trả phòng | check_out_date | |
| 5 | Thông tin đưa đón | pre_arrival_detail.transfer_data | |
| 6 | Concierge phụ trách | user.first_name + family_name | |
| 7 | Ghi chú | notes | |

## Chức năng/nút thao tác

- Tìm kiếm/lọc theo biệt thự và khoảng ngày
- Xuất danh sách ra file Excel (.xls)

## Điều hướng

- Truy cập từ menu chính (Upcoming Departures)
- Không có điều hướng chi tiết riêng (là danh sách tổng hợp)
