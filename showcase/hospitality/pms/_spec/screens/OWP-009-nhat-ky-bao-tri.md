# OWP-009 — Nhật ký bảo trì

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::maintenanceLog($id)` — route đẹp: `/external-user/property/log/:id` (config/Routes.php dòng 108)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Danh sách lịch sử bảo trì (maintenance) của một biệt thự, hiển thị dạng accordion theo từng phiếu bảo trì kèm các bình luận/cập nhật theo thời gian.

## Mô tả chi tiết

Danh sách (accordion) — mỗi mục hiển thị:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Mô tả sự cố | description | Text | — | Tiêu đề accordion |
| 2 | Danh mục bảo trì | maintenance_category_id | Badge/Text | — | Tra từ MaintenanceCategory |
| 3 | Người mở phiếu | open_by | Badge/Text | — | |
| 4 | Ngày tạo | created_at | Ngày | — | |
| 5 | Người đóng phiếu / trạng thái | close_by | Badge/Text | — | "Open" nếu chưa đóng |
| 6 | Bình luận cập nhật (log con) | maintenance_log[].comment | Text | — | Danh sách bình luận theo thời gian, kèm người thêm |

## Chức năng/nút thao tác

- Mở/thu gọn (accordion) từng phiếu bảo trì để xem lịch sử cập nhật
- Không có chức năng thêm/sửa từ phía Chủ sở hữu (chỉ xem)

## Điều hướng

- Vào từ OWP-006/OWP-005 (qua route pretty `/external-user/property/log/:id`)
- Không điều hướng tiếp tới màn hình khác
