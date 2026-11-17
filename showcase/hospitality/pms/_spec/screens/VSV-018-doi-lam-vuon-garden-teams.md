# VSV-018 — Đội làm vườn (Garden Teams)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::gardenTeams()` — mặc định `/villa-services/garden-teams`; lưu qua AJAX `saveGardenTeams`

**Module:** Dịch vụ villa — Vườn

## Mô tả ngắn gọn
Màn hình thiết lập ca làm việc và thành viên cho các đội làm vườn theo ngày và theo đơn vị kinh doanh: mỗi đội có giờ bắt đầu/kết thúc/giờ nghỉ và danh sách nhân sự được gán.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select (select2) | Có | |
| 2 | Date | `date_planning` | Text (datepicker, có nút mũi tên lùi/tiến ngày) | Có | |

### Mỗi đội (team), lặp lại theo số đội hiện có
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Start | `starttime_<n>` | Text (timepicker) | Có | Giờ bắt đầu ca |
| 2 | End | `endtime_<n>` | Text (timepicker) | Có | Giờ kết thúc ca |
| 3 | Break (Hr) | `pause_<n>` | Text (số) | Có | Số giờ nghỉ giữa ca |
| 4 | Thành viên | — | Danh sách hiển thị + nút "+" thêm | Không | Mở modal "Add Member" |

### Modal thêm thành viên
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Members | `members-select` | Select (nạp động theo `users` — nhân sự role "Garden" theo BU) | Có | |
| 2 | Team id (ẩn) | `team-id` | Hidden | — | |

## Chức năng/nút thao tác
- **Add Teams** (nút "+" cuối danh sách): thêm một đội mới vào form.
- **Add Member** (từng đội): mở modal chọn thành viên gán vào đội.
- **Save** (trong modal): lưu thành viên vào đội.
- **Validate**: submit toàn bộ ca làm việc + thành viên các đội (AJAX `saveGardenTeams`).
- Đổi Date/Business Unit → tải lại dữ liệu đội của ngày/BU tương ứng.

## Điều hướng
- Vào từ: Menu chính (mục Garden/Teams) hoặc liên quan tab "Team" trong VSV-017.
- Điều hướng đến: không có trang con (thao tác qua modal tại chỗ).
