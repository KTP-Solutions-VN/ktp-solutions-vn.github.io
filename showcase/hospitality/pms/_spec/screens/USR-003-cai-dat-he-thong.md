# USR-003 — Cài đặt hệ thống (Settings)

**Loại:** Trang đầy đủ

**Route:** `UserController` kế thừa `LoginController::settings()` — mặc định `user/settings` (không có route đẹp riêng, đã comment sẵn trong `config/Routes.php`)

**Module:** Đăng nhập & Người dùng hệ thống

## Mô tả ngắn gọn
Cùng logic và cùng method `settings()` với LOG-003, nhưng được truy cập qua controller `User` nên hiển thị theo template riêng (`Template/User/settings.ctp`). Dùng để cấu hình thông tin chung của hệ thống (site title, SEO, email quản trị...).

## Mô tả chi tiết

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Site Title | `site_language` | Text | Không | |
| 2 | SEO Description | `seo_description` | Text | Không | |
| 3 | SEO Keywords | `seo_keywords` | Text | Không | |
| 4 | Admin Email | `admin_email` | Text | Không | |
| 5 | From Email | `from_email` | Text | Không | |
| 6 | Title (demo) | `title2` | Text | Không | Field mẫu/tĩnh, chưa gắn dữ liệu |
| 7 | Company Name (demo) | `comname1` | Text | Không | Field mẫu/tĩnh |
| 8 | Email (demo) | `email4` | Email | Không | Field mẫu/tĩnh |
| 9 | Contact No (demo) | `conno2` | Text | Không | Field mẫu/tĩnh |
| 10 | Existing Customer (demo) | `radio-stacked` | Radio (Yes/No) | Không | Field mẫu/tĩnh |

Ghi chú: giống LOG-003, controller đọc `Setting::findById(1)` nhưng chưa gán vào view/chưa xử lý lưu POST.

## Chức năng/nút thao tác
- **Save / Cancel:** nút trên form, hiện chưa gắn xử lý lưu ở controller.

## Điều hướng
- Vào từ: route `/user/settings` (thường dùng nội bộ, không có link menu công khai được tìm thấy).
- Điều hướng đến: không có điều hướng con.
