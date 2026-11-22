# MNT-009-P2 — Sửa loại dịch vụ vườn (Edit Garden Service Type)

**Loại:** Popup (mở từ MNT-009)
**Route:** maintenance/editGardenService/:id
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Trang chỉnh sửa một dịch vụ vườn đã có: tên, ảnh minh họa, đơn vị kinh doanh áp dụng, trạng thái.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên dịch vụ | `name` | Text | Có | Giá trị hiện tại |
| 2 | Ảnh (icon) | `image` / `cropped_image` | Upload ảnh, crop 1:1 | Không | Giữ ảnh cũ nếu không đổi |
| 3 | Đơn vị kinh doanh | `business_units[]` | Checkbox nhiều lựa chọn | Có | Đánh dấu sẵn theo `selected_business_unit` |
| 4 | Trạng thái | `status` | Select (Active/Non-active) | Có | |

## Chức năng/nút thao tác
- **Save**: cập nhật `GardenService`, ghi log hoạt động, chuyển về MNT-009.
- **Cancel**: quay về MNT-009.

## Điều hướng
- Vào từ: icon Sửa trên MNT-009 — Loại dịch vụ vườn.
- Đi tới: sau khi Save, quay về MNT-009.
