# LOG-003 — Cài đặt hệ thống (Settings)

**Loại:** Trang đầy đủ

**Route:** `LoginController::settings()` — mặc định `login/settings`

**Module:** Đăng nhập & Người dùng hệ thống

## Mô tả ngắn gọn
Form cấu hình thông tin chung của website/hệ thống (tiêu đề site, mô tả/từ khoá SEO, email quản trị, email gửi đi...), lấy dữ liệu nền từ bảng `Setting` (id=1). Đây là action dùng chung với USR-003 (cùng method `settings()` kế thừa từ `LoginController`, chỉ khác theme/route truy cập), nhưng khi vào qua `/login/settings` thì render template riêng của Login.

## Mô tả chi tiết

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Site Title | `site_language` | Text | Không | |
| 2 | SEO Description | `seo_description` | Text | Không | |
| 3 | SEO Keywords | `seo_keywords` | Text | Không | |
| 4 | Admin Email | `admin_email` | Text | Không | |
| 5 | From Email | `from_email` | Text | Không | |
| 6 | Title (demo) | `title2` | Text | Không | Field mẫu/tĩnh, chưa gắn dữ liệu thực (còn sót lại từ template mẫu) |
| 7 | Company Name (demo) | `comname1` | Text | Không | Field mẫu/tĩnh |
| 8 | Email (demo) | `email4` | Email | Không | Field mẫu/tĩnh |
| 9 | Contact No (demo) | `conno2` | Text | Không | Field mẫu/tĩnh |
| 10 | Existing Customer (demo) | `radio-stacked` | Radio (Yes/No) | Không | Field mẫu/tĩnh |

Ghi chú: Controller hiện chỉ đọc `Setting::findById(1)` nhưng chưa gán giá trị vào view và chưa xử lý lưu khi submit (POST) — màn hình đang ở dạng UI tĩnh/chưa hoàn thiện logic lưu.

## Chức năng/nút thao tác
- **Save:** nút submit (chưa có xử lý lưu ở phía controller).
- **Cancel:** nút huỷ (dạng submit, chưa gắn logic).

## Điều hướng
- Vào từ: menu/route `/login/settings` (thường dành cho khu vực quản trị chung).
- Điều hướng đến: không có điều hướng con; là màn hình độc lập tương đương USR-003.
