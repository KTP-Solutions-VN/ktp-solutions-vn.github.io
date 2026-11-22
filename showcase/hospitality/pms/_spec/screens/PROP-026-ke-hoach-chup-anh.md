# PROP-026 — Bộ lập lịch chụp ảnh (Shoot Scheduler)

**Loại:** Trang đầy đủ
**Route:** property/photography/:shootId/:guidelineId (route mặc định dạng dashed; `$shootId` cũng được dùng làm "sub-action" đặc biệt: `guidelines`, `download-guideline`, `delete-guideline` để rẽ nhánh sang các thao tác quản lý hướng dẫn chụp ảnh)
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang trung tâm quản lý kế hoạch chụp ảnh (Photo Shoot Planning) cho các Property/Residence/Unit theo Business Unit: tạo/sửa lịch chụp, theo dõi follow-up sau chụp, xác nhận hoàn tất bộ ảnh. Action này render template `Photos/planning.ctp` (không dùng `photography.ctp` trực tiếp — file `photography.ctp` là template cũ/lược giản, còn dashboard chính nằm ở view `planning`).

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` / `id` (query) | Select2 | Có | Đổi giá trị → redirect kèm `business_unit_id` (base64) |
| 2 | Scope kế hoạch | (thuộc `scopeOptions`) | Select | Có | Phạm vi Property/Residence/Unit gắn với lịch chụp |
| 3 | Mục tiêu buổi chụp (Shoot Objective) | (thuộc `shootObjectiveOptions`) | Select | Có | |
| 4 | Ngày lên lịch, ghi chú... | (theo `editShoot`/form planning) | Nhiều field text/date | Có (tùy field) | Dữ liệu lưu qua `savePlanningShoot()` vào entity Shoot Plan |

Dữ liệu bảng chính (`planningData`) gồm danh sách lịch chụp (status, ngày, business unit), danh sách follow-up cần xử lý.

## Chức năng/nút thao tác
- Tạo/sửa lịch chụp (submit POST tới chính action, `shootId` = 0 khi thêm mới, > 0 khi sửa) — hỗ trợ cả AJAX (trả JSON) và submit thường (Flash + redirect).
- Xóa lịch chụp — `deleteShootPlan/{shootId}`.
- Xác nhận lịch chụp — `confirmShootPlan/{shootId}`.
- Xác nhận bộ ảnh đã chụp xong — `confirmPhotoSet/{shootId}`.
- Ghi nhận hành động follow-up — `recordFollowUpAction/{followUpId}`.
- Đánh dấu hoàn tất follow-up — `completeFollowUp/{followUpId}`.
- Xóa follow-up — `deleteFollowUp/{followUpId}`.
- Xem bộ ảnh property — link `Photos::property`.
- Nếu storage kế hoạch (`photoPlanningReady()`) chưa sẵn sàng, chặn thao tác lưu và hiển thị cảnh báo/JSON lỗi.
- Sub-route đặc biệt: `photography/guidelines/{guidelineId}` (quản lý hướng dẫn chụp ảnh - PDF mẫu), `photography/download-guideline/{guidelineId}` (tải guideline), `photography/delete-guideline/{guidelineId}` (xóa guideline).

## Điều hướng
- Mở từ: Menu Shoots chính; PROP-027 (nút "Plan Photo Shoot"); PROP-019 (breadcrumb).
- Điều hướng tới: `newShooting` (PROP-019), `photographyScores` (PROP-028), `photographyMissingPhotos` (PROP-027), `photographerEvaluation` (PROP-025), `Photos::property` (xem/upload ảnh, ngoài phạm vi).
- Popup con: Không có (view chính nằm ở `Photos/planning.ctp`, không phải `photography.ctp`).
