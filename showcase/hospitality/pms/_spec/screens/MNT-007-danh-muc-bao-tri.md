# MNT-007 — Danh mục bảo trì (Categories)

**Loại:** Trang đầy đủ
**Route:** maintenance/categories
**Module:** MNT = Bảo trì

## Mô tả ngắn gọn
Màn hình quản lý danh mục bảo trì cũ (`MaintenanceCategory`): danh sách, thêm/sửa qua modal, xóa. Mỗi danh mục gắn với một mức ưu tiên mặc định. (Đây là màn hình quản trị danh mục kiểu cũ, trước khi có ma trận danh mục/hạng mục ở MNT-013.)

## Mô tả chi tiết

### Danh sách
| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tên danh mục | `name` | |
| 3 | Mức ưu tiên | `maintenance_priority_id` → tên | |
| 4 | Ngày tạo | `created` | |
| 5 | Hành động | — | Sửa, Xóa |

### Form thêm/sửa (modal)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên danh mục | `name` | Text | Có | Kiểm tra trùng qua ajax `checkMaintenanceCategory` |
| 2 | Mức ưu tiên | `maintenance_priority_id` | Select (danh sách `MaintenancePriority`) | Có | |
| 3 | ID (khi sửa) | `id` | Hidden | — | |
| 4 | Action | `action` | Hidden (`add`/`edit`) | — | Điều hướng logic lưu ở controller |

## Chức năng/nút thao tác
- **Add New** (modal): thêm danh mục mới, `slug` tự sinh từ tên.
- **Sửa** (modal): cập nhật tên/mức ưu tiên.
- **Xóa**: xóa danh mục (`action=delete`, chỉ gửi `id`).

## Điều hướng
- Vào từ: menu Settings/Maintenance trong sidebar.
- Đi tới: không điều hướng trang khác (thao tác tại chỗ qua modal, reload lại danh sách).
