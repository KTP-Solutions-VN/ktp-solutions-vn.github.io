# MNT-015-P1 — Thêm loại dịch vụ hành chính (New Admin Service Type)

**Loại:** Popup (mở từ MNT-015)
**Route:** maintenance/addBackOfficeService
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Trang thêm mới một dịch vụ back-office: tên, ảnh minh họa (crop 1:1), trạng thái. Không cho chọn tay đơn vị kinh doanh — hệ thống tự áp dụng cho toàn bộ BU đang hoạt động.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên dịch vụ | `name` | Text | Có | |
| 2 | Ảnh (icon) | `image` / `cropped_image` | Upload ảnh, crop 1:1, tối đa 1MB | Có | |
| 3 | Trạng thái | `status` | Select (Active/Non-active) | Có | |

## Chức năng/nút thao tác
- **Save**: lưu `GardenService` (`type = back-office`, `business_unit_ids` = toàn bộ BU active), ghi log hoạt động, chuyển về MNT-015.
- **Cancel**: quay về MNT-015.

## Điều hướng
- Vào từ: nút "Add New" trên MNT-015 — Loại dịch vụ hành chính.
- Đi tới: sau khi Save, quay về MNT-015.
