# OPR-002 — Danh sách công việc vườn

**Loại:** Trang đầy đủ
**Route:** operator/gardenJobList/:tab? + route đẹp dạng dashed: operator/garden-job-list
**Module:** OPR = Vận hành vườn/hồ bơi

## Mô tả ngắn gọn
Màn hình danh sách các công việc vườn (garden job) đã/đang thực hiện, xem theo 2 tab: "By Date" (theo ngày, có bộ lọc business unit) và "By Property" (theo villa, có bộ lọc business unit + villa). Cho phép xem chi tiết, tải PDF báo cáo, mở/khóa quyền truy cập cho chủ nhà (owner) và xóa bản ghi.

## Mô tả chi tiết

### Bộ lọc chung
| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select2 | Áp dụng cho cả 2 tab; khi đổi sẽ load lại trang với query `business_unit` |
| 2 | Ngày (chỉ tab "By Date") | `date` (điều hướng qua nút mũi tên trái/phải hoặc datepicker) | Datepicker | Mặc định là ngày hiện tại; lọc `GardenJobs.date` |
| 3 | Villa (chỉ tab "By Property") | `villa` | Select2 (danh sách villa có `VillaDetail.is_garden = yes`) | Lọc `GardenJobs.villa_id` |

### Cột hiển thị (cả 2 tab, tab "By Property" có thêm cột Date)
| # | Cột | Field code nguồn | Ghi chú |
|---|---|---|---|
| 1 | Property (villa) | `villa_name` | |
| 2 | Service | `garden_service_name` | Tên dịch vụ vườn (garden_service) |
| 3 | Operator | `operators_name` | Danh sách gardener thực hiện, ghép từ `gardener_ids` |
| 4 | Date (chỉ tab By Property) | `date` | |
| 5 | Start | `start_time` (`actual_start_time`) | |
| 6 | End | `end_time` (`actual_end_time`) | |
| 7 | GPS | `gps` (OK/NOK) | Tính từ khoảng cách giữa vị trí start/end và tọa độ villa; > 200m thì NOK. Bấm vào mở modal chi tiết khoảng cách |
| 8 | Plan | `planned` (Yes/No) | Theo `is_planned` |
| 9 | Actions | — | Xem, Tải PDF, Xóa, Xem bình luận |

## Chức năng/nút thao tác
- **Tab By Date / By Property**: chuyển view (client-side, cùng trang, dữ liệu đã render sẵn ở cả hai bảng `garden_list_bydate` và `garden_list_byproperty`).
- **Xem (icon mắt)**: mở OPR-016 — Xem chi tiết công việc vườn (`gardenView`).
- **Tải PDF (icon download)**: mở file PDF báo cáo công việc vườn (`files/garden-cleaning-pdf/...`) nếu đã có `document`.
- **Xóa (icon thùng rác)**: mở modal xác nhận xóa (inline trong trang, không phải action riêng), submit ẩn `is_delete=yes` + `garden_job_id`, xóa `GardenJobs` và `GardenCleaning` liên quan.
- **Xem bình luận (icon comment)**: chỉ hiện khi có `comment`, mở tooltip/alert hiển thị nội dung bình luận (client-side).
- **Khóa/Mở quyền chủ nhà** (nút "owner_access", nếu có trong dữ liệu): submit ẩn `is_owner_access=yes` + `button_name` (lock/unlock) để cập nhật `GardenJobs.is_access_to_owner`.
- **GPS badge**: bấm mở modal hiển thị bảng Thời gian / Khoảng cách tới villa (start & end).

## Điều hướng
- Vào từ: menu "Garden" (vận hành vườn) trong sidebar; hoặc điều hướng lại từ OPR-001 sau khi Finish/Stop một công việc vườn.
- Đi tới: OPR-016 — Xem chi tiết công việc vườn.
