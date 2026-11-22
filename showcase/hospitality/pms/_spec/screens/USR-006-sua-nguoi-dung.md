# USR-006 — Sửa thành viên đội ngũ (Edit Team Member)

**Loại:** Trang đầy đủ

**Route:** `UserController::edit($tab, $id, $show_page, $bank_account_id)` — mặc định `user/edit/:tab/:id/:show_page/:bank_account_id`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Form chỉnh sửa đầy đủ hồ sơ một nhân viên, gồm 4-5 tab: Identification (định danh), Office (văn phòng/nơi ở/chấm công), Admin (work permit, tài liệu, tài sản công ty cấp), Payroll (lương), Bank Account (tài khoản ngân hàng). Đây là màn hình trung tâm để hoàn thiện hồ sơ nhân viên sau khi tạo mới ở USR-005, và cũng là nơi khoá lương (`is_lock_sallery`), gán trưởng nhóm, cấu hình chấm công.

## Mô tả chi tiết

### Tab Identification (giống USR-005, có thêm khi sửa)
Toàn bộ field như USR-005 (employee_number, title, first_name, family_name, usage_name, ảnh/avatar, nationality, date_of_birth, email, professional_email, username, password, phone_number, company_id, subsidiary_id, business_unit_id, starting_date, status, day nghỉ cố định, leader_id), giá trị được nạp sẵn từ dữ liệu hiện có của nhân viên.

### Tab Office

| # | Tên field (label) | Field code | Loại input | Ghi chú |
|---|---|---|---|---|
| 1 | Cho phép chấm công (clock in) | `is_clock_in` | Hidden (toggle switch) | yes/no |
| 2 | Bật theo dõi vị trí (tracker) | `is_tracker` | Hidden (toggle switch) | yes/no |
| 3 | Cho phép làm việc từ xa | `is_remote_work_authorized` | Hidden (toggle switch) | yes/no |
| 4 | Số lần/tuần | `times_per_week` | Select | 1–7 |
| 5 | Ảnh nhà | `home_image` | File (jpg/png) | |
| 6 | Địa chỉ nhà | `address` (id=`home_address`) | Text | |
| 7 | Link Google Maps | `home_maps_link` | Text (readonly) | Sinh tự động từ toạ độ |
| 8 | Vĩ độ (latitude) | `home_latitude` | Text | |
| 9 | Kinh độ (longitude) | `home_longitude` | Text | |

### Tab Admin

| # | Tên field (label) | Field code | Loại input | Ghi chú |
|---|---|---|---|---|
| 1 | Trạng thái giấy phép lao động | `work_permit_status` | Select2 | |
| 2 | Ngày dự kiến hoàn tất | `expected_completion_date` | Text (date, readonly) | |
| 3 | Ngày hết hạn giấy phép | `expiry_date` | Text (date, readonly) | |
| 4 | Ngày hết hạn visa | `visa_expiry_date` | Text (date, readonly) | |
| 5 | Ngày thông báo gần nhất | `last_notification_date` | Text (date, readonly) | |
| 6 | Ngày thông báo kế tiếp | `next_notification_date` | Text (date, readonly) | Tô đỏ nếu quá hạn |
| 7 | Ảnh biên nhận giấy phép | `permit_receipt_image` | File | |
| 8 | Đại lý làm thủ tục | `employment_agency` | Select2 | |
| 9 | Có lái xe không | `is_driving` | Select | |
| 10 | Số bảo hiểm xã hội | `social_security_number` | Text | |
| 11 | Ngày đăng ký | `registration_date` | Text (date, readonly) | |
| 12 | Tài liệu đính kèm (mục con) | `title`, `document` | Text + File (ảnh/PDF) | Danh sách tài liệu nhiều dòng |
| 13 | Tài sản công ty cấp (mục con) | `received_on`, `returned_on` | Date | Ngày nhận/ngày trả tài sản |

### Tab Payroll

| # | Tên field (label) | Field code | Loại input | Ghi chú |
|---|---|---|---|---|
| 1 | Tổng lương | `total_amount` | Text (number) | |
| 2 | Lương kỳ 1 | `first_half_amount` | Text (number) | |
| 3 | Lương kỳ 2 | `second_half_amount` | Text (readonly) | Tự tính = tổng - kỳ 1 |
| 4 | Lương theo ngày | `daily_amount` | Text (readonly) | |
| 5 | Tiền tệ | `currency_id` | Select | Mặc định theo tiền tệ business unit |
| 6 | Khoá lương | — (ajax `updateIsLockSallery`) | Toggle | Khoá/mở khoá chỉnh sửa lương |

### Tab Bank Account

| # | Tên field (label) | Field code | Loại input | Ghi chú |
|---|---|---|---|---|
| 1 | Ngân hàng | (select bank) | Select | |
| 2 | Mã SWIFT | `bank_swift` | Text | |
| 3 | Loại tài khoản | (select) | Select | Salary/Reimbursements/Both |
| 4 | Tiền tệ | `currency_id` | Select2 | Nguồn: bảng `Currency` |
| 5 | Tên chủ tài khoản | `account_name` | Text | |
| 6 | Số tài khoản | `account_number` | Text | |
| 7 | Tài liệu đính kèm | `document` | File (ảnh/PDF) | |

## Chức năng/nút thao tác
- **Lưu (mỗi tab lưu riêng qua ajax/submit):** cập nhật dữ liệu tương ứng.
- **Xoá tài khoản ngân hàng:** gọi `user/deleteBankDetail/:id`.
- **Khoá/mở khoá lương:** ajax `updateIsLockSallery`.
- **Gán trưởng nhóm, phân business unit, business unit checkbox nhiều lựa chọn** (`business_units[]`).

## Điều hướng
- Mở từ: USR-004 (icon Sửa), hoặc tự động sau khi lưu thành công ở USR-005.
- Điều hướng đến: quay lại USR-004 sau khi lưu; các tab con không phải là màn hình/popup riêng (thuộc cùng 1 trang, chuyển bằng tab).
