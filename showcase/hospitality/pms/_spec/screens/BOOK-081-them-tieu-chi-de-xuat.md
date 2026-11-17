# BOOK-081 — Thêm tiêu chí đề xuất villa (Add Criteria)

**Loại:** Popup (mở từ BOOK-080)
**Route:** Booking/addCriteria
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php
**Module:** Đặt phòng

## Mô tả ngắn gọn
Form thêm mới một bộ tiêu chí đánh giá tỷ lệ lấp đầy villa theo 3 mốc thời gian cố định: Last Minute (cận ngày), Regular (khoảng giữa), Early Bird (đặt sớm), mỗi mốc có ngưỡng "dưới"/"trên" để tô màu đỏ/xanh khi kiểm tra.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên tiêu chí | `name` | Text | Có | Tên bộ tiêu chí |
| 2 | Last Minute — Số ngày | `criteria_data[0][days]` | Number | Có | Số ngày tính từ hiện tại trở về trước (mốc "Less than") |
| 3 | Last Minute — Ngưỡng dưới | `criteria_data[0][under]` | Number | Có | % lấp đầy dưới ngưỡng này → tô đỏ |
| 4 | Last Minute — Ngưỡng trên | `criteria_data[0][over]` | Number | Có | % lấp đầy trên ngưỡng này → tô xanh |
| 5 | Regular — Khoảng ngày | `criteria_data[1][days]` (tự động) | Hiển thị tính toán | - | Tự ghép "Last Minute days — Early Bird days" khi lưu, hiển thị trực tiếp trên UI (không nhập tay) |
| 6 | Regular — Ngưỡng dưới | `criteria_data[1][under]` | Number | Có | |
| 7 | Regular — Ngưỡng trên | `criteria_data[1][over]` | Number | Có | |
| 8 | Early Bird — Số ngày | `criteria_data[2][days]` | Number | Có | Mốc "More than" |
| 9 | Early Bird — Ngưỡng dưới | `criteria_data[2][under]` | Number | Có | |
| 10 | Early Bird — Ngưỡng trên | `criteria_data[2][over]` | Number | Có | |
| 11 | Up To (giới hạn trên Early Bird) | `up_to` | Number | Có | Số ngày tối đa tính từ mốc Early Bird trở đi |
| 12 | Không tính villa có ghi chú mới hơn (X ngày) | `number_of_days` | Number | Có | Loại trừ villa đã được ghi log gần đây trong X ngày khi kiểm tra |

Ba dòng Last Minute/Regular/Early Bird có các cột "Horizon" (tên mốc) và "Time" (Less than/Between/More than) là giá trị cố định (hidden input), người dùng chỉ nhập số ngày và ngưỡng.

## Chức năng/nút thao tác
- Nút **Save** (submit) — lưu `Recommendation` mới (dữ liệu `criteria_data` được serialize), ghi log hoạt động, hiện thông báo thành công và quay về BOOK-080
- Nút **Cancel** (reset) — xoá dữ liệu đang nhập

## Điều hướng
- Mở từ: BOOK-080 (Tiêu chí đề xuất villa) — nút "Add new"
- Điều hướng tới: quay lại BOOK-080 sau khi lưu
