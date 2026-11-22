# CS-002-P1 — Form ngôn ngữ (Language Form)

**Loại:** Popup (mở từ CS-002)

**Route:** Modal Bootstrap (`#exampleModal`) trong `languages.ctp`; submit cùng action `CommonSettingController::languages()`; kiểm tra trùng tên qua AJAX `checkLanguage()` — `/common-setting/check-language`; lấy dữ liệu để sửa qua AJAX `getLanguageById()` — `/common-setting/get-language-by-id`.

**Module:** CS = Dữ liệu tham chiếu

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới/Sửa/Xóa một ngôn ngữ và danh sách quốc gia áp dụng ngôn ngữ đó.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên ngôn ngữ | `name` | Text | Có | Validate remote `checkLanguage` — báo lỗi nếu trùng tên |
| 2 | Quốc gia áp dụng | `country_code` | Select2 multiple (danh sách Country) | Có | Lưu dạng mảng serialize; `language_code` được hệ thống tự sinh từ `name`, không hiển thị cho người dùng |
| 3 | Hành động (ẩn) | `action` | Hidden (`add`/`edit`/`delete`) | — | |
| 4 | ID (ẩn) | `id` | Hidden | — | Chỉ có khi sửa/xóa |

Ở chế độ **Xóa**: ẩn toàn bộ phần nhập liệu, chỉ hiện xác nhận.

## Chức năng/nút thao tác
- **Save/Update/Delete:** submit `popup_form`, lưu/xóa bản ghi `Language`.
- **Cancel:** đóng modal.

## Điều hướng
- Mở từ: CS-002 (Thiết lập ngôn ngữ).
- Sau khi submit: redirect quay lại CS-002 kèm flash message.
