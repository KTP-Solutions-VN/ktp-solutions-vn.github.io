# OWP-001 — Đăng nhập Owner Hub (Owner Hub Login)

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::index()` — route đẹp: `/Owner`, `/Owners` (config/Routes.php dòng 104-105)

**Module:** Không gian chủ nhà

## Mô tả ngắn gọn

Trang đăng nhập dành cho Chủ sở hữu (Owner) và nhân viên đại lý được cấp quyền (Agency Staff) vào Không gian chủ nhà. Hỗ trợ xác thực qua 2 bảng dữ liệu (Owner, AgencyStaff). Sau khi đăng nhập thành công, hệ thống ghi log truy cập (IP, thiết bị, vị trí địa lý) và chuyển hướng tới danh sách biệt thự (OWP-005).

## Mô tả chi tiết

Bảng field (form đăng nhập):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên đăng nhập | username | Text | Có | So khớp với `Owner.username` hoặc `AgencyStaff.username` |
| 2 | Mật khẩu | password | Password (có nút hiện/ẩn mật khẩu) | Có | |
| 3 | Ghi nhớ đăng nhập | customCheck1 | Checkbox | Không | Hiện có trên UI nhưng chưa thấy xử lý logic ghi nhớ trong controller |

## Chức năng/nút thao tác

- Đăng nhập (submit form tới action `index`, method POST)
- Quên mật khẩu (mở popup OWP-001-P1)
- Thông báo lỗi khi sai tài khoản/mật khẩu (Flash message)
- Tự động chuyển hướng tới OWP-005 (Danh mục của tôi) nếu đã đăng nhập

## Điều hướng

- Đăng nhập thành công → OWP-005 Danh mục của tôi (property/list)
- Nhấn "Quên mật khẩu" → mở OWP-001-P1 (popup, cùng trang)
- Link đặt lại mật khẩu qua email → OWP-003 Mật khẩu mới
