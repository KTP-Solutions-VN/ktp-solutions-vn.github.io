# OWP-014 — Tạo báo cáo tài chính (Owner Statement)

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::generateReports()` — không có route đẹp riêng (mặc định `/external-user/generate-reports`)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Màn hình tạo báo cáo tài chính chi tiết (bảng kê thu chi) cho một biệt thự trong khoảng thời gian tuỳ chọn: doanh thu theo từng ngày, hoa hồng OTA, VAT, chi phí bảo trì, khoản chi khác, và số tiền thực nhận của chủ sở hữu. Có thể đồng bộ dữ liệu đặt phòng và tải báo cáo về máy.

## Mô tả chi tiết

Bộ lọc:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Biệt thự | villa_id | Select2 | Có | Danh sách biệt thự đang mở của chủ sở hữu |
| 2 | Khoảng thời gian | date_range | Date range picker | Có | |
| 3 | Loại báo cáo | type | Select/ẩn | Không | |

Bảng báo cáo — cột hiển thị (theo ngày):

| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Ngày | date | |
| 2 | Kênh đặt phòng | channel | |
| 3 | Khách hàng | customer | |
| 4 | Doanh thu gộp | gross / payout | |
| 5 | Hoa hồng OTA | ota_commission | |
| 6 | VAT | vat | Hiện khi có VAT theo kênh |
| 7 | Doanh thu ròng | daily_net / net | |
| 8 | Phí dịch vụ theo từng loại | services (%) | Nhiều cột động theo loại dịch vụ |
| 9 | Chủ sở hữu nhận | owner | |
| 10 | Khoản khác | other | |
| 11 | Tổng | total | |
| 12 | Ghi chú | comment | |

## Chức năng/nút thao tác

- Tìm kiếm/tạo báo cáo theo biệt thự và khoảng ngày (nút "Search")
- Đồng bộ đặt phòng (nút "Sync", gọi AJAX đồng bộ booking mới nhất)
- Tải báo cáo về máy (nút "Download Report")

## Điều hướng

- Truy cập từ menu chính (Generate Report)
- Không điều hướng sang màn hình khác (xử lý tại chỗ)
