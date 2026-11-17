# USR-004 — Danh sách người dùng (nhân viên nội bộ)

**Loại:** Trang đầy đủ

**Route:** `UserController::list($tab)` — mặc định `user/list/:tab`

**Module:** Đăng nhập & Người dùng hệ thống

## Mô tả ngắn gọn
Danh sách toàn bộ nhân viên nội bộ (`User.employment = Internal`) trong hệ thống, cho phép lọc theo vị trí địa lý/business unit, phòng ban, trạng thái, loại lương, quốc tịch, công ty, chi nhánh... Dùng bởi Superadmin/Admin/Business Unit Manager để quản lý nhân sự, xem cảnh báo work permit sắp/đã hết hạn, và là điểm vào của các thao tác thêm/sửa/xoá/xem chi tiết người dùng.

## Mô tả chi tiết

**Cột hiển thị (bảng danh sách):**

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Họ tên | `first_name` + `family_name` | |
| 3 | Tên thường gọi | `usage_name` | |
| 4 | Emoticon/Avatar | `emoticon` | |
| 5 | Vai trò (role) | `user_role` | Có thể nhiều role, nối bằng dấu phẩy |
| 6 | Loại người dùng | `user_type` | Superadmin/Admin/Business Unit Manager/Team Leader/Employee... |
| 7 | Ngày tạo | `created_at` | Định dạng d M Y |
| 8 | Thao tác | — | Xem/Sửa/Xoá |

**Bộ lọc/tìm kiếm:**

| # | Tên field (label) | Field code | Loại input | Ghi chú |
|---|---|---|---|---|
| 1 | Tab danh sách | `tab_name` | Hidden/tab | Mặc định `users` |
| 2 | Business unit / khu vực địa lý | `bu` | Select | Nguồn: business unit theo quyền user + `BusinessUnitZone` |
| 3 | Phòng ban | `dept` | Select | Nguồn: `_getEmployeeRole()`, có thêm nhóm "Management", "_Test" |
| 4 | Loại vị trí (địa lý/chi nhánh) | `loc` | Select | `Goegraphical_location` hoặc theo Office |
| 5 | Trạng thái | `status` | Select/Radio | Active/Inactive (cookie hoá lựa chọn gần nhất) |
| 6 | Loại lương | `salary_type` | Select | All/Daily/Monthly |
| 7 | Quốc tịch | `nationality` | Select | Toàn bộ danh sách quốc gia |
| 8 | Công ty | `company` | Select | Nguồn: bảng `Company` |
| 9 | Chi nhánh (subsidiary) | `subsidiary_id` | Select | Nguồn: `CompanySubsidiary` |
| 10 | Văn phòng (office) | `user_office` | Select | Theo business unit đang chọn |
| 11 | Cấp quyền (access level) | `access_level` | Select | Nguồn: `_getUserType()` |
| 12 | Xuất danh sách nhân viên | `is_download_staff_list` | Checkbox | Gọi action tải xuống `user/downloadUserReport` (không thuộc phạm vi tài liệu hoá màn hình) |

## Chức năng/nút thao tác
- **Thêm mới:** mở USR-005 (Thêm người dùng).
- **Xem chi tiết:** mở USR-007 (Xem chi tiết).
- **Sửa:** mở USR-006 (Sửa người dùng).
- **Xoá:** gọi `user/delete/:id`, có xác nhận trước khi xoá (xoá kèm dữ liệu liên quan: UserBusinessUnit, UserRole, UserLanguage, UserPayroll).
- **Lọc/tìm kiếm:** submit filter để load lại danh sách.
- **Xuất báo cáo nhân sự:** gọi action tải file `user/downloadUserReport` khi bật cờ xuất danh sách (action tải xuống, không có màn hình riêng).
- Cảnh báo work permit: đánh dấu màu (đỏ/cam/xanh) theo số ngày còn lại tới hạn thông báo tiếp theo.

## Điều hướng
- Vào từ: menu chính "Users"/"Nhân viên".
- Điều hướng đến: USR-005 (Thêm), USR-006 (Sửa), USR-007 (Xem chi tiết).
