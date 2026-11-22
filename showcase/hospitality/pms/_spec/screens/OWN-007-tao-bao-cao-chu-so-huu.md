# OWN-007 — Trình tạo sao kê chủ nhà (Owner Statement Builder)

**Loại:** Trang đầy đủ

**Route:** `/Owner/generateReports` (controller `Owner`, action `generateReports()`)

**Module:** Quan hệ chủ nhà (Admin)

## Mô tả ngắn gọn

Màn hình tạo báo cáo doanh thu/thanh toán (payout report) cho chủ sở hữu villa theo villa và khoảng thời gian (kỳ báo cáo có sẵn hoặc tự chọn khoảng ngày), hiển thị bảng chi tiết từng booking (kênh, khách hàng, doanh thu gộp, hoa hồng OTA, doanh thu ròng, các khoản dịch vụ, payout, khoản khác, tổng cộng, ghi chú) kèm tổng và trung bình, có thể xuất Excel.

## Mô tả chi tiết

### Bộ lọc

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | Không | |
| 2 | Villa | `villa_id` | Select2 | Có | |
| 3 | Chủ sở hữu | `owner_id` | Select (readonly, tự động điền theo villa) | — | |
| 4 | Kỳ báo cáo (Period) | `period` | Select | Không | Có tuỳ chọn "Add new period" / "Remove period" |
| 5 | Khoảng ngày | `date_range` | Date range picker (có nút lùi/tiến 1 tháng) | Không | |
| 6 | Tổng tiền | `total_amount` | Số (readonly, có nút copy) | — | Tính sau khi generate |
| 7 | Trung bình | `average_amount` | Số (readonly, có nút copy) | — | Tính sau khi generate |

### Bảng báo cáo chi tiết (sau khi Generate)

| # | Tên cột | Field code | Loại dữ liệu | Ghi chú |
|---|---|---|---|---|
| 1 | Ngày | `date` | Date | |
| 2 | Kênh | `show_channel` | Text | |
| 3 | Khách hàng | `customer` | Text | |
| 4 | Doanh thu gộp | `gross` | Số | |
| 5 | Hoa hồng OTA | `ota_commission` | Số | |
| 6 | GST (%) | `vat` | Số | Chỉ hiển thị nếu áp dụng GST theo % |
| 7 | Doanh thu ròng | `net` | Số | |
| 8 | Doanh thu ròng theo ngày | `daily_net` | Số | |
| 9 | Các dịch vụ (động) | `services_array` | Số/% | Cột phát sinh theo danh mục dịch vụ villa |
| 10 | Payout | `owner` | Số (có thể chỉnh sửa inline) | |
| 11 | Khoản khác | `other` | Số (có thể chỉnh sửa inline) | |
| 12 | Tổng cộng | `total` | Số | |
| 13 | Ghi chú | `comment` | Text (có thể chỉnh sửa inline) | |

## Chức năng/nút thao tác

- **Generate**: tính toán và hiển thị bảng báo cáo theo bộ lọc.
- **Đồng bộ (Sync)**: đồng bộ booking mới nhất trước khi tạo báo cáo.
- **Export Excel**: xuất báo cáo hiện tại ra file Excel.
- **Copy** (icon copy cạnh Tổng tiền/Trung bình): copy giá trị vào clipboard.
- **Xoá kỳ báo cáo (Remove period)**: mở modal xác nhận xoá một kỳ báo cáo tuỳ chỉnh đã tạo trước đó.
- Chỉnh sửa trực tiếp (inline edit) các ô "Khoản khác" và "Ghi chú" trên từng dòng booking.

## Điều hướng

- Vào từ: menu chính (sidebar) mục "Owner Statement Builder"; cũng được liên kết từ trang Property (report_ready.ctp).
- Không có popup con dạng trang riêng biệt; modal xoá kỳ báo cáo là modal thao tác nội bộ trên cùng trang.
