# FUND-005 — Sửa dự án được tài trợ (Edit Funded Project)

**Loại:** Trang đầy đủ

**Route:** `FundController::updateProject($id)` — `/fund/update-project/:id` (POST)

**Module:** FUND = Vốn nhà đầu tư

## Mô tả ngắn gọn
Form thêm một "bản cập nhật tiến độ" (nhật ký `ProjectLog`) cho một dự án quỹ đang mở — không sửa trực tiếp thông tin gốc của dự án mà thêm một mốc cập nhật mới kèm hình ảnh và bình luận.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngày cập nhật | `date` | Datepicker | Có | |
| 2 | Hình ảnh | `img1`…`img4` | File upload (jpg/png/jpeg/gif) | Không | Tối đa 4 ảnh, mỗi ảnh tối đa 1 MB |
| 3 | Bình luận | `comment` | Textarea | Có | |

## Chức năng/nút thao tác
- **Save**: lưu bản ghi `ProjectLog` gắn với `project_id` = dự án đang xem; thành công chuyển về FUND-003.
- **Cancel**: quay về FUND-003, không lưu.

## Điều hướng
- Vào từ: FUND-003 (nút "Update", chỉ hiện khi dự án đang mở).
- Sau khi lưu/hủy: quay về FUND-003 (nội dung cập nhật xem lại tại FUND-006).
