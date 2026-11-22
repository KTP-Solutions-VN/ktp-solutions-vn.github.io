# VSV-026 — Lịch dọn phòng chuyển khách (Turnover Cleaning Rota)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::planningTeams()` — mặc định `/villa-services/planning-teams`; danh sách villa/trạng thái tải qua AJAX `planningTeamsAjax`, cập nhật trạng thái "Clean Today" qua AJAX `updateCleaningDetails`

**Module:** Dịch vụ lưu trú — Dọn phòng

## Mô tả ngắn gọn
Bảng lập kế hoạch dọn dẹp villa theo ngày: hiển thị villa nào cần dọn hôm nay dựa trên ngày check-out gần nhất/check-in kế tiếp, cho phép bật/tắt (toggle) đưa villa vào danh sách cần dọn, xem trạng thái dọn (chưa làm/đang làm/đã dọn/đã báo cáo).

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Date | `date_planning` | Text (datepicker) | Có | Mặc định ngày hiện tại |
| 2 | Business Unit | `business_unit_id` | Select (select2) | Có | Mặc định BU đầu tiên theo phân quyền |
| 3 | Select All | `select_all` | Checkbox | Không | Bật/tắt toàn bộ villa hiển thị cho operator |

### Danh sách villa (DataTable, tải AJAX theo ngày/BU)
| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property | `Villas.name` | |
| 2 | Last Check-out | — | Ngày check-out gần nhất |
| 3 | Next Check-in | — | Ngày check-in kế tiếp |
| 4 | Clean Today | `cleaning_status`, `villa_clean_id` | Toggle bật/tắt (chưa xử lý); nếu đang dọn (`cleaning_status=3`) hiển thị nút "Clean" mở VSV-026-P1; nếu đã có báo cáo (`cleaning_status=4`) hiển thị badge "Cleaning Reported" |

## Chức năng/nút thao tác
- **Toggle "Clean Today"** (từng dòng): bật = đánh dấu villa cần dọn hôm nay (gọi `updateCleaningDetails`); tắt = bỏ khỏi danh sách.
- **Nút "Clean"** (khi đang dọn): mở VSV-026-P1 (`planningTeamsDetail`) xem chi tiết tiến trình dọn dẹp.
- **Badge "Cleaning Reported"** (khi đã hoàn tất): mở modal "Cleaning Overview" tại chỗ — hiển thị Done By, Started at, Ended at, Duration, Start/End location, bảng Photos/Comments.
- Đổi Date/Business Unit → tự động tải lại danh sách.

## Điều hướng
- Vào từ: Menu chính (mục Turnover Cleaning Rota) hoặc VSV-016 (liên quan chủ đề đội dọn dẹp).
- Điều hướng đến: VSV-026-P1 (Chi tiết tiến độ dọn chuyển khách).
