# MNT-010-P2 — Sửa loại dịch vụ hồ bơi (Edit Pool Service Type)

**Loại:** Popup (mở từ MNT-010)
**Route:** maintenance/editPoolService/:id
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Trang chỉnh sửa một dịch vụ hồ bơi đã có: tên, ảnh minh họa, đơn vị kinh doanh áp dụng, trạng thái.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên dịch vụ | `name` | Text | Có | |
| 2 | Ảnh (icon) | `image` / `cropped_image` | Upload ảnh, crop 1:1 | Không | Giữ ảnh cũ nếu không đổi |
| 3 | Đơn vị kinh doanh | `business_units[]` | Checkbox nhiều lựa chọn | Có | Đánh dấu sẵn theo `selected_business_unit` |
| 4 | Trạng thái | `status` | Select (Active/Non-active) | Có | |

## Chức năng/nút thao tác
- **Save**: cập nhật `GardenService`, ghi log hoạt động, chuyển về MNT-010.
- **Cancel**: quay về MNT-010.

## Điều hướng
- Vào từ: icon Sửa trên MNT-010 — Loại dịch vụ hồ bơi.
- Đi tới: sau khi Save, quay về MNT-010.
