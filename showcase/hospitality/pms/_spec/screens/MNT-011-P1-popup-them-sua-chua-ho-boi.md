# MNT-011-P1 — Thêm loại sửa chữa hồ bơi (New Pool Repair Type)

**Loại:** Popup (mở từ MNT-011)
**Route:** maintenance/addPoolRepair
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Trang thêm mới một dịch vụ sửa chữa hồ bơi: tên, ảnh minh họa (crop 1:1), đơn vị kinh doanh áp dụng, trạng thái.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên dịch vụ | `name` | Text | Có | |
| 2 | Ảnh (icon) | `image` / `cropped_image` | Upload ảnh, crop 1:1, tối đa 1MB | Có | |
| 3 | Đơn vị kinh doanh | `business_units[]` | Checkbox nhiều lựa chọn | Có | |
| 4 | Trạng thái | `status` | Select (Active/Non-active) | Có | |

## Chức năng/nút thao tác
- **Save**: lưu `GardenService` (`type = pool-repair`), ghi log hoạt động, chuyển về MNT-011.
- **Cancel**: quay về MNT-011.

## Điều hướng
- Vào từ: nút "Add New" trên MNT-011 — Loại sửa chữa hồ bơi.
- Đi tới: sau khi Save, quay về MNT-011.
