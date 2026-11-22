# MNT-013-P1 — Thêm loại nâng cấp (New Refurbishment Type)

**Loại:** Popup (mở từ MNT-013)
**Route:** maintenance/addRenovationService
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Trang thêm mới một dịch vụ cải tạo: tên, ảnh minh họa (crop 1:1), đơn vị kinh doanh áp dụng, trạng thái.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên dịch vụ | `name` | Text | Có | |
| 2 | Ảnh (icon) | `image` / `cropped_image` | Upload ảnh, crop 1:1, tối đa 1MB | Có | |
| 3 | Đơn vị kinh doanh | `business_units[]` | Checkbox nhiều lựa chọn | Có | |
| 4 | Trạng thái | `status` | Select (Active/Non-active) | Có | |

## Chức năng/nút thao tác
- **Save**: lưu `GardenService` (`type = renovation`), ghi log hoạt động, chuyển về MNT-013.
- **Cancel**: quay về MNT-013.

## Điều hướng
- Vào từ: nút "Add New" trên MNT-013 — Loại hạng mục nâng cấp.
- Đi tới: sau khi Save, quay về MNT-013.
