# NOT-001 — Gửi thông báo/công việc (Notice Board)

**Loại:** Trang đầy đủ

**Route:** `NoticeController::noticeBoard()` — mặc định `/notice/notice-board` (route đẹp không được khai báo riêng trong `config/Routes.php`, dùng fallback DashedRoute)

**Module:** NOT = Thông báo

## Mô tả ngắn gọn
Form cho phép người dùng (Superadmin/Admin/Business Unit Manager...) tạo và gửi một thông báo/công việc (task) tới một nhân sự khác, gắn với một đơn vị kinh doanh (business unit), một property (villa) và một hạng mục dịch vụ (dọn dẹp, vườn, bảo trì, back-office, khác...).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 (danh sách Business Unit) | Không | Mặc định theo BU đang chọn của user; thay đổi sẽ load lại danh sách Property và người nhận qua AJAX (`/notice/getBusinessUnitVilla` — thực tế route `common/getBusinessUnitVilla`) |
| 2 | Property (Villa) | `villa_id` | Select2 (danh sách Villa theo BU) | Có, nếu `service_category` = cleaning/garden | Load động theo `business_unit_id` |
| 3 | Hạng mục dịch vụ | `service_category` | Select2: Back Office, Cleaning Services, Gardening Services, Maintenance Services, Renovation Services, Custom Task | Có | Thay đổi sẽ ẩn/hiện field Task và load danh sách Task tương ứng qua AJAX (`/notice/getServiceData`) |
| 4 | Task (dịch vụ cụ thể) | `service_category_id` | Select2 (danh sách GardenService theo loại) | Có | Ẩn khi `service_category = other` |
| 5 | Nội dung công việc | `notice` | Textarea | Có (khi `service_category = other`) | Chỉ hiện khi chọn "Custom Task" |
| 6 | Hạn hoàn thành | `deadline` | Date-time picker (Bootstrap Material Datetime Picker) | Có | Không cho chọn trước ngày hiện tại |
| 7 | Giao cho | `assign_to` | Select2: Management / Operator | Có | Chọn Operator sẽ hiện thêm field Phòng ban |
| 8 | Phòng ban | `department_id[]` | Checkbox nhiều lựa chọn (danh sách Role/Employee Role) | Có (nếu Operator) | Dùng để lọc người nhận qua AJAX `/notice/getUsersByDepartment` |
| 9 | Người nhận | `received_by` | Select2 (danh sách User) | Có | Danh sách phụ thuộc BU + phòng ban + assign_to |

## Chức năng/nút thao tác
- **Gửi (Send):** submit form, lưu bản ghi `NoticeBoard` + `NoticeBoardDetail`, gửi push notification (FCM) tới người nhận nếu thuộc nhóm dịch vụ back_office/other/cleaning/garden, sau đó chuyển hướng sang màn hình Danh sách thông báo (NOT-002).
- **Hủy (Cancel):** quay lại `noticeList`.
- Các thay đổi trên select (BU, service category, assign_to, department) tự động gọi AJAX để nạp lại các lựa chọn phụ thuộc (không có màn hình riêng).

## Điều hướng
- Vào từ: nút "Assign Task" (icon) trên màn hình NOT-002 (Danh sách thông báo).
- Sau khi gửi thành công hoặc hủy: chuyển tới NOT-002 (Danh sách thông báo).
