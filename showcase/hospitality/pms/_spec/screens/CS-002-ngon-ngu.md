# CS-002 — Thiết lập ngôn ngữ (Language Setup)

**Loại:** Trang đầy đủ

**Route:** `CommonSettingController::languages()` — mặc định `/common-setting/languages`

**Module:** CS = Dữ liệu tham chiếu

## Mô tả ngắn gọn
Danh sách quản lý danh mục Ngôn ngữ hệ thống, mỗi ngôn ngữ gắn với một danh sách các quốc gia áp dụng.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`, sắp xếp theo `name`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tên ngôn ngữ | `name` | |
| 3 | Quốc gia áp dụng | `country_code` | Giá trị lưu dạng PHP serialize array mã quốc gia; hiển thị danh sách tên quốc gia nối bằng dấu phẩy |
| 4 | Ngày tạo | `created_at` | Định dạng `d M Y H:i` |
| 5 | Hành động | — | Sửa, Xóa (mở popup CS-002-P1) |

## Chức năng/nút thao tác
- **Add new:** mở popup CS-002-P1 ở chế độ Thêm mới.
- **Sửa:** gọi AJAX `getLanguageById` để lấy `name` + `country_code` hiện tại rồi mở popup CS-002-P1 (chế độ Sửa).
- **Xóa:** mở lại popup CS-002-P1 ở chế độ xác nhận xóa (ẩn phần nhập liệu).
- Khi lưu, hệ thống tự sinh `language_code` từ tên ngôn ngữ (`CommonController::_getLanguageCode`), người dùng không nhập trực tiếp.

## Điều hướng
- Vào từ: menu Cấu hình > Dữ liệu tham chiếu > Thiết lập ngôn ngữ.
- Điều hướng đến: CS-002-P1 (popup Form ngôn ngữ).
