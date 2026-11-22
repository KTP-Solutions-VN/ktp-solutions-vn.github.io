# MNT-010-P1 — Thêm loại dịch vụ hồ bơi (New Pool Service Type)

**Loại:** Popup (mở từ MNT-010)
**Route:** maintenance/addPoolServices
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Trang thêm mới một dịch vụ hồ bơi: tên, ảnh minh họa (crop 1:1), đơn vị kinh doanh áp dụng, trạng thái.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên dịch vụ | `name` | Text | Có | |
| 2 | Ảnh (icon) | `image` / `cropped_image` | Upload ảnh, crop 1:1, tối đa 1MB | Có | |
| 3 | Đơn vị kinh doanh | `business_units[]` | Checkbox nhiều lựa chọn | Có | Lưu JSON vào `business_unit_ids` |
| 4 | Trạng thái | `status` | Select (Active/Non-active) | Có | |

## Chức năng/nút thao tác
- **Save**: lưu `GardenService` (`type = pool-services`), ghi log hoạt động, chuyển về MNT-010.
- **Cancel**: quay về MNT-010.

## Điều hướng
- Vào từ: nút "Add New" trên MNT-010 — Loại dịch vụ hồ bơi.
- Đi tới: sau khi Save, quay về MNT-010.
