# MNT-015 — Loại dịch vụ hành chính (Admin Service Types)

**Loại:** Trang đầy đủ
**Route:** maintenance/backOfficeServices
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Màn hình danh sách danh mục dịch vụ back-office (`GardenService.type = back-office`). Mỗi dịch vụ có tên, ảnh minh họa, trạng thái; áp dụng mặc định cho toàn bộ đơn vị kinh doanh khi tạo mới.

## Mô tả chi tiết

### Cột hiển thị
| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Đơn vị kinh doanh | `business_unit_ids` → tên | |
| 3 | Tên dịch vụ | `name` | |
| 4 | Icon | `image` | |
| 5 | Trạng thái | `status` | |
| 6 | Người tạo | `created_by` → `CreatedUser` | |
| 7 | Ngày tạo | `created_at` | |
| 8 | Hành động | — | Sửa, Xóa |

## Chức năng/nút thao tác
- **Add New**: mở MNT-015-P1 — Thêm dịch vụ back office.
- **Sửa** (icon): mở MNT-015-P2 — Sửa dịch vụ back office.
- **Xóa**: xóa `GardenService` tương ứng (`deleteBackOfficeService`).

## Điều hướng
- Vào từ: menu cài đặt Repair Desk trong sidebar.
- Đi tới: MNT-015-P1 (Thêm), MNT-015-P2 (Sửa).
