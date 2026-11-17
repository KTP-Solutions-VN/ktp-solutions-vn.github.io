# USR-018 — Sửa Nhà cung cấp dịch vụ (Edit Provider)

**Loại:** Trang đầy đủ

**Route:** `UserController::editProvider($id)` — mặc định `user/editProvider/:id` (id được base64 encode)

**Module:** Đăng nhập & Người dùng hệ thống

## Mô tả ngắn gọn
Form chỉnh sửa thông tin một tài khoản nhân sự thuộc nhà cung cấp dịch vụ bên ngoài, tương tự USR-017 nhưng nạp sẵn dữ liệu hiện có (mật khẩu không bắt buộc nhập lại).

## Mô tả chi tiết

Các field tương tự USR-017 (Thêm Nhà cung cấp dịch vụ): Dịch vụ, Nhà cung cấp, Họ, Tên, Tên thường gọi, Quốc tịch, Email, Username, Số điện thoại, Trạng thái, Quyền truy cập, Vai trò, Phân quyền module, Đơn vị kinh doanh, Ngôn ngữ, Ảnh đại diện, Avatar — được nạp sẵn giá trị hiện tại từ bản ghi `User`.

| # | Tên field (label) | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Mật khẩu mới | `password` | Password | Không | Chỉ cập nhật nếu nhập |
| 2 | (các field khác) | — | — | — | Giống USR-017, nạp sẵn dữ liệu cũ |

## Chức năng/nút thao tác
- **Cập nhật (Save):** lưu thay đổi vào `User` và các bảng liên quan (đơn vị kinh doanh, vai trò, ngôn ngữ), ghi log hoạt động.
- **Huỷ:** quay về USR-016.

## Điều hướng
- Mở từ: USR-016 (nút "Sửa" trên từng dòng).
- Điều hướng đến: USR-016 (Danh sách Nhà cung cấp dịch vụ) sau khi lưu thành công.
