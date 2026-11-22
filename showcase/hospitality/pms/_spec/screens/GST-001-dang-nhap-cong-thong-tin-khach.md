# GST-001 — Đăng nhập Guest Hub (Guest Hub Login)

**Loại:** Trang đầy đủ
**Route:** `Guest::index()` — mặc định `/guest/index`; route đẹp: `/Welcome`, `/Welcome/:id` (đều trỏ về cùng action, tham số `id` không được controller sử dụng)
**Module:** Không gian khách

## Mô tả ngắn gọn
Trang đăng nhập bằng "mã truy cập" (access code) do hệ thống cấp cho từng đoàn khách (nhóm chat). Đây cũng là `loginAction`/`logoutRedirect`/`unauthorizedRedirect` mặc định của Guest Hub.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Mã truy cập | `access_code` | Input text | Có (ràng buộc JS `.required`, jQuery Validate) | Đối chiếu với `GroupChat.access_code` (điều kiện `GroupChat.status != Inactive`), lấy kèm thông tin `GuestDetail` (họ tên, email, địa chỉ, SĐT, quốc gia, ngôn ngữ) để tạo phiên đăng nhập |
| 2 | Thông báo lỗi đăng nhập | (Flash message) | Text hiển thị | Không | Hiển thị `invalid_access_code_text` khi không tìm thấy `GroupChat` khớp mã hoặc đoàn đã `Inactive` |

## Chức năng/nút thao tác
- **Nút submit "Access Portal"**: gửi POST `access_code`; nếu hợp lệ, hệ thống:
  - Ghi log truy cập (`_generateAccessLogs`) với nội dung "`<Tên khách>` logged into the system."
  - Thiết lập phiên Auth (`user_type = guest-user`, `access_code`, `booking_id`, thông tin khách…)
  - Chuyển hướng tới GST-002 (Đặt chỗ của tôi)
- Nếu access_code sai/đoàn không hoạt động: hiển thị Flash lỗi, ở lại trang.
- Nếu người dùng đã đăng nhập và mở lại URL này: tự động chuyển hướng tới GST-003 (Chi tiết chuyến đi).

## Điều hướng
- Đăng nhập thành công → GST-002 (Đặt chỗ của tôi)
- Đã có phiên đăng nhập từ trước → GST-003 (Chi tiết chuyến đi)
