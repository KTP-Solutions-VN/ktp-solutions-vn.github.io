# FUND-004 — Thêm dự án được tài trợ (New Funded Project)

**Loại:** Trang đầy đủ

**Route:** `FundController::addProject()` — `/fund/add-project` (POST)

**Module:** FUND = Vốn nhà đầu tư

## Mô tả ngắn gọn
Form tạo mới một dự án huy động vốn (Project Fund) với thông tin mô tả, logo và tối đa 4 hình ảnh minh họa.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên dự án | `project_name` | Text | Có | |
| 2 | Logo dự án | `project_logo` | File upload (jpg/png/jpeg/gif) | Có | Tối đa 1 MB |
| 3 | Mô tả dự án | `description` | Text | Có | |
| 4 | Hình ảnh | `img1`…`img4` | File upload (jpg/png/jpeg/gif) | Không | Tối đa 4 ảnh, mỗi ảnh tối đa 1 MB, thêm bằng nút "+" |

## Chức năng/nút thao tác
- **Save**: upload ảnh (nếu có), lưu bản ghi `ProjectFund` gắn `added_by` = user hiện tại; thành công chuyển về FUND-003.
- **Cancel**: quay về FUND-003, không lưu.

## Điều hướng
- Vào từ: FUND-003 (nút "Add New").
- Sau khi lưu/hủy: quay về FUND-003.
