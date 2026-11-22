# ACC-033 — Nhật ký chuyên cần (Attendance Log)

**Loại:** Trang đầy đủ

**Route:** `AccountController::timesheet()` — mặc định `/account/timesheet`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Theo dõi giờ chấm công vào/ra (clock-in/clock-out) hàng ngày của toàn bộ nhân viên nội bộ (`employment = Internal`, `is_clock_in = yes`, không phải Superadmin, không phải test staff) theo Business Unit và theo ngày; cho phép người có quyền xác thực (validate) giờ chấm công, chỉnh giờ vào thủ công, xem vị trí GPS lúc chấm công/tan ca và lộ trình di chuyển trong ngày trên bản đồ.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`, dữ liệu group theo `Department.name` rồi `User.usage_name`, chỉ lấy `UserClockIn` của đúng ngày đang xem):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Name | `emoticon` + `usage_name` + `first_name family_name` | |
| 2 | Department | `department.name` | |
| 3 | Clock in | `user_clock_in.clock_in_time` (định dạng `H:i`) | Nếu `is_manual_clockin = yes` hiện màu xanh + "(Updated by &lt;người sửa&gt;)"; nếu `is_user_day_off = yes` gộp cột (colspan 4) hiện "Day off"; nếu `is_sick_leave = yes` hiện "Sick leave"; nếu chưa có giờ vào và người xem là Superadmin/Admin/Business Unit Manager/HR thì hiện link "No" (đỏ) để nhập giờ thủ công |
| 4 | Location (vào) | `user_clock_in.clock_in_location` | Link mở Google Maps + khoảng cách tới văn phòng (m) nếu tính được |
| 5 | Clock out | `user_clock_in.clock_out_time` (định dạng `H:i`) | "No" (đỏ) nếu chưa chấm ra |
| 6 | Location (ra) | `user_clock_in.clock_out_location` | Link Google Maps + khoảng cách (m) |
| 7 | Validated | `user_clock_in.is_validated` | "Yes" nếu đã xác thực; nếu chưa và đã có giờ ra + người xem có quyền validate (`show_validate_button`) thì hiện nút "Validate" |
| 8 | By | `user_clock_in.validator_name` | Người đã xác thực |
| 9 | On | `user_clock_in.validated_on` (định dạng `d M y`) | Ngày xác thực |
| 10 | Created at | `user_clock_in.created_at` (định dạng `d M y H:i`) | |
| 11 | Tracker | — | Chỉ hiện với Superadmin/Admin/Business Unit Manager: nút "Track" (mở modal bản đồ lộ trình `tracking_location`) nếu `is_tracker = yes`; hoặc "Day off"/link tải chứng từ nghỉ ốm/"User tracking not enabled." (link sang trang sửa User) tùy trạng thái |

Filter phía trên bảng:
- **Business Unit** (`business_unit`): select "All" + danh sách BU/zone theo quyền user (`_getAuthBasedBuVilla`).
- **Date** (`date`): text + datepicker `dd-mm-yyyy`, mặc định hôm nay, không cho chọn ngày tương lai (`endDate: new Date()`).

## Chức năng/nút thao tác
- **Search:** submit GET, load lại trang với `business_unit` + `date` đã chọn.
- **Nhập giờ chấm công thủ công:** bấm link "No" (đỏ) ở cột Clock in → hiện time-picker → chọn giờ → AJAX POST `/account/add-user-clockin` (action `addUserClockin`, không có view riêng) lưu/cập nhật `UserClockIn.clock_in_time`, đánh dấu `is_manual_clockin = yes`, `modified_by` = người sửa.
- **Đánh dấu ngày nghỉ (Day off):** nút "Day off" xuất hiện trong toolbar của time-picker → gọi cùng AJAX `add-user-clockin` với `clock_in_time = user_day_off` để set `is_user_day_off = yes`.
- **Validate:** nút "Validate" trên dòng nhân viên → AJAX POST `/account/validateUser` (action nằm ngoài phạm vi tài liệu này) set `is_validated = yes`, `validated_by`, `validated_on = hôm nay`.
- **Track:** mở modal bản đồ (Google Maps) hiển thị các điểm GPS đã ghi trong ngày (`tracking_location`) cùng vị trí lúc clock-in/clock-out.
- **Tải chứng từ nghỉ ốm:** link tải file `certificate` khi `is_sick_leave = yes` và `is_certificate = yes`.
- Action AJAX `getUserWorkingStatus` **không** được dùng trong màn hình này (được dùng ở ACC-042 — Thu nhập theo ngày).

## Điều hướng
- Vào từ: Sidebar > Finance & Admin > Attendance Log (`active_menu = acc-timesheet`).
- Điều hướng đến: không có trang popup riêng; các thao tác Track/nhập giờ đều xử lý bằng modal/AJAX ngay trên trang. Link "User tracking not enabled." mở trang sửa User (`User::edit`) ở tab mới.
