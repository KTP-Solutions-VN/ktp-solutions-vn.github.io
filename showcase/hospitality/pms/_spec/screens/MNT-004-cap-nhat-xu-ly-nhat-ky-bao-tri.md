# MNT-004 — Cập nhật tiến độ sửa chữa (Repair Progress Update)

**Loại:** Trang đầy đủ
**Route:** maintenance/edit/:id (id base64)
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Màn hình dành cho kỹ thuật viên đã nhận việc để cập nhật tiến trình xử lý một nhật ký bảo trì: đổi trạng thái, thêm bình luận/ghi chú, quản lý ảnh minh chứng (xóa ảnh cũ/thêm ảnh mới). Chỉ người được phân công hoặc Admin/Superadmin/Team Leader mới truy cập được (kiểm tra qua `checkTechnician`).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Thông tin nhật ký (villa, danh mục, mô tả, người mở) | `data_array` | Hiển thị readonly | — | Kèm `MaintenanceMedia`, `MaintenanceLog` (lịch sử) |
| 2 | Trạng thái mới | `type` | Select/Radio | Có | Giá trị theo `data_status` (Open/Pending/Closed/Rejected...) |
| 3 | Bình luận | `comment` | Textarea | Có | Lưu vào `MaintenanceLog.comment` |
| 4 | Ảnh hiện có (giữ lại) | `media_ids[]` | Hidden (checkbox ẩn theo ảnh) | Không | Ảnh không nằm trong `media_ids[]` khi submit sẽ bị xóa khỏi `MaintenanceMedia` |
| 5 | Ảnh mới | `files[]` | Upload ảnh | Không | Thêm vào `MaintenanceMedia` |

## Chức năng/nút thao tác
- **Save/Update**: cập nhật `Maintenance.status`, xóa các ảnh bị bỏ chọn, upload ảnh mới, thêm bản ghi `MaintenanceLog` (comment + status), ghi log hoạt động, chuyển về MNT-001.
- Nếu không phải kỹ thuật viên được phân công: hiển thị lỗi "chỉ kỹ thuật viên được phân công mới truy cập" và quay lại trang trước.

## Điều hướng
- Vào từ: MNT-001 — Yêu cầu sửa chữa (click vào công việc đang xử lý).
- Đi tới: sau khi Update, quay về MNT-001.
