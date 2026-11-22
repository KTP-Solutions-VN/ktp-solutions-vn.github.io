# ACC-055 — Nhóm chi phí (Cost Categories)

**Loại:** Trang đầy đủ

**Route:** `AccountController::expenseType()` — mặc định `/account/expense-type`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Quản lý danh mục "Loại chi phí" (Cost Categories) dùng trong các bảng kê Rebill/Recurring — danh sách kèm popup thêm/sửa/xoá ngay trên cùng trang.

## Mô tả chi tiết

Danh sách (bảng `#zero_config`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | No | — | Số thứ tự |
| 2 | Name | `name` | Tên loại chi phí |
| 3 | Created | `created_at` (định dạng `d M Y H:i`) | |
| 4 | Action | — | Nút Sửa (icon bút) và Xoá (icon thùng rác), mở popup chung |

Popup thêm/sửa/xoá (modal `#exampleModal`, dùng chung 1 form cho cả 3 thao tác):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Name | `name` | Text | Có (`required`, kiểm tra trùng qua AJAX `checkExpenseType`) | Ẩn khi ở chế độ Xoá (chỉ hiện text xác nhận) |
| — | Action | `action` (hidden) | `add` / `edit` / `delete` | | Xác định thao tác khi submit |
| — | Id | `id` (hidden) | | | Chỉ có khi Sửa/Xoá |

## Chức năng/nút thao tác
- **Add new:** mở popup rỗng, action = `add`.
- **Sửa (icon bút):** mở popup có sẵn tên, action = `edit`, kiểm tra trùng tên loại trừ chính bản ghi đang sửa.
- **Xoá (icon thùng rác):** mở popup dạng xác nhận xoá, action = `delete`.
- **Save/Update/Delete (nút Save trong popup, đổi nhãn theo action):** submit POST về chính action `expenseType`; server xử lý theo `action` (`add`: `_saveData` thêm mới; `edit`: cập nhật theo `id`; `delete`: `_deleteData`), ghi access log, hiện Flash message, rồi `redirect($this->referer())`.
- **Cancel:** đóng popup, không lưu.

## Điều hướng
- Vào từ: Sidebar > mục "Cost Categories" trong nhóm Finance & Admin / Spending.
- Điều hướng đến: không điều hướng sang trang khác — toàn bộ thao tác xử lý trong popup trên cùng trang (submit reload lại danh sách).
