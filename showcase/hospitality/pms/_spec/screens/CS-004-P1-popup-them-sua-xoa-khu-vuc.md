# CS-004-P1 — Popup Thêm/Sửa/Xóa Khu vực

**Loại:** Popup (mở từ CS-004)

**Route:** Modal Bootstrap (`#exampleModal`) trong `areas.ctp`; submit cùng action `CommonSettingController::areas()`; kiểm tra trùng tên qua AJAX `checkArea()` — `/common-setting/check-area`; nạp Region/District theo lựa chọn cha qua AJAX `getData()` — `/common-setting/get-data`.

**Module:** CS = Danh mục dùng chung

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới/Sửa/Xóa một Khu vực (Area), với 3 dropdown chọn cha theo cấp bậc (Quốc gia → Vùng → Quận/Huyện) load cascade bằng AJAX.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Quốc gia | `country` | Select | Có | Thay đổi sẽ tải lại danh sách Vùng qua AJAX `get-data` (`type=country-region`) |
| 2 | Vùng | `region` | Select (phụ thuộc Quốc gia) | Có | Thay đổi sẽ tải lại danh sách Quận/Huyện (`type=region-district`) |
| 3 | Quận/Huyện | `district` | Select (phụ thuộc Vùng) | Có | |
| 4 | Tên khu vực | `name` | Text | Có | Validate remote `checkArea`; hệ thống tự sinh thêm `slug` từ tên khi lưu |
| 5 | Hành động (ẩn) | `action` | Hidden | — | |
| 6 | ID (ẩn) | `id` | Hidden | — | |

## Chức năng/nút thao tác
- **Save/Update/Delete:** submit `popup_form`.
- **Cancel:** đóng modal.

## Điều hướng
- Mở từ: CS-004 (danh sách Khu vực).
- Sau khi submit: quay lại CS-004 kèm flash message.
