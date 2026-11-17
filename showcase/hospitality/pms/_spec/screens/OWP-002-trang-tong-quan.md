# OWP-002 — Trang tổng quan (Dashboard)

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::dashboard()` — không có route đẹp riêng (truy cập qua `/external-user/dashboard` theo mặc định CakePHP)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Trang chào mừng sau đăng nhập, hiển thị logo hệ thống và lời chào tới người dùng (Chủ sở hữu). Hiện tại chưa có widget/số liệu thống kê, chỉ là trang giới thiệu tĩnh.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ảnh logo dashboard | — | Hình ảnh tĩnh | — | Chỉ hiện khi user_type khác "Employee" |
| 2 | Lời chào | user.first_name | Text hiển thị | — | "Welcome Back {first_name}" |
| 3 | Mô tả ngắn | — | Text tĩnh | — | Giới thiệu chức năng cổng thông tin |

## Chức năng/nút thao tác

- Không có nút thao tác nghiệp vụ, chỉ hiển thị thông tin

## Điều hướng

- Truy cập từ menu chính sau khi đăng nhập
- Không điều hướng tới màn hình con nào từ đây (chỉ qua menu chung)
