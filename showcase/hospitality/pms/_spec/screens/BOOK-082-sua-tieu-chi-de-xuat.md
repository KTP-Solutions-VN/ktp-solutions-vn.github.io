# BOOK-082 — Sửa ngưỡng công suất (Edit Occupancy Threshold)

**Loại:** Popup (mở từ BOOK-080)
**Route:** Booking/editCriteria/:id
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Form sửa một bộ tiêu chí đã tồn tại, cấu trúc field giống hệt BOOK-081 nhưng được nạp sẵn giá trị hiện tại của tiêu chí (`$id` truyền vào dạng mã hoá base64).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên tiêu chí | `name` | Text | Có | Nạp sẵn giá trị `data_array['name']` |
| 2 | Last Minute — Số ngày | `criteria_data[0][days]` | Number | Có | |
| 3 | Last Minute — Ngưỡng dưới | `criteria_data[0][under]` | Number | Có | |
| 4 | Last Minute — Ngưỡng trên | `criteria_data[0][over]` | Number | Có | |
| 5 | Regular — Khoảng ngày | `criteria_data[1][days]` (tự động) | Hiển thị tính toán | - | |
| 6 | Regular — Ngưỡng dưới | `criteria_data[1][under]` | Number | Có | |
| 7 | Regular — Ngưỡng trên | `criteria_data[1][over]` | Number | Có | |
| 8 | Early Bird — Số ngày | `criteria_data[2][days]` | Number | Có | |
| 9 | Early Bird — Ngưỡng dưới | `criteria_data[2][under]` | Number | Có | |
| 10 | Early Bird — Ngưỡng trên | `criteria_data[2][over]` | Number | Có | |
| 11 | Up To | `up_to` | Number | Có | |
| 12 | Không tính villa có ghi chú mới hơn (X ngày) | `number_of_days` | Number | Có | |

Toàn bộ dữ liệu tiêu chí (`criteria_data`) được unserialize từ bản ghi `Recommendation` để hiển thị lại trên form.

## Chức năng/nút thao tác
- Nút **Save** (submit) — cập nhật `Recommendation` theo `id`, ghi log hoạt động, thông báo thành công và quay về BOOK-080
- Nút **Cancel** (reset) — huỷ thay đổi đang nhập
- Nếu `id` không hợp lệ hoặc không tìm thấy dữ liệu — hiện thông báo lỗi và redirect về BOOK-080

## Điều hướng
- Mở từ: BOOK-080 (Ngưỡng công suất) — icon Sửa trên từng dòng
- Điều hướng tới: quay lại BOOK-080 sau khi lưu
