# ACC-008 — Danh mục kế toán (Accounting Categories)

**Loại:** Trang đầy đủ

**Route:** `AccountController::accountingCategories()` — mặc định `/account/accounting-categories`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Quản lý danh mục "Accounting Category" dùng để phân loại các bút toán sao kê (`AccountStatement.category_id`). Chỉ Superadmin thấy mục này trong menu. Thêm/Sửa/Xóa qua một popup dùng chung trên cùng trang.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`, không có bộ lọc):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Name | `name` | Tên danh mục kế toán |
| 2 | Actions | — | Nút Sửa, Xóa (mở popup) |

Popup thêm/sửa/xóa (modal `#exampleModal`):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Accounting Category | `name` | Text | Có (`required`, validate remote trùng tên) | Ẩn khi ở chế độ xóa |
| — | Action | `action` (hidden) | Hidden: `add` / `edit` / `delete` | — | |
| — | Id | `id` (hidden) | Hidden | — | Rỗng khi thêm mới |

## Chức năng/nút thao tác
- **Add new:** mở popup ở chế độ thêm, validate tên qua AJAX `checkAccountingCategory` (kiểm tra trùng tên khi chưa có `id`).
- **Sửa (icon bút):** nạp `name`, `id` vào popup, validate tên trùng qua AJAX `checkAccountingCategory` (loại trừ chính bản ghi đang sửa qua `id`).
- **Xóa (icon thùng rác):** popup chuyển sang chế độ xác nhận xóa (ẩn ô nhập, hiện câu hỏi xác nhận); submit sẽ gọi `_deleteData('AccountCategory', 'id', ...)`.
- Cả 3 thao tác submit POST về cùng action `accountingCategories`, phân biệt qua field `action`; sau khi xử lý sẽ redirect về trang gọi (`referer()`). Đều ghi access log (`_generateAccessLogs`).
- Validate ẩn: action `checkAccountingCategory()` — AJAX kiểm tra tên danh mục đã tồn tại (qua `_checkFields` khi thêm mới, `_checkExistingFields` khi sửa).

## Điều hướng
- Vào từ: Sidebar > nhóm "Statements" > "Accounting Categories" (chỉ hiển thị khi `user_type = Superadmin` và `filterSidebar($user, 'Account-accountCategory') == 1`).
- Điều hướng đến: không điều hướng sang trang khác — toàn bộ thao tác Thêm/Sửa/Xóa xử lý ngay trên trang qua popup.
