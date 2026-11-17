# MNT-005 — Xem chi tiết nhật ký bảo trì

**Loại:** Trang đầy đủ
**Route:** maintenance/view/:id
**Module:** MNT = Bảo trì

## Mô tả ngắn gọn
Màn hình xem chi tiết (readonly) một nhật ký bảo trì: thông tin villa, danh mục, mô tả, mức ưu tiên, trạng thái, ảnh minh chứng và lịch sử xử lý (log).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Villa | `data_array.villa.name` | Text readonly | |
| 2 | Danh mục | `data_array.maintenance_category_id` → tên | Text readonly | |
| 3 | Mức ưu tiên | `priority_text` | Text/badge readonly | |
| 4 | Trạng thái | `status` (Open/Pending/Closed/Rejected...) | Badge readonly | |
| 5 | Mô tả | `description` | Text readonly | |
| 6 | Ảnh minh chứng | `MaintenanceMedia` | Danh sách ảnh | |
| 7 | Người mở / ngày mở | `open_by`, `open_date`, `created_at` | Text readonly | |
| 8 | Lịch sử xử lý | `data_log` (`MaintenanceLog`) | Bảng: STT, người xử lý, bình luận, trạng thái, ngày | Kèm cột "Đóng bởi/ngày đóng" |

## Chức năng/nút thao tác
- Chỉ xem, không có thao tác chỉnh sửa trên màn hình này (điều hướng qua Sửa/Cập nhật ở MNT-004 nếu cần).

## Điều hướng
- Vào từ: MNT-001 — Danh sách nhật ký bảo trì (icon xem).
- Đi tới: có thể có liên kết sang MNT-004 (Cập nhật xử lý) hoặc MNT-006 (Chi phí bảo trì).
