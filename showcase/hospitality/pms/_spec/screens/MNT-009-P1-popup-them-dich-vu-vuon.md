# MNT-009-P1 — Thêm loại dịch vụ vườn (New Garden Service Type)

**Loại:** Popup (mở từ MNT-009)
**Route:** maintenance/addGardenService
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Trang thêm mới một dịch vụ vườn: tên, ảnh minh họa (crop tỉ lệ 1:1), đơn vị kinh doanh áp dụng, trạng thái.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên dịch vụ | `name` | Text | Có | |
| 2 | Ảnh (icon) | `image` / `cropped_image` | Upload ảnh, crop 1:1, tối đa 1MB | Có | Nếu chọn crop thì lưu base64 vào `cropped_image`, ngược lại upload file thường |
| 3 | Đơn vị kinh doanh | `business_units[]` | Checkbox nhiều lựa chọn | Có | Lưu dạng JSON vào `business_unit_ids` |
| 4 | Trạng thái | `status` | Select (Active/Non-active) | Có | |

## Chức năng/nút thao tác
- **Save**: lưu `GardenService` (`type = garden`), ghi log hoạt động, chuyển về MNT-009.
- **Cancel**: quay về MNT-009.

## Điều hướng
- Vào từ: nút "Add New" trên MNT-009 — Loại dịch vụ vườn.
- Đi tới: sau khi Save, quay về MNT-009.
