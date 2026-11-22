# BOOK-076 — Điều khoản thuê tháng (Monthly Rent Terms)

**Loại:** Trang đầy đủ (trang con, điều hướng từ BOOK-067 — không phải popup/modal)
**Route:** Booking/rentalMonthView/:business_unit_id/:villa_id
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định, ví dụ `/booking/rental-month-view/1/2`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Trang xem chi tiết hợp đồng thuê tháng (Monthly) đang áp dụng cho villa: thông tin tổng quan hợp đồng và lịch sử thanh toán tiền thuê theo từng tháng.

## Mô tả chi tiết

### Thông tin tổng quan (dạng đoạn văn tổng hợp, không phải form)
Hiển thị 1 đoạn mô tả gồm: tên villa, ngày bắt đầu thuê tháng (`starting_date`), ngày kết thúc (nếu đã chuyển về Daily thì lấy theo `created_at` của bản ghi Daily kế tiếp, ngược lại hiển thị "-----"), tình trạng đặt cọc (đã đặt cọc số tiền bao nhiêu hoặc chưa đặt cọc), giá thuê tháng (`monthly_rent`), ngày đến hạn thanh toán tiếp theo, và ngày dự kiến kết thúc hợp đồng (`expected_termination_date`).

### Bảng lịch sử thanh toán
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Rental Month | Tháng thuê (`rental_month`) |
| 2 | Paid On | Ngày đã thanh toán (`payment_date`); nếu chưa thanh toán hiển thị "Due on: `<next_due_date>`" |

## Chức năng/nút thao tác
Không có nút thao tác chỉnh sửa — đây là trang chỉ xem (read-only), chỉ hiển thị thông tin hợp đồng và lịch sử thanh toán.

## Điều hướng
- Mở từ: BOOK-067 (link "Monthly" trên cột Status trong bảng lịch sử trạng thái giá của villa)
- Điều hướng tới: không có
