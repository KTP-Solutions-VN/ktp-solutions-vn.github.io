# OPR-020 — Báo cáo sửa chữa hiện trường (Field Repair Reports)

**Loại:** Trang đầy đủ
**Route:** operator/maintenance + route đẹp dạng dashed: operator/maintenance
**Module:** OPR = Công việc bảo dưỡng

## Mô tả ngắn gọn
Màn hình danh sách các phiếu bảo trì (maintenance ticket) đã phát hành (`status = publish`), lọc theo đơn vị kinh doanh, có badge số lượng phiếu theo từng BU, phân trang, xem nhanh chi tiết qua modal và điều hướng sang tạo/sửa phiếu.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `bu_id` | Tab/badge số lượng theo BU | Lọc `MaintenanceTicket.business_unit_id`; tổng số phiếu hiển thị ở `totalCount` |

### Cột hiển thị
| # | Cột | Field code nguồn | Ghi chú |
|---|---|---|---|
| 1 | Ticket | `ticket_number` | Mã phiếu (định dạng `M000001`) |
| 2 | BU | `business_unit.name` | |
| 3 | Villa | `villas.name` | |
| 4 | Issue | `maintenance_subcategories`/`maintenance_problem_option` | Vấn đề/sự cố |
| 5 | Priority | `final_priority_id` (qua `MaintenancePriorities`) | Có màu theo mức ưu tiên |
| 6 | Status | `status` | |
| 7 | Updated | `modified` | |
| 8 | Actions | — | Xem nhanh (modal), Sửa/Quản lý |

## Chức năng/nút thao tác
- **+ New Ticket**: điều hướng tới OPR-021 — Báo sửa chữa hiện trường.
- **Xem nhanh (modal MaintenanceView)**: hiển thị chi tiết phiếu (mô tả, tried/checked...) ngay trên trang, không rời trang.
- **Sửa/Quản lý (icon bút)**: điều hướng `window.location.href = editMaintenanceTicket/btoa(ticketId)` — mở OPR-022.
- **Lọc theo BU**: đổi tab/khu vực để lọc danh sách và cập nhật lại phân trang (ajax, `disableAutoLayout` khi request ajax).

## Điều hướng
- Vào từ: menu "Field Repair Reports" trong sidebar.
- Đi tới: OPR-021 — Báo sửa chữa hiện trường; OPR-022 — Quản lý sửa chữa hiện trường.
