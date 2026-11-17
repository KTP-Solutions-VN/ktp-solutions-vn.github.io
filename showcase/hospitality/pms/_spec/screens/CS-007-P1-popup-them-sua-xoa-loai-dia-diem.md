# CS-007-P1 — Popup Thêm/Sửa/Xóa Loại địa điểm

**Loại:** Popup (mở từ CS-007)

**Route:** Modal Bootstrap (`#exampleModal`) trong `location_types.ctp`; submit cùng action `CommonSettingController::locationTypes()`; kiểm tra trùng tên qua AJAX `checkLocation()` — `/common-setting/check-location`.

**Module:** CS = Danh mục dùng chung

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới/Sửa/Xóa một Loại địa điểm villa.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên loại địa điểm | `name` | Text | Có | Validate remote `checkLocation` — báo lỗi nếu trùng tên |
| 2 | Hành động (ẩn) | `action` | Hidden | — | |
| 3 | ID (ẩn) | `id` | Hidden | — | |

## Chức năng/nút thao tác
- **Save/Update/Delete:** submit `popup_form`, lưu/xóa bản ghi `VillaLocationType`.
- **Cancel:** đóng modal.

## Điều hướng
- Mở từ: CS-007 (danh sách Loại địa điểm).
- Sau khi submit: quay lại CS-007 kèm flash message.
