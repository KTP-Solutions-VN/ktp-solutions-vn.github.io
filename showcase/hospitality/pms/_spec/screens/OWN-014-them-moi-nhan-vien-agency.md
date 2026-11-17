# OWN-014 — Thêm mới nhân viên Agency

**Loại:** Trang đầy đủ

**Route:** `/Owner/addAgencyStaff` (controller `Owner`, action `addAgencyStaff()`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Form tạo mới một tài khoản nhân viên (staff) thuộc một Agency, bao gồm thông tin cá nhân, tài khoản đăng nhập, phân quyền truy cập, Agency phụ trách, business unit và ngôn ngữ mặc định.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên (First Name) | `first_name` | Text | Có | tối thiểu 2 ký tự |
| 2 | Họ (Family Name) | `family_name` | Text | Có | tối thiểu 2 ký tự |
| 3 | Quốc tịch | `nationality` | Select2 | Có | Danh sách quốc gia |
| 4 | Email | `email` | Text (email) | Có | Kiểm tra trùng qua ajax `checkAgencyStaffEmail` |
| 5 | Tên đăng nhập | `username` | Text | Có | Kiểm tra trùng qua ajax `checkAgencyStaffUsername` |
| 6 | Mật khẩu | `password` | Password (có nút hiện/ẩn) | Có | Lưu kèm bản mã hoá base64 vào `legecy_key` |
| 7 | Số điện thoại | `phone_number` | Text | Có | |
| 8 | Ngày bắt đầu | `starting_date` | Datepicker | Có | |
| 9 | Trạng thái | `status` | Select (Active/Inactive) | Có | |
| 10 | Owner's Portal | `access_to_owner` | Radio (Yes/No) | Có | |
| 11 | Access Level | `user_type` | Radio (theo danh sách loại user, ẩn bớt Superadmin/Admin/Partner) | Có | Chọn "Team Leader"/"Employee" sẽ hiện thêm "Module Access" |
| 12 | Module Access | `user_role[]` | Checkbox nhiều lựa chọn | Có (nếu user_type = Team Leader/Employee) | |
| 13 | Agency | `agency_id` | Select | Có | Chỉ các Agency đang Active; khi chọn sẽ load lại danh sách Business Unit qua ajax `getAgencyBusinessUnit` |
| 14 | Business Unit | `business_units[]` | Checkbox nhiều lựa chọn | Có | Load động theo Agency đã chọn |
| 15 | Ngôn ngữ mặc định | `language_id` | Select | Có | |

## Chức năng/nút thao tác

- **Save**: lưu bản ghi `AgencyStaff`, `UserBusinessUnit`, `UserRole`; ghi log hoạt động; sau đó chuyển hướng tới OWN-013 (Danh sách nhân viên Agency).
- **Cancel**: quay lại OWN-013.

## Điều hướng

- Mở từ: OWN-013 (nút "+ Add New").
- Sau khi lưu (thành công hoặc thất bại): quay về OWN-013.
- Cancel: quay về OWN-013.
