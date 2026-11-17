# MNT-009 — Dịch vụ vườn (Garden Services)

**Loại:** Trang đầy đủ
**Route:** maintenance/gardenServices
**Module:** MNT = Bảo trì

## Mô tả ngắn gọn
Màn hình danh sách danh mục dịch vụ vườn (`GardenService.type = garden`) dùng cho phân loại công việc vườn (garden job). Mỗi dịch vụ có tên, ảnh minh họa, đơn vị kinh doanh áp dụng, trạng thái.

## Mô tả chi tiết

### Cột hiển thị
| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Đơn vị kinh doanh | `business_unit_ids` → tên | Danh sách BU áp dụng (json array) |
| 3 | Tên dịch vụ | `name` | |
| 4 | Icon | `image` | Ảnh minh họa |
| 5 | Trạng thái | `status` (active/inactive) | |
| 6 | Người tạo | `created_by` → `CreatedUser` | |
| 7 | Ngày tạo | `created_at` | |
| 8 | Hành động | — | Sửa, Xóa |

## Chức năng/nút thao tác
- **Add New**: mở MNT-009-P1 — Thêm dịch vụ vườn.
- **Sửa** (icon): mở MNT-009-P2 — Sửa dịch vụ vườn.
- **Xóa**: xóa `GardenService` tương ứng (`deleteGardenService`), reload danh sách.

## Điều hướng
- Vào từ: menu Settings/Maintenance trong sidebar.
- Đi tới: MNT-009-P1 (Thêm), MNT-009-P2 (Sửa).
