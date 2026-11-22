# BOOK-105 — Theo dõi điều chỉnh (Adjustment Follow-up)

**Loại:** Trang đầy đủ (mở từ BOOK-103)

**Route:** Booking/followUpAction/:id (id được base64_encode)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Xem lại một bản ghi hành động (Villa Action) đã tạo từ BOOK-104: các thông số bộ lọc gốc (chỉ đọc), so sánh số liệu tỷ lệ lấp đầy ban đầu với số liệu hiện tại (current_*), và danh sách villa kèm ghi chú hành động đã nhập.

## Mô tả chi tiết

**Thông tin bộ lọc gốc (chỉ đọc):**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | business_unit | Text (readonly) | — | Lấy theo `business_unit_id` đã lưu |
| 2 | Khoảng ngày | date_range | Text (readonly) | — | `start_date`–`end_date` định dạng d-m-Y |
| 3 | Loại villa | property_type | Text (readonly) | — | Lấy theo `villa_type` đã lưu |

**Bảng so sánh số liệu (tại thời điểm tạo / hiện tại):**

| # | Chỉ số | Field code | Ghi chú |
|---|---|---|---|
| 1 | Số ngày | number_of_days | |
| 2 | Số lượng villa | number_of_properties | |
| 3 | Tỷ lệ lấp đầy | occupancy_percent / current_occupancy_percent | Hiển thị dạng "X% / Y%" |
| 4 | Villa dưới ngưỡng thấp | property_low_occupancy / current_property_low_occupancy | |
| 5 | Villa trên ngưỡng cao | property_high_occupancy / current_property_high_occupancy | |
| 6 | Biểu đồ tỷ lệ lấp đầy theo ngày | chart_data | Google Charts line chart |

Kèm danh sách villa và ghi chú hành động (`data`) đã lưu khi tạo bản ghi.

## Chức năng/nút thao tác

- Chỉ xem/theo dõi; không có nút chỉnh sửa trực tiếp trên màn hình này (dữ liệu là snapshot tại thời điểm tạo, đối chiếu với số liệu hiện tại để đánh giá hiệu quả hành động).

## Điều hướng

- Mở từ BOOK-103 (icon "Follow up" trên từng dòng danh sách).
- Không điều hướng tiếp; dùng breadcrumb/back để quay lại BOOK-103.
