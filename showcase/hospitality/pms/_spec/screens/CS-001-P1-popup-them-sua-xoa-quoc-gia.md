# CS-001-P1 — Popup Thêm/Sửa/Xóa Quốc gia

**Loại:** Popup (mở từ CS-001)

**Route:** Modal Bootstrap (`#exampleModal`) tĩnh trong `countries.ctp`; submit POST cùng action `CommonSettingController::countries()`; kiểm tra trùng tên qua AJAX `checkCountry()` — `/common-setting/check-country`.

**Module:** CS = Danh mục dùng chung

## Mô tả ngắn gọn
Một popup dùng chung cho 3 thao tác: Thêm mới, Sửa, Xóa quốc gia — nội dung/tiêu đề/nút bấm được đổi động bằng JS tùy thao tác.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên quốc gia | `name` | Text | Có | Validate remote `checkCountry` — báo lỗi nếu trùng tên (loại trừ chính bản ghi đang sửa) |
| 2 | Hành động (ẩn) | `action` | Hidden (`add`/`edit`/`delete`) | — | JS set giá trị tùy nút bấm |
| 3 | ID (ẩn) | `id` | Hidden | — | Chỉ có khi sửa/xóa |

Ở chế độ **Xóa**: phần `modal-body` (ô nhập tên) bị ẩn, chỉ còn tiêu đề "Delete Country: {tên}" và nút xác nhận.

## Chức năng/nút thao tác
- **Save/Update/Delete** (cùng 1 nút, đổi nhãn theo action): submit form `popup_form` bằng AJAX-post thường (postback trang), lưu/xóa bản ghi `Country`.
- **Cancel:** đóng modal, không lưu.

## Điều hướng
- Mở từ: CS-001 (danh sách Quốc gia) — nút "Add new", icon Sửa, icon Xóa trên từng dòng.
- Sau khi submit: redirect quay lại CS-001 (dùng `referer()`), hiển thị flash message thành công/lỗi.
