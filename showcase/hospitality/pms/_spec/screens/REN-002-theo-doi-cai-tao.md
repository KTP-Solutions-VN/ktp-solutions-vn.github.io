# REN-002 — Theo dõi cải tạo

**Loại:** Trang đầy đủ
**Route:** renovation/followUp + route đẹp dạng dashed: renovation/follow-up
**Module:** REN = Cải tạo

## Mô tả ngắn gọn
Màn hình danh sách tổng quan các dự án cải tạo (renovation project), lọc theo đơn vị kinh doanh và villa, cho phép đánh dấu ngày bắt đầu/hoàn thành thực tế của dự án, xóa dự án và điều hướng tới các màn hình liên quan (theo dõi chi tiết dự án, tạo dự án mới, sửa dự án).

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Set cookie `property_business_unit_id` |
| 2 | Villa | `villa_id` | Select2 (theo BU) | |

### Cột hiển thị
| # | Cột | Field code nguồn | Ghi chú |
|---|---|---|---|
| 1 | Property (villa) | `villa.name` | |
| 2 | Title | `title` | Tên dự án |
| 3 | Start | `actual_start_date` / `start_date` (dự kiến) | Hiển thị "Will start on..."/"Started since..." |
| 4 | Status | `status` (Not Started / Under Progress / Completed) | |
| 5 | Actions | — | Theo dõi dự án, Sửa, Xóa |

## Chức năng/nút thao tác
- **+ Tạo dự án mới**: điều hướng tới REN-001 — Tạo dự án cải tạo mới.
- **Theo dõi dự án (icon xem)**: mở REN-003 — Theo dõi dự án cải tạo (`projectFollowUp`).
- **Sửa (icon bút)**: mở REN-004 — Sửa dự án cải tạo (`edit`).
- **Xóa (icon thùng rác)**: xóa `Renovation` cùng toàn bộ `RenovationItem`, `RenovationReceipt`, `RenovationPhoto`, `RenovationPayment` liên quan.
- **Đánh dấu ngày bắt đầu/hoàn thành thực tế**: form ẩn `date_type` (start/close) submit ngày chọn, cập nhật `actual_start_date`/`actual_end_date` và `status` tương ứng (Under Progress/Completed).

## Điều hướng
- Vào từ: menu "Renovation" trong sidebar.
- Đi tới: REN-001 (tạo mới), REN-003 (theo dõi dự án), REN-004 (sửa dự án).
