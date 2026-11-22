# USR-005 — Thêm thành viên đội ngũ (New Team Member)

**Loại:** Trang đầy đủ

**Route:** `UserController::add($tab)` — mặc định `user/add/:tab`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Form thêm mới một nhân viên nội bộ vào hệ thống. Màn hình có cấu trúc 4 tab (Định danh/Identification, Văn phòng/Office, Admin, Payroll) dùng chung với USR-006 (Sửa), nhưng khi thêm mới chỉ tab "Identification" được kích hoạt — các tab còn lại (Office, Admin, Payroll) bị khoá cho tới khi nhân viên được lưu lần đầu (khi đó `id` sinh ra và tiếp tục hoàn thiện hồ sơ trên màn USR-006).

## Mô tả chi tiết (tab Định danh — Identification, hiển thị khi thêm mới)

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Mã nhân viên | `employee_number` | Number | Có | Sinh gợi ý mặc định từ hệ thống |
| 2 | Danh xưng | `title` | Select | Có | Mr./Mrs. |
| 3 | Họ | `first_name` | Text | Có | Tối thiểu 2 ký tự |
| 4 | Tên | `family_name` | Text | Có | Tối thiểu 2 ký tự |
| 5 | Tên thường gọi | `usage_name` | Text | Có | |
| 6 | Ảnh đại diện | `upload` (name=`image`) | File (jpg/png/jpeg) | Không | Có crop ảnh phía client |
| 7 | Avatar/emoticon | `upload` (name=`avatar`) + `emoticon` (hidden) | File / emoji picker | Không | |
| 8 | Quốc tịch | `nationality` | Select2 | Có | Danh sách quốc gia |
| 9 | Ngày sinh | `date_of_birth` | Text (date picker, readonly) | Không | |
| 10 | Email cá nhân | `email` | Email | Có | Check trùng qua ajax `checkemail` |
| 11 | Email công việc | `professional_email` | Email | Không | Check trùng qua ajax `checkProfessionalEmail` |
| 12 | Username | `username` | Text | Có | Check trùng qua ajax `checkUserName` |
| 13 | Mật khẩu | `password` | Password | Có | |
| 14 | Số điện thoại | `phone_number` | Text | Có | |
| 15 | Công ty | `company_id` | Select2 | Có | Nguồn: bảng `Company` |
| 16 | Chi nhánh (subsidiary) | `subsidiary_id` | Select2 | Có | Nguồn: `CompanySubsidiary` |
| 17 | Khu vực địa lý/Business Unit | `business_unit_id` | Select2 | Có | Load động theo công ty |
| 18 | Ngày bắt đầu làm việc | `starting_date` | Text (date picker, readonly) | Có | |
| 19 | Trạng thái | `status` | Select | Có | Active/Inactive |
| 20 | Ngày nghỉ cố định trong tuần | `day` | Select | Không | Nguồn: `_getWeekArray()` |
| 21 | Trưởng nhóm (Team Leader) | `leader_id` | Select2 | Không | Danh sách nhân viên có vai trò leader |

## Chức năng/nút thao tác
- **Lưu (Save):** tạo bản ghi `User` mới, gửi email tài khoản (nếu chọn "Gửi email"), ghi log hoạt động.
- **Chuyển tab:** Office/Admin/Payroll bị vô hiệu hoá cho tới khi có `id` (sau lần lưu đầu).
- **Huỷ/Quay lại:** về USR-004.

## Điều hướng
- Mở từ: USR-004 (nút "Thêm mới").
- Điều hướng đến: sau khi lưu thành công, chuyển sang USR-006 (Sửa thành viên đội ngũ) với `id` vừa tạo để tiếp tục nhập Office/Admin/Payroll, hoặc quay về USR-004.
