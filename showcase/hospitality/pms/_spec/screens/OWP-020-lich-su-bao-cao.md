# OWP-020 — Lịch sử báo cáo

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::ReportHistory($villa_id)` — không có route đẹp riêng (mặc định `/external-user/report-history/{villa_id_base64}`)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Danh sách lịch sử các báo cáo thanh toán hàng tháng (Monthly Report) đã được gửi cho Chủ sở hữu, có thể lọc theo biệt thự và khoảng thời gian, tải file báo cáo (PDF/Excel).

## Mô tả chi tiết

Bộ lọc:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Biệt thự | villa_id | Select2 | Có | |
| 2 | Khoảng thời gian | date_range | Date range picker | Không | |

Danh sách — cột hiển thị:

| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Tên báo cáo | name | |
| 2 | Ngày bắt đầu | start_date | |
| 3 | Ngày kết thúc | end_date | |
| 4 | Ngày gửi | sent_on | Chỉ hiện nếu báo cáo đã được gửi (sent = True) |
| 5 | Thao tác | — | Icon tải xuống (link trực tiếp tới file báo cáo) |

## Chức năng/nút thao tác

- Lọc theo biệt thự và khoảng thời gian (nút "Search")
- Tải xuống file báo cáo (icon download)

## Điều hướng

- Truy cập từ OWP-005 (icon xem lịch sử báo cáo trên biệt thự) hoặc menu chính
- Không có điều hướng tiếp — chỉ tải file
