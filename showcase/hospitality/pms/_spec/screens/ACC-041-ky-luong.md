# ACC-041 — Chu kỳ lương (Pay Periods)

**Loại:** Trang đầy đủ

**Route:** `AccountController::wagePeriods()` — mặc định `/account/wage-periods`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Quản lý danh sách các kỳ lương (`WagePeriod`) của một Business Unit theo tần suất trả lương (Bi-Monthly/Monthly): tự sinh kỳ lương đầu tiên nếu chưa có, tự sinh trước các kỳ lương tương lai, cho phép chỉnh ngày kết thúc của kỳ đang mở và xác thực (validate) từng kỳ. Nếu Business Unit thuộc một "zone" dùng chung lịch lương, thay đổi sẽ tự đồng bộ sang các BU khác trong zone.

## Mô tả chi tiết

Bảng (không phân trang, `DataTable` tắt paging/ordering), sắp xếp theo `start_date` giảm dần:

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Start Date | `start_date` (hiện dạng `D, d M y`) | |
| 2 | End Date | `end_date` (hiện dạng `D, d M y`) | Chuyển sang ô nhập + datepicker khi bấm Edit; hiện cảnh báo đỏ "Inconsistencies" nếu `is_error = true` (lệch ngày so với các BU khác cùng zone) |
| 3 | Days | tính runtime `_getDateDiff(start_date, end_date) + 1` | |
| 4 | Actions | — | Edit (ẩn nếu kỳ đã trả lương `is_period_salary_paid` hoặc dòng đã qua/màu đen), Cancel (chỉ hiện khi đang sửa), Validate (ẩn nếu đã validate hoặc không phải kỳ được phép validate kế tiếp) |

Màu dòng (`row_color`): cam = chưa validate, xanh lá = đã validate (`is_validated = yes`), đen = kỳ đã kết thúc trong quá khứ (không còn sửa được).

Filter:
- **Business Unit** (`business_unit_id`): select theo quyền user.
- **Wage Frequency** (`wage_frequency`): Bi-Monthly / Monthly, mặc định `bi_monthly`.

## Chức năng/nút thao tác
- **Đổi Business Unit/Wage Frequency:** tự reload GET `wage-periods?business_unit_id=<id>&wage_frequency=<freq>`.
- **Edit (biểu tượng bút) ở cột End Date:** mở datepicker cho ngày kết thúc của kỳ đó; khi đổi ngày, tự động dời `start_date` của kỳ liền trước (`setDatesOnEdit`) và tính lại số ngày (`Days`) của cả hai dòng liên quan; đổi màu dòng sang cam và hiện nút Validate/Cancel.
- **Validate:** submit form POST về chính action `wagePeriods`; lưu `is_validated = yes` + ngày đã sửa cho `WagePeriod`. Nếu BU thuộc `BusinessUnitZone`, đồng bộ luôn `start_date`/`end_date`/`is_validated` sang bản ghi tương ứng (`zone_row_id`) của các BU khác trong zone.
- **Cancel:** reload lại trang, hủy thay đổi chưa lưu.
- **Tự sinh kỳ lương mặc định:** nếu BU + tần suất `bi_monthly` chưa có `WagePeriod` nào, hệ thống tự tạo 2 kỳ mẫu (11/04/2025–29/04/2025 và 28/03/2025–10/04/2025, đã validate) — chạy ngầm, không có nút riêng.
- **Tự sinh kỳ lương tương lai (`generateFutureWagePeriods`):** mỗi lần tải trang, hệ thống tự tạo thêm kỳ lương kế tiếp cho tới khi có tối đa 2 kỳ tương lai chưa validate so với kỳ hiện hành (đệ quy); ngày kết thúc tính theo quy tắc ngày cuối tháng/giữa tháng lấy từ `getLastDateMonthlyWages`/`getLastDateBiMonthlyWages` của `CommonController`. Không có nút thao tác trên UI, chạy ngầm khi load trang.
- **Đồng bộ zone:** nếu BU thuộc `BusinessUnitZone`, hệ thống tự tạo/xóa các bản ghi `WagePeriod` tương ứng cho từng BU thành viên (liên kết qua `zone_row_id`) để đảm bảo lịch lương thống nhất trong zone.

## Điều hướng
- Vào từ: Sidebar > Finance & Admin > Pay Periods (`active_menu = acc-wagePeriods`).
- Điều hướng đến: không có trang con/popup; toàn bộ thao tác thực hiện trực tiếp trên bảng.
