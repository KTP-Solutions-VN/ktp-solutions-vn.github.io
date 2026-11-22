# VSV-016 — Tổ dọn phòng (Housekeeping Crews)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::cleaningTeams()` — mặc định `/villa-services/cleaning-teams`; danh sách đội tải qua AJAX `cleaningTeamsAjax`, lưu qua `saveCleaningTeams`/`saveCleaningTeamsNew`, sửa qua `updateCleaningTeams`, xóa thành viên qua `deleteCleaningTeamMember` (đều không có view riêng)

**Module:** Dịch vụ lưu trú — Dọn phòng

## Mô tả ngắn gọn
Màn hình tạo và quản lý các đội dọn dẹp (cleaning teams) theo ngày và theo đơn vị kinh doanh (Business Unit): gán nhân sự (cleaner) và phương tiện (vehicle) vào từng đội, xem danh sách đội đã tạo, sửa/xóa thành viên.

## Mô tả chi tiết

### Form tạo đội
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Date | `date_planning` | Text (datepicker) | Có | Ngày áp dụng phân đội |
| 2 | Business Unit | `business_unit_id` | Select (select2) | Có | Mặc định BU đầu tiên theo phân quyền |
| 3 | Cleaner Name | `cleaners[]` | Select multi (select2) | Có | Danh sách nhân sự role "Cleaning" theo BU, loại trừ người đã được gán |
| 4 | Vehicle | `id` (vehicle) | Select (select2) | Có | |
| 5 | Team Name | `team_name` | Text | Có | |

Nút: **Reset** (xóa form), **Save** (lưu đội mới qua AJAX).

### Danh sách đội (DataTable, tải AJAX theo ngày/BU đã chọn)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Business Unit | |
| 2 | Team Name | |
| 3 | Cleaners | Danh sách tên thành viên |
| 4 | Date | |
| 5 | Vehicle | |
| 6 | Action | Nút Edit (mở modal sửa), Delete thành viên |

### Modal sửa đội
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Cleaner Name | `cleaner` | Select | Có | |
| 2 | Vehicle | `vehicle_edit` | Select | Có | |
| 3 | Team Name | `team_name` | Text | Có | |

## Chức năng/nút thao tác
- **Save** (form trên): tạo đội mới cho ngày/BU đã chọn.
- **Reset**: xóa trắng form nhập.
- **Edit** (từng dòng): mở modal sửa Cleaner/Vehicle/Team Name, lưu qua `updateCleaningTeams`.
- **Xóa thành viên**: gọi `deleteCleaningTeamMember`.
- Đổi Date/Business Unit → tự động load lại danh sách đội (AJAX `cleaningTeamsAjax`, `fetchCleanerTeamId`, `getCleanerTeamName`).

## Điều hướng
- Vào từ: Menu chính (mục Housekeeping Crews).
- Điều hướng đến: không có trang con (thao tác qua modal tại chỗ).
