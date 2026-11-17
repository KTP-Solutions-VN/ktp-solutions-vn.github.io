# CS-003-P1 — Popup Thêm/Sửa/Xóa Vùng

**Loại:** Popup (mở từ CS-003)

**Route:** Modal Bootstrap (`#exampleModal`) trong `regions.ctp`; submit cùng action `CommonSettingController::regions()`; kiểm tra trùng tên qua AJAX `checkRegion()` — `/common-setting/check-region`.

**Module:** CS = Danh mục dùng chung

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới/Sửa/Xóa một Vùng trực thuộc Quốc gia.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Quốc gia | `country` | Select (danh sách Country) | Có | |
| 2 | Tên vùng | `name` | Text | Có | Validate remote `checkRegion` — kiểm tra trùng tên (theo toàn hệ thống, không giới hạn theo quốc gia) |
| 3 | Hành động (ẩn) | `action` | Hidden (`add`/`edit`/`delete`) | — | |
| 4 | ID (ẩn) | `id` | Hidden | — | Chỉ có khi sửa/xóa |

## Chức năng/nút thao tác
- **Save/Update/Delete:** submit `popup_form`.
- **Cancel:** đóng modal.

## Điều hướng
- Mở từ: CS-003 (danh sách Vùng).
- Sau khi submit: quay lại CS-003 kèm flash message.
