# LOG-001 — Đăng nhập (Sign In)

**Loại:** Trang đầy đủ

**Route:** `LoginController::index()` — mặc định `login/index`; route đẹp: `/` (trang gốc của hệ thống)

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Màn hình đăng nhập vào hệ thống Azura Manager PMS, áp dụng cho mọi loại tài khoản (Superadmin, Admin, Business Unit Manager, nhân viên, đối tác/agency-staff, chủ villa dùng chung bảng User/AgencyStaff/Owner). Sau khi xác thực thành công, hệ thống tính toán quyền/role, business unit được gán và chuyển hướng tới dashboard phù hợp với loại tài khoản. Người dùng có thể chọn "Ghi nhớ đăng nhập" và có lối vào màn hình quên mật khẩu.

## Mô tả chi tiết

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Username | `username` | Text | Có | Đăng nhập bằng username (không phải email) |
| 2 | Password | `password` | Password (có nút hiện/ẩn mật khẩu `show_password`) | Có | |
| 3 | Ghi nhớ đăng nhập | `remember_me` | Checkbox | Không | Khi tick, lưu cookie `remember_me` (mã hoá JSON username/password) tồn tại 100 năm |

Xác thực đồng thời trên 3 nguồn (multi-auth CakePHP): bảng `User` (nhân viên nội bộ), `AgencyStaff` (nhân viên đại lý), `Owner` (chủ villa), chỉ chấp nhận tài khoản có `status = Active`.

## Chức năng/nút thao tác
- **Đăng nhập (submit):** xác thực, ghi log truy cập, tính quyền hạn (`user_privileges`), gán business unit, chuyển hướng theo loại tài khoản (Superadmin/Admin/BU Manager → danh sách booking; nhân viên → USR-001 Dashboard; chủ villa dùng "switch owner" → trang ExternalUser).
- **Quên mật khẩu? (link "to-recover"):** mở popup LOG-001-P1 ngay trên trang, không điều hướng trang khác.
- Thông báo lỗi đăng nhập (sai username/password) hiển thị dạng flash message trong `#login_message`.

## Điều hướng
- Vào từ: truy cập gốc `/`, hoặc bị chuyển hướng tới khi phiên hết hạn / chưa đăng nhập / logout.
- Điều hướng đến: LOG-001-P1 (Khôi phục mật khẩu — popup con), USR-001 (Overview) hoặc trang danh sách booking tuỳ loại tài khoản sau khi đăng nhập thành công.
- Popup con: LOG-001-P1.
