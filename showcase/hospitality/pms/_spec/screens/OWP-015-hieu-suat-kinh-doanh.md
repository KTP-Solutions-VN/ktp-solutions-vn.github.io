# OWP-015 — Hiệu suất kinh doanh biệt thự (Performance)

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::performance()` — không có route đẹp riêng (mặc định `/external-user/performance`)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Trang phân tích hiệu suất kinh doanh của biệt thự: dự báo (outlook) doanh thu tháng hiện tại/tháng tới/cả năm, doanh thu cho thuê theo từng tháng qua các năm, tỷ lệ lấp đầy (occupancy) theo tháng, và các chỉ số tài chính (ROI, giá trị tài chính).

## Mô tả chi tiết

Bộ lọc:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Biệt thự | villa_id | Select2 | Có | Danh sách biệt thự đang mở |

Khối "Outlook" (dự báo):

| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Số đêm đã đặt | nights_booked | Theo tháng hiện tại / tháng tới / cả năm tới hiện tại |
| 2 | Tỷ lệ lấp đầy | occupancy | |
| 3 | Doanh thu | revenue | |
| 4 | Chủ sở hữu thực nhận | net_owner | |

Bảng "Doanh thu cho thuê" (Rental Revenue) và "Tỷ lệ lấp đầy" (Occupancy) — cột theo 12 tháng (Jan-Dec) + Năm + Trung bình + Tăng trưởng, so sánh 3 năm (năm hiện tại, năm trước, 2 năm trước).

Khối "Chỉ số tài chính" (Financial Ratios): Tỷ suất hoàn vốn đầu tư (ROI), Giá trị tài chính.

## Chức năng/nút thao tác

- Tìm kiếm/xem hiệu suất theo biệt thự (nút "Search")
- Xem biểu đồ/bảng so sánh qua các năm

## Điều hướng

- Truy cập từ menu chính (Performance)
- Không điều hướng sang màn hình khác
