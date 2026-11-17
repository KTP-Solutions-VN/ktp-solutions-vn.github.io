# ACC-042 — Lương theo ngày (Daily Wages)

**Loại:** Trang đầy đủ

**Route:** `AccountController::dailyWages()` — mặc định `/account/daily-wages`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Tính và thanh toán lương theo ngày công (daily wage) cho nhân viên có `salary_type = daily` trong một kỳ lương (`WagePeriod`) cụ thể, dựa trên dữ liệu chấm công (`UserClockIn`); sau khi tính, xác nhận thanh toán để lưu snapshot vào `UserSalary` và cho phép xuất Excel.

## Mô tả chi tiết

Trang có 2 trạng thái hiển thị tùy kỳ lương đã thanh toán hay chưa (`is_data_paid`, xác định qua việc đã tồn tại `UserSalary` cho kỳ đó):

**A. Kỳ CHƯA thanh toán** — bảng tạm liệt kê nhân viên `UserPayroll.salary_type = daily`, group theo Business Unit:

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | NB | `employee_number` | |
| 2 | Name | `title first_name family_name` | |
| 3 | Nickname | `usage_name` | |
| 4 | Department | `department_id` → tên phòng ban | |
| 5 | Starting Date | `user.starting_date` (định dạng `d M y`) | |
| 6 | Months | tính từ `starting_date` đến hôm nay | |
| 7 | Nationality | `user.nationality` | |
| 8 | Daily | `user_payroll.amount` (định dạng số) | |
| 9+ | (các cột ngày) | render động sau khi bấm **Calculate** | Mỗi ngày trong kỳ 1 cột, trạng thái màu theo `getUserWorkingStatus` |

**B. Kỳ ĐÃ thanh toán** — đọc từ `UserSalary` (snapshot đã lưu khi trả lương): thêm cột **Wages** (`salary`) và **Days** (`working_days`) so với bảng A, cộng dòng "Grand total"; tiêu đề hiện "Paid on &lt;ngày&gt;".

Filter:
- **Business Unit** (`business_unit`)
- **Wage Frequency** (`wage_frequency`): Bi-Monthly/Monthly
- **Period** (`period`): danh sách `WagePeriod` đã bắt đầu (`start_date <= hôm nay`) của BU + tần suất đã chọn, mặc định kỳ mới nhất

Cột trạng thái ngày công (`working_status`, mã màu):
- `OK` (xanh lá/cam tùy đã validate) — có giờ vào/ra hợp lệ tại văn phòng
- `EXT` (xanh lá/cam) — chấm công ngoài văn phòng (theo link Google Maps)
- `SL` (xanh lá nếu có chứng từ, cam nếu không) — nghỉ ốm, tối đa tính công 30 ngày/năm có chứng từ hoặc 3 ngày/năm không chứng từ
- `OFF` (xanh lá) — ngày nghỉ đã đăng ký
- `ABS` (đỏ) — không có dữ liệu chấm công

## Chức năng/nút thao tác
- **Đổi Business Unit / Wage Frequency / Period:** tự reload trang với query tương ứng.
- **Calculate:** AJAX POST `/account/get-user-working-status` (action `getUserWorkingStatus`) — tính `working_status` từng ngày trong kỳ cho mỗi nhân viên `salary_type = daily` dựa trên `UserClockIn`, tính số ngày công và tổng lương (`working_days × daily_wage`); render thêm các cột ngày động vào bảng và các input ẩn (`working_status`, `working_days`, `salary`) để chuẩn bị submit thanh toán. Chỉ hiện ở trạng thái A.
- **To Pay:** chỉ bật (`is_to_pay = true`) khi kỳ lương đã/đang kết thúc và chưa thanh toán, và phải bấm Calculate trước; mở modal xác nhận → submit POST lưu snapshot vào bảng `UserSalary` (`is_to_paid = yes`, `paid_on = hôm nay`, `paid_by = user hiện tại`) rồi load lại trang ở trạng thái B.
- **Download** (chỉ hiện ở trạng thái B): submit form `export_form` → server xuất file Excel `.xlsx` (thư viện PHPExcel, tên file `WAGE-<mã BU>-<ngày kết thúc kỳ>.xlsx`), dùng hàm phụ trợ `getExcelColumnName()` để tính tên cột Excel.

## Điều hướng
- Vào từ: Sidebar > Account & HR > Daily Wages (`active_menu = acc-daily-wages`).
- Điều hướng đến: không có trang con/popup; toàn bộ thao tác (Calculate, To Pay, Download) xử lý bằng AJAX/submit ngay trên trang.
