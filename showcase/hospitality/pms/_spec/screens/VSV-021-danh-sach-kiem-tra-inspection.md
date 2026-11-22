# VSV-021 — Báo cáo kiểm tra (Inspection Reports)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::inspection()` — mặc định `/villa-services/inspection`; dữ liệu bảng tải qua AJAX `inspectionAjax`/`inspectionDetailAjax`

**Module:** Dịch vụ lưu trú — Kiểm tra

## Mô tả ngắn gọn
Danh sách các báo cáo kiểm tra (inspection) villa theo đơn vị kinh doanh/villa, cho phép xem/sửa/ tiếp tục thực hiện báo cáo, cấp quyền xem cho chủ nhà, lưu trữ (archive) hoặc xóa báo cáo.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select (select2) | Có | Admin/Superadmin thấy thêm tùy chọn "All" |
| 2 | Property | `villa_id` | Select (select2) | Không | Nạp động theo BU đã chọn |
| 3 | Show Archive | `archieveCheck` | Checkbox | Không | Hiện các báo cáo đã lưu trữ |

### Danh sách (DataTable, tải AJAX)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | STT | |
| 2 | Business Unit | |
| 3 | Property | |
| 4 | Task | Số lượng hạng mục/nhiệm vụ kiểm tra |
| 5 | Status | Trạng thái báo cáo (đang thực hiện/hoàn tất...) |
| 6 | Created By | |
| 7 | On | Ngày tạo |
| 8 | Actions | View, Edit, Edit Progress, Unlock/Lock (chủ nhà xem), Archive, Delete |

Mỗi dòng có thể mở rộng (expand) hiển thị bảng con theo từng dịch vụ kiểm tra (Service / số hạng mục / trạng thái / nút View) — tải qua AJAX `inspectionDetailAjax`.

## Chức năng/nút thao tác
- **View** (`view-inspection` / `view-inspection-expand`): mở VSV-021-P1 (`inspectionView`) — xem chi tiết báo cáo hoặc theo từng dịch vụ.
- **Edit** (`edit-inspection`): mở VSV-022 (`inspectionEdit`) — sửa thiết lập báo cáo.
- **Edit Progress** (`edit-inspection-progress`, `edit-inspection-disable*`): mở VSV-022-P1 (`inspectionEditDetails`), có biến thể `view=default` / `view=teamlead` theo vai trò người dùng.
- **Unlock/Lock cho chủ nhà**: POST cập nhật `is_access_to_owner` (submit form chính, không AJAX).
- **Archive** (`archive-inspection`): xác nhận rồi gọi AJAX `archieveInspection`.
- **Unarchive**: AJAX `unarchieveInspection` (khi đang xem danh sách đã lưu trữ).
- **Delete** (`delete-inspection`): xác nhận rồi gọi AJAX xóa báo cáo (`deleteInspectionreport`/`deleteInspection`).

## Điều hướng
- Vào từ: Menu chính (mục Inspection Reports).
- Điều hướng đến: VSV-021-P1 (Xem chi tiết kiểm tra), VSV-022 (Sửa thiết lập kiểm tra), VSV-022-P1 (Thực hiện/sửa tiến trình kiểm tra).
