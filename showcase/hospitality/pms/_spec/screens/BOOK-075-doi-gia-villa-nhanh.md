# BOOK-075 — Đổi giá thuê villa (Monthly/Daily)

**Loại:** Trang đầy đủ (trang con, điều hướng từ BOOK-067 — không phải popup/modal)
**Route:** Booking/changeVillaRates/:business_unit_id/:villa_id/:action (action = `monthly` hoặc `daily`)
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định, ví dụ `/booking/change-villa-rates/1/2/monthly`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Form chuyển đổi nhanh hình thức tính giá thuê của villa giữa giá thuê ngày (Daily) và giá thuê tháng (Monthly), khởi tạo bản ghi trạng thái giá (`VillaRateStatus`) mới tương ứng.

Điều kiện truy cập: cả 3 tham số `business_unit_id`, `villa_id`, `action` phải có trên URL, nếu không hệ thống báo lỗi và chuyển hướng về BOOK-067.

## Mô tả chi tiết

### Khi `action = monthly` (chuyển sang giá thuê tháng)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngày bắt đầu | `starting_date` | Date picker | Có | |
| 2 | Giá thuê tháng | `monthly_rent` | Text/Number | Có | |
| 3 | Tiền đặt cọc | `deposit` | Text/Number | Có | |
| 4 | Ngày đến hạn thu tiền thuê tháng | `rent_due_date` | Select (Month End / Day of the month) | Có | Nếu chọn "Day of the month" sẽ hiện thêm field chọn ngày cụ thể |
| 5 | Ngày cụ thể trong tháng | `day_of_the_month` | Select (1–31) | Có nếu `rent_due_date` = day_of_month | Ẩn mặc định, chỉ hiện khi cần |
| 6 | Ngày dự kiến kết thúc hợp đồng | `expected_termination_date` | Date picker | Có | |

### Khi `action = daily` (chuyển về giá thuê ngày)
Không có field nhập liệu, chỉ hiển thị dòng xác nhận: "`<Tên villa>` goes back to daily rate. There is no outstanding monthly Rent due."

## Chức năng/nút thao tác
- **Confirm** — lưu bản ghi `VillaRateStatus` mới với type tương ứng (Monthly/Daily), tạo `VillaRatesStatusPayment` (tính `next_due_date`) và `VillaRatesStatusLog` ghi nhận việc chuyển đổi, sau đó chuyển hướng về BOOK-067

## Điều hướng
- Mở từ: BOOK-067 (nút "Change to Monthly"/"Change to Daily" trong bảng lịch sử trạng thái giá của villa)
- Điều hướng tới: quay lại BOOK-067 sau khi lưu thành công
