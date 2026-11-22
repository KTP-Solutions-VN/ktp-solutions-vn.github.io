# VSV-019 — Lập lịch chăm vườn (Garden Visit Planner)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::gardenPlanning($tab)` — mặc định `/villa-services/garden-planning/<tab>` (tab: `team-<n>` hoặc `team-total`); dữ liệu lưu qua AJAX `saveGardenPlanning`, tải qua `getPlanningAjax`

**Module:** Dịch vụ lưu trú — Chăm vườn

## Mô tả ngắn gọn
Trang lập kế hoạch phân công villa cần chăm sóc vườn vào từng khung giờ (slot) của từng đội làm vườn, theo ngày và đơn vị kinh doanh — là phiên bản trang riêng của tab "Planning" trong VSV-017.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select | Có | |
| 2 | Date | `date_planning` | Text (datepicker) | Có | |
| 3 | Tab đội | `u_tab` | Tab con | Không | Chuyển giữa từng đội (`team-1`, `team-2`, ...) và tổng hợp (`team-total`) |

### Bảng lịch của từng đội (mỗi slot)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Slot | Số thứ tự khung giờ |
| 2 | Villa | Villa được gán vào slot |
| 3 | Availability / Guest In | Villa có khách hay trống |
| 4 | Start / End / Hours | Thời gian và số giờ công dự kiến |

### Bảng villa đến hạn chăm sóc (để gán vào slot)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Select | Chọn villa để gán |
| 2 | Villa | Tên villa |
| 3 | Due Date | Ngày đến hạn chăm sóc |
| 4 | Available | Tình trạng villa (có khách/trống) |
| 5 | Man Hours | Số giờ công ước tính |
| 6 | Slot | Slot dự kiến gán vào |

## Chức năng/nút thao tác
- **Chuyển tab đội**: xem lịch của từng đội hoặc tổng hợp toàn bộ đội.
- **Gán villa vào slot**: chọn villa từ bảng "đến hạn" và gán vào slot trống của đội, lưu qua AJAX `saveGardenPlanning`.
- Đổi Date/Business Unit → tải lại toàn bộ lịch và danh sách villa đến hạn.

## Điều hướng
- Vào từ: Menu chính (mục Garden Visit Planner) hoặc liên quan tab "Planning" trong VSV-017.
- Điều hướng đến: không có trang con.
