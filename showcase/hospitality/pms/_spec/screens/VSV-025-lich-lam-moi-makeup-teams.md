# VSV-025 — Lịch làm mới phòng hằng ngày (Daily Refresh Rota)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::makeupTeams()` — mặc định `/villa-services/makeup-teams`; danh sách tải qua AJAX `makeupAjax`, cập nhật trạng thái qua AJAX `updateMakeupDetails`/`updateAllMakeupDetails`

**Module:** Dịch vụ lưu trú — Dọn phòng (làm mới phòng)

## Mô tả ngắn gọn
Bảng lập kế hoạch "làm mới" (make-up cleaning — dọn nhẹ trong lúc khách đang ở, khác với dọn tổng vệ sinh) theo ngày, hiển thị villa nào cần làm mới hôm nay dựa trên ngày check-in/check-out, cho phép bật/tắt đưa villa vào danh sách và xem tiến trình thực hiện.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Date | `date_planning` | Text (datepicker) | Có | Mặc định ngày hiện tại |
| 2 | Business Unit | `business_unit_id` | Select (select2) | Có | |

### Danh sách villa (DataTable, tải AJAX)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Property | Tên villa |
| 2 | Check-in | Ngày check-in hiện tại của khách đang ở |
| 3 | Check-out | Ngày check-out dự kiến |
| 4 | Makeup Today | Toggle bật/tắt; khi đang thực hiện hiển thị nút mở VSV-025-P1; khi hoàn tất hiển thị badge xem báo cáo |

## Chức năng/nút thao tác
- **Toggle "Makeup Today"** (từng dòng): đánh dấu villa cần làm mới hôm nay.
- **Xem chi tiết** (khi đang/đã thực hiện): mở VSV-025-P1 (`makeupTeamsDetail`) hoặc modal "Cleaning Overview" (Done By, Started/Ended at, Duration, Photos/Comments) tùy trạng thái.
- Đổi Date/Business Unit → tải lại danh sách.

## Điều hướng
- Vào từ: Menu chính (mục Daily Refresh Rota).
- Điều hướng đến: VSV-025-P1 (Chi tiết tiến độ làm mới).
