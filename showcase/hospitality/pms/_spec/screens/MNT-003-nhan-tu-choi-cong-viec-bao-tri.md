# MNT-003 — Nhận/Từ chối công việc bảo trì

**Loại:** Trang đầy đủ
**Route:** maintenance/accept/:id (id base64)
**Module:** MNT = Bảo trì

## Mô tả ngắn gọn
Màn hình để kỹ thuật viên/người phụ trách xem thông tin một nhật ký bảo trì đang ở trạng thái Pending và quyết định Nhận (Accept) hoặc Từ chối (Reject) công việc.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Thông tin nhật ký (villa, danh mục, mô tả, mức ưu tiên) | `data_array` (từ `Maintenance`) | Hiển thị readonly | — | |
| 2 | Loại thao tác | `type` | Radio/Button ẩn (`Accepted` hoặc giá trị khác) | Có | Quyết định `status` mới: `Accepted` → `Open`; khác → `Rejected` |

## Chức năng/nút thao tác
- **Accept**: submit `type=Accepted`, cập nhật `Maintenance.status = Open`, `Maintenance.user_id` = user hiện tại, thông báo thành công, chuyển về MNT-001.
- **Reject**: submit `type` khác, cập nhật `Maintenance.status = Rejected`, chuyển về MNT-001.

## Điều hướng
- Vào từ: MNT-001 — Danh sách nhật ký bảo trì (click vào công việc đang Pending).
- Đi tới: sau khi Accept/Reject, quay về MNT-001.
