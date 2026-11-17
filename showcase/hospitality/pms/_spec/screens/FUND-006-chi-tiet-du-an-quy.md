# FUND-006 — Chi tiết dự án quỹ

**Loại:** Trang đầy đủ

**Route:** `FundController::viewProject($id)` — `/fund/view-project/:id`

**Module:** FUND = Quỹ đầu tư

## Mô tả ngắn gọn
Xem thông tin chi tiết của một dự án quỹ (logo, mô tả, hình ảnh gốc) cùng toàn bộ lịch sử cập nhật tiến độ (`ProjectLog`) đã tạo ở FUND-005, theo thứ tự mới nhất trước.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Logo | `project_logo` | Ảnh (chỉ xem) | — | Ảnh mặc định nếu không tồn tại file |
| 2 | Tên dự án | `project_name` | Text (chỉ xem) | — | |
| 3 | Mô tả | `description` | Text (chỉ xem) | — | |
| 4 | Ngày thêm | `created_at` | Ngày (chỉ xem) | — | |
| 5 | Hình ảnh gốc | `img1`…`img4` | Ảnh (chỉ xem) | — | |
| 6 | Danh sách cập nhật | `project_log[]` | Khối lặp | — | Mỗi mục gồm: ngày cập nhật, bình luận, 4 hình ảnh, nút Xóa |

## Chức năng/nút thao tác
- **Xóa một bản ghi cập nhật** (nút Delete trong từng mục lịch sử): AJAX `fund/delete-project-log`, ẩn mục khỏi giao diện nếu xóa thành công.

## Điều hướng
- Vào từ: FUND-003 (nút View, hoặc sau khi lưu FUND-005 thành công quay lại FUND-003 rồi vào View).
- Không điều hướng tiếp đến màn hình khác.
