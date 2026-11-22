# USR-001 — Tổng quan (Overview)

**Loại:** Trang đầy đủ

**Route:** `UserController::dashboard()` — mặc định `user/dashboard`; route đẹp: `/user/dashboard`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Trang chủ hiển thị ngay sau khi nhân viên đăng nhập thành công (là `loginRedirect` mặc định của hệ thống cho các tài khoản nhân viên/Employee). Hiện tại nội dung khá tối giản: chỉ hiển thị logo hệ thống (ẩn với vai trò Employee) và breadcrumb "Home". Đây là điểm trung chuyển để người dùng vào các module khác qua menu chính.

## Mô tả chi tiết

Màn hình không có form nhập liệu; chỉ hiển thị:

| # | Thành phần | Field code | Ghi chú |
|---|---|---|---|
| 1 | Logo hệ thống | — | Chỉ hiển thị khi `user_type != Employee` |
| 2 | Breadcrumb "Home" | — | Link quay lại chính `USR-001` |

## Chức năng/nút thao tác
- Không có thao tác nghiệp vụ trực tiếp trên trang; điều hướng chủ yếu qua menu chính của hệ thống (không thuộc phạm vi 2 controller được giao).

## Điều hướng
- Vào từ: LOG-001 (Đăng nhập) sau khi xác thực thành công (đối với tài khoản Superadmin/Admin/Business Unit Manager, hệ thống chuyển hướng tới danh sách booking thay vì USR-001).
- Điều hướng đến: không có điều hướng con trực tiếp trong phạm vi module này.
