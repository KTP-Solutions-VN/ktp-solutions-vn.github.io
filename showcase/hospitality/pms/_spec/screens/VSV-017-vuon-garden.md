# VSV-017 — Vườn (Garden) — Trang tổng hợp

**Loại:** Trang đầy đủ (dạng tab)

**Route:** `VillaServicesController::garden($tab, $sub_tab)` — mặc định `/villa-services/garden/<tab>/<sub_tab>` (tab: `reports` | `team` | `planning`)

**Module:** Dịch vụ villa — Vườn

## Mô tả ngắn gọn
Trang tổng hợp quản lý dịch vụ chăm sóc vườn, gồm 3 tab: **Reports** (báo cáo các lượt làm vườn đã ghi nhận, xem theo ngày/theo villa), **Team** (danh sách/roster đội làm vườn), **Planning** (lập kế hoạch phân công đội làm vườn theo villa đến hạn chăm sóc).

## Mô tả chi tiết

### Bộ lọc chung
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` (query) | Select | Không | |
| 2 | Date | `date` (query) | Date picker | Không | Áp dụng cho tab Reports/Planning |
| 3 | Villa | `villa` (query) | Select | Không | Chỉ villa có `VillaDetail.is_garden = yes`; áp dụng cho tab Reports |

### Tab "Reports" — sub-tab "By Date" / "By Property"
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Property | Tên villa |
| 2 | Service | Loại dịch vụ vườn |
| 3 | Operator | Người/đội thực hiện |
| 4 | Date (chỉ sub-tab By Property) | Ngày thực hiện |
| 5 | Start / End | Thời gian bắt đầu/kết thúc |
| 6 | GPS | Vị trí ghi nhận |
| 7 | Plan | Kế hoạch/tần suất |
| 8 | Actions | Xem chi tiết (mở VSV-017-P1), Cấp/thu quyền xem cho chủ nhà (unlock/lock), Xóa |

### Tab "Team" — Garden Team roster
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Members select | `members-select` | Select multi | Không | Chọn nhân sự role "Garden" theo BU |

### Tab "Planning" — sub-tab theo từng Team + "Team-Total"
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Slot | Thứ tự khung giờ làm việc trong ngày |
| 2 | Villa | Villa cần chăm sóc (lấy từ villa đến hạn — `_getDueGardenVillas`) |
| 3 | Availability / Guest In | Tình trạng villa có khách hay trống |
| 4 | Start / End / Hours | Thời gian dự kiến và số giờ công |
| 5 (bảng villa đến hạn) | Select / Villa / Due Date / Available / Man Hours / Slot | Danh sách villa đến hạn để kéo/gán vào slot của từng đội |

## Chức năng/nút thao tác
- Chuyển tab/sub-tab để xem Reports, Team, Planning.
- **Xem chi tiết** (tab Reports, từng dòng): mở VSV-017-P1 (`gardenView`).
- **Unlock/Lock cho chủ nhà** (tab Reports): POST `is_owner_access=yes` — bật/tắt quyền chủ nhà xem báo cáo (`GardenJobs.is_access_to_owner`).
- **Xóa** (tab Reports): POST `is_delete=yes` — xóa `GardenJobs` và `GardenCleaning` liên quan.
- **Gán villa vào slot** (tab Planning): lưu qua AJAX `saveGardenPlanning`.
- **Lưu thành viên đội** (tab Team): lưu qua AJAX `saveGardenTeams`.

## Điều hướng
- Vào từ: Menu chính (mục Garden).
- Điều hướng đến: VSV-017-P1 (Xem chi tiết lượt làm vườn).
