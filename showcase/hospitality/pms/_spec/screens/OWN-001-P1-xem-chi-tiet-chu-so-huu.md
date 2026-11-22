# OWN-001-P1 — Tóm tắt tài khoản chủ nhà (Owner Account Snapshot)

**Loại:** Popup (mở từ OWN-001)

**Route:** `/Owner/viewDetails/{id}` (controller `Owner`, action `viewDetails($id)`)

**Module:** Quan hệ chủ nhà (Admin)

## Mô tả ngắn gọn

Trang/khung hiển thị thông tin chi tiết (chỉ đọc) của một chủ sở hữu, bao gồm thông tin cá nhân, business unit phụ trách, ngôn ngữ và danh sách đồng sở hữu (co-owner) liên kết. Được mở từ icon "xem" trên danh sách OWN-001.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên (First Name) | `first_name` | Text (readonly) | — | |
| 2 | Họ (Family Name) | `family_name` | Text (readonly) | — | |
| 3 | Quốc tịch | `nationality` | Text (readonly) | — | |
| 4 | Tên đăng nhập | `username` | Text (readonly) | — | |
| 5 | Số điện thoại | `phone_number` | Text (readonly) | — | |
| 6 | Mật khẩu | `legecy_key` (giải mã base64) | Text (readonly) | — | Hiển thị mật khẩu dạng plain-text (giải mã từ trường lưu trữ) |
| 7 | Email | `email` | Text (readonly) | — | |
| 8 | Công ty | `company_name` | Text (readonly) | — | |
| 9 | Business Unit | tổng hợp từ `UserBusinessUnit` | Text (readonly, danh sách nối chuỗi) | — | |
| 10 | Ngôn ngữ | `language_id` | Text (readonly) | — | |
| 11 | Danh sách đồng sở hữu (Co-owner) | `co_owner` | Bảng con: tên, email, ngôn ngữ | — | Hiển thị nếu chủ sở hữu có đồng sở hữu liên kết |

## Chức năng/nút thao tác

- Chỉ xem thông tin, không có nút chỉnh sửa/lưu trên màn hình này.
- Nếu `id` không hợp lệ hoặc không tìm thấy dữ liệu: hiển thị flash lỗi và quay lại trang trước đó (`referer`).

## Điều hướng

- Mở từ: OWN-001 (icon con mắt trên từng dòng danh sách).
- Không điều hướng tiếp tới màn hình con nào khác.
