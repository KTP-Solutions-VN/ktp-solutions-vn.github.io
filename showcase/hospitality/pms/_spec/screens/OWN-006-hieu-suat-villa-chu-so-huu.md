# OWN-006 — Hiệu quả tài sản (Property Performance)

**Loại:** Trang đầy đủ

**Route:** `/Owner/performance` (controller `Owner`, action `performance()`)

**Module:** Quan hệ chủ nhà (Admin)

## Mô tả ngắn gọn

Màn hình thống kê hiệu suất kinh doanh của villa theo chủ sở hữu: số đêm đã đặt (Nights Booked), doanh thu và các chỉ số Outlook (tháng hiện tại/tháng kế tiếp/đến cuối năm) so sánh với các năm trước, phục vụ việc đánh giá hiệu quả vận hành villa.

## Mô tả chi tiết

### Bộ lọc

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | Không | |
| 2 | Villa | `villa_id` | Select2 | Có (để xem kết quả) | |

### Bảng Outlook

| # | Tên cột | Field code | Loại dữ liệu | Ghi chú |
|---|---|---|---|---|
| 1 | Chỉ số | — | Text | "Nights Booked" và các chỉ số doanh thu khác |
| 2 | Tháng hiện tại | `out_look.current_month` | Số | |
| 3 | Tháng kế tiếp | `out_look.next_month` | Số | |
| 4 | Đến cuối năm | `out_look.till_year_end` (tương tự) | Số | |

Ngoài ra màn hình còn tổng hợp dữ liệu so sánh hiệu suất theo năm (năm hiện tại, năm trước, năm đầu tiên có dữ liệu) phục vụ biểu đồ/so sánh xu hướng.

## Chức năng/nút thao tác

- **Search**: tải lại số liệu hiệu suất theo villa/business unit đã chọn.

## Điều hướng

- Vào từ: menu chính (sidebar) mục "Property Performance".
- Không có popup con; đây là màn hình độc lập.
