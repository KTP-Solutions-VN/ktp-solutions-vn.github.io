# OWN-005 — Lịch công suất của chủ nhà (Owner Occupancy Calendar)

**Loại:** Trang đầy đủ

**Route:** `/Owner/calendar` (controller `Owner`, action `calendar()`)

**Module:** Quan hệ chủ nhà (Admin)

## Mô tả ngắn gọn

Màn hình lịch (calendar view) hiển thị tình trạng đặt phòng của các villa theo Business Unit và khoảng thời gian được chọn, phục vụ việc theo dõi booking dưới góc nhìn quản lý chủ sở hữu. Cho phép tải về (download) dữ liệu booking theo bộ lọc.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Khoảng ngày | `date_range` | Date range picker | Không | |
| 2 | Business Unit | `business_unit` | Select2 | Không | Mặc định "All" |
| 3 | Villa | `villa` | Select2 | Không | Villa thuộc business unit đã chọn |

Dữ liệu lịch (booking) được tải qua AJAX (`getVillaBookingDetail`) và hiển thị dạng khung lịch tháng (`#calendar-html`), không phải bảng liệt kê cột cố định.

## Chức năng/nút thao tác

- **Search**: tải lại dữ liệu lịch theo bộ lọc đã chọn.
- **Download** (nút Download): tải về dữ liệu booking đã lọc (action `getVillaBookingDownload`).

## Điều hướng

- Vào từ: menu chính (sidebar) mục "Owner Occupancy Calendar".
- Không có popup con; đây là màn hình độc lập.
