# MNT-013 — Loại hạng mục nâng cấp (Refurbishment Types)

**Loại:** Trang đầy đủ
**Route:** maintenance/renovationServices
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Màn hình danh sách danh mục dịch vụ cải tạo (`GardenService.type = renovation`), dùng làm hạng mục tham chiếu khi lập dự án cải tạo (module REN). Mỗi dịch vụ có tên, ảnh minh họa, đơn vị kinh doanh áp dụng, trạng thái.

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
- **Add New**: mở MNT-013-P1 — Thêm loại nâng cấp.
- **Sửa** (icon): mở MNT-013-P2 — Sửa loại nâng cấp.
- **Xóa**: xóa `GardenService` tương ứng (`deleteRenovationService`).

## Điều hướng
- Vào từ: menu cài đặt Repair Desk trong sidebar.
- Đi tới: MNT-013-P1 (Thêm), MNT-013-P2 (Sửa).
