# VSV-021-P1 — Xem chi tiết báo cáo kiểm tra (Inspection View)

**Loại:** Popup (mở từ VSV-021, dạng trang riêng)

**Route:** `VillaServicesController::inspectionView()` — `/villa-services/inspectionView?id=<inspection_key>&keys=<danh sách khóa, tùy chọn>`

**Module:** Dịch vụ villa — Kiểm tra (Inspection)

## Mô tả ngắn gọn
Trang xem từng điểm kiểm tra (inspection point) của một báo cáo, dạng duyệt ảnh tuần tự (Previous/Next) kèm mô tả, bình luận, thông tin người thực hiện/dịch vụ/vị trí; cho phép bình luận, giao việc hoặc chuyển điểm kiểm tra sang báo cáo khác.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa + điểm kiểm tra | `Villa.name`, `inspection_point` | Text (đọc) | — | Tiêu đề |
| 2 | By (Operator) | `user_full_name` | Text (đọc) | — | Người thực hiện điểm kiểm tra |
| 3 | Service | `service_image` | Text/icon (đọc) | — | Loại dịch vụ kiểm tra |
| 4 | Location | `location_image` | Text/icon (đọc) | — | Vị trí kiểm tra trong villa |
| 5 | Ảnh kiểm tra | `InspectionDetails.uploaded_inspection_img` | Ảnh (đọc) | — | |
| 6 | Description | `InspectionDetails.description` | Text (đọc) | — | |
| 7 | Comment | `InspectionDetails.comment` | Text (đọc) | — | Kèm người bình luận + ngày |
| 8 | Assign task info | `AssignTaskBy`, `assign_task_date` | Text (đọc) | — | Hiển thị nếu điểm đã được giao việc |
| 9 | Điều hướng | `prevButton`/`nextButton` | Nút | — | Chuyển qua lại giữa các điểm kiểm tra trong cùng báo cáo |

- Nếu điểm kiểm tra đã được chuyển (`transfer_inspection_key` có giá trị) → chỉ hiển thị nút "Inspection Link" dẫn sang báo cáo đích thay vì các action thường.

## Chức năng/nút thao tác
- **Previous / Next**: duyệt qua các điểm kiểm tra trong báo cáo.
- **Comment** (icon): mở khung nhập bình luận cho điểm kiểm tra.
- **Assign Task** (icon): mở VSV-022-P1 dạng thêm nhiệm vụ — link `/villa-services/add-inspection-task/<id>` (AJAX, không có view riêng).
- **Transfer Inspection** (icon): chuyển điểm kiểm tra này sang báo cáo/nhân sự khác — `/villa-services/transfer-inspection-point/<id>` (AJAX).
- **Delete** (icon, không dành cho Team Leader/Employee): xóa điểm kiểm tra (`deleteInspectionPoint`).

## Điều hướng
- Vào từ: VSV-021 — nút "View"/"View chi tiết dịch vụ" trên từng báo cáo.
- Điều hướng đến: báo cáo đích khi điểm kiểm tra đã được chuyển; quay lại VSV-021.
