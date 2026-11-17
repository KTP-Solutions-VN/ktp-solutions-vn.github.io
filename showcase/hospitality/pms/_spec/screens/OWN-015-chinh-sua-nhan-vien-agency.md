# OWN-015 — Chỉnh sửa nhân viên Agency

**Loại:** Trang đầy đủ

**Route:** `/Owner/editAgencyStaff/{id}` (controller `Owner`, action `editAgencyStaff($id)`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Form chỉnh sửa thông tin một tài khoản nhân viên Agency đã tồn tại. Bố cục field giống OWN-014, có bổ sung giá trị hiện tại (role, business unit, agency) đã được chọn sẵn.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên (First Name) | `first_name` | Text | Có | |
| 2 | Họ (Family Name) | `family_name` | Text | Có | |
| 3 | Quốc tịch | `nationality` | Select2 | Có | |
| 4 | Email | `email` | Text (email) | Có | Kiểm tra trùng qua ajax `checkAgencyStaffEmail` |
| 5 | Tên đăng nhập | `username` | Text | Có | Kiểm tra trùng qua ajax `checkAgencyStaffUsername` |
| 6 | Mật khẩu | `password` | Password (có nút hiện/ẩn) | Có | Giá trị cũ được giải mã base64 để hiển thị lại |
| 7 | Số điện thoại | `phone_number` | Text | Có | |
| 8 | Ngày bắt đầu | `starting_date` | Datepicker | Có | |
| 9 | Trạng thái | `status` | Select (Active/Inactive) | Có | |
| 10 | Owner's Portal | `access_to_owner` | Radio (Yes/No) | Có | |
| 11 | Access Level | `user_type` | Radio | Có | |
| 12 | Module Access | `user_role[]` | Checkbox nhiều lựa chọn, chọn sẵn theo `selected_user_roles` | Có (nếu Team Leader/Employee) | |
| 13 | Agency | `agency_id` | Select | Có | Chọn sẵn Agency hiện tại |
| 14 | Business Unit | `business_units[]` | Checkbox nhiều lựa chọn, chọn sẵn theo `selected_user_business_unit` | Có | |
| 15 | Ngôn ngữ mặc định | `language_id` | Select | Có | |

## Chức năng/nút thao tác

- **Save**: cập nhật `AgencyStaff`; xoá và ghi lại toàn bộ `UserBusinessUnit`/`UserRole` liên quan; ghi log hoạt động; sau đó chuyển hướng tới OWN-013 (Danh sách nhân viên Agency).
- **Cancel**: quay lại OWN-013.

## Điều hướng

- Mở từ: OWN-013 (icon "Sửa" trên từng dòng).
- Sau khi lưu (thành công hoặc thất bại): quay về OWN-013.
- Cancel: quay về OWN-013.
