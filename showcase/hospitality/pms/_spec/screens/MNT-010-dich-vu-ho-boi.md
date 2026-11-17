# MNT-010 — Dịch vụ hồ bơi (Pool Services)

**Loại:** Trang đầy đủ
**Route:** maintenance/poolServices
**Module:** MNT = Bảo trì

## Mô tả ngắn gọn
Màn hình danh sách danh mục dịch vụ hồ bơi (`GardenService.type = pool-services`) dùng phân loại công việc hồ bơi (pool job). Mỗi dịch vụ có tên, ảnh minh họa, đơn vị kinh doanh áp dụng, trạng thái.

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
- **Add New**: mở MNT-010-P1 — Thêm dịch vụ hồ bơi.
- **Sửa** (icon): mở MNT-010-P2 — Sửa dịch vụ hồ bơi.
- **Xóa**: xóa `GardenService` tương ứng (`deletePoolService`).

## Điều hướng
- Vào từ: menu Settings/Maintenance trong sidebar.
- Đi tới: MNT-010-P1 (Thêm), MNT-010-P2 (Sửa).
