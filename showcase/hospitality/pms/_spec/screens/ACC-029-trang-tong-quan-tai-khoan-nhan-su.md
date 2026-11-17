# ACC-029 — Trang tổng quan Tài khoản & Nhân sự

**Loại:** Trang đầy đủ

**Route:** `AccountController::index()` — mặc định `/account/index` (không có tham số)

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Trang "cửa vào" (landing page) của module Tài khoản & Nhân sự. Action chỉ set tiêu đề trang và `active_menu`, không truy vấn hay hiển thị dữ liệu nghiệp vụ nào — view chỉ hiện logo dashboard mặc định.

## Mô tả chi tiết

Đây không phải trang danh sách hay trang có form, nên không có bảng cột/field. Nội dung view (`Account/index.ctp`):

| # | Thành phần | Điều kiện hiển thị | Ghi chú |
|---|---|---|---|
| 1 | Logo dashboard (`VillaManagement/logo-dashboard.png`) | Chỉ hiện khi `user['user_type'] != 'Employee'` | Ảnh tĩnh, không có link/thao tác |
| 2 | Breadcrumb "Home" | Luôn hiện | Link về `User::dashboard` |

Không có card thống kê, không có danh sách, không có filter. Về bản chất đây là trang placeholder/điểm trung chuyển của module, chưa có nội dung dashboard thực sự (số liệu tổng hợp, shortcut...).

## Chức năng/nút thao tác
- Không có nút thao tác nghiệp vụ nào trên trang.
- Breadcrumb "Home": điều hướng tới `User::dashboard`.

## Điều hướng
- Vào từ:
  - Menu ngang trên cùng (header) — dropdown tài khoản người dùng, mục **"Accounting"** (`Element/header.ctp`, chỉ hiện khi `$currentController == 'Account'`) → `Account::index`.
  - Sidebar > Account & HR > (trong submenu **Settings**, mục cuối cùng) **"Menu"** (`Element/side-bar/account-sidebar.ctp`) → `Account::index`.
- Điều hướng đến: không có liên kết tiếp theo từ chính trang này ngoài breadcrumb Home; người dùng dùng sidebar bên trái để vào các màn hình nghiệp vụ khác của module (Statements — ACC-007, OTA — ACC-030, Settings — ACC-031, Vehicles — ACC-032, ...).
