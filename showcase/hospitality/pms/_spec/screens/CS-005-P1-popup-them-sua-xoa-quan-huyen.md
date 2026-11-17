# CS-005-P1 — Popup Thêm/Sửa/Xóa Quận/Huyện

**Loại:** Popup (mở từ CS-005)

**Route:** Modal Bootstrap (`#exampleModal`) trong `districts.ctp`; submit cùng action `CommonSettingController::districts()`; kiểm tra trùng tên qua AJAX `checkDistrict()` — `/common-setting/check-district`; nạp Vùng theo Quốc gia qua AJAX `getData()` — `/common-setting/get-data`.

**Module:** CS = Danh mục dùng chung

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới/Sửa/Xóa một Quận/Huyện.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Quốc gia | `country` | Select | Có | Đổi sẽ tải lại danh sách Vùng qua AJAX (`type=country-region`) |
| 2 | Vùng | `region` | Select (phụ thuộc Quốc gia) | Có | |
| 3 | Tên quận/huyện | `name` | Text | Có | Validate remote `checkDistrict` |
| 4 | Hành động (ẩn) | `action` | Hidden | — | |
| 5 | ID (ẩn) | `id` | Hidden | — | |

## Chức năng/nút thao tác
- **Save/Update/Delete:** submit `popup_form`.
- **Cancel:** đóng modal.

## Điều hướng
- Mở từ: CS-005 (danh sách Quận/Huyện).
- Sau khi submit: quay lại CS-005 kèm flash message.
