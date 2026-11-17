# OWN-002 — Thêm mới chủ sở hữu

**Loại:** Trang đầy đủ

**Route:** `/Owner/add` (controller `Owner`, action `add($tab = null)`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Form tạo mới một chủ sở hữu (Owner) trong hệ thống, bao gồm thông tin cá nhân, tài khoản đăng nhập, phân quyền vai trò (role), business unit phụ trách, ảnh đại diện và tuỳ chọn gửi email thông báo mật khẩu. Sau khi lưu, hệ thống chuyển sang màn hình OWN-003 (Chỉnh sửa chủ sở hữu) ở tab "Payment Details".

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên (First Name) | `first_name` | Text | Có | tối thiểu 2 ký tự |
| 2 | Họ (Family Name) | `family_name` | Text | Có | tối thiểu 2 ký tự |
| 3 | Quốc tịch | `nationality` | Select2 | Có | Danh sách quốc gia |
| 4 | Email | `email` | Text (email) | Có | Kiểm tra trùng qua ajax `checkemail` |
| 5 | Tên đăng nhập | `username` | Text | Có | Kiểm tra trùng qua ajax `checkUserName` |
| 6 | Mật khẩu | `password` | Password (có nút hiện/ẩn) | Có | Lưu kèm bản mã hoá base64 vào `legecy_key` |
| 7 | Số điện thoại | `phone_number` | Text | Không | |
| 8 | Trạng thái | `status` | Select (Active/Inactive) | Có | |
| 9 | Loại (Company type) | `company_name` | Radio (Individual/Company) | Có | |
| 10 | Vai trò | `role` | Radio (Owner/Manager/Staff) | Có | Chọn Manager/Staff sẽ hiện thêm mục "Module Access" |
| 11 | Phân quyền module (Module Access) | `user_role[]` | Checkbox nhiều lựa chọn | Có (nếu role = Manager/Staff) | |
| 12 | Business Unit | `business_units[]` | Select2, có thể thêm nhiều dòng (nút "+ Add Business Unit") | Có | |
| 13 | Ngôn ngữ mặc định | `language_id` | Select | Có | |
| 14 | Cổng truy cập (Access Portal) | `access_portal[]` | Checkbox (Owner's Portal / Azura Manager) | Có | |
| 15 | Ảnh đại diện | `upload` / `cropped_image` | File ảnh (có crop tự động tỉ lệ 2:1) | Không | Tối đa 1MB |
| 16 | Gửi email mật khẩu | `send_mail[]` | Checkbox (Yes) | Không | Chỉ hiện khi thêm mới |

## Chức năng/nút thao tác

- **Save**: lưu chủ sở hữu mới, tạo bản ghi `Owner`, `UserBusinessUnit`, `UserRole`; gửi email đăng ký nếu tick "Gửi email"; ghi log hoạt động; sau đó chuyển hướng tới OWN-003 tab "payment-details".
- **Cancel**: quay lại OWN-001 (Danh sách chủ sở hữu).

## Điều hướng

- Mở từ: OWN-001 (nút "+ Add New").
- Sau khi lưu thành công: chuyển tới OWN-003 — Chỉnh sửa chủ sở hữu (tab Payment Details, `show_page=list`).
- Cancel: quay về OWN-001.
