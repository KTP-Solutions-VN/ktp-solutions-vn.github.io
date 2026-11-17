# ACC-061 — Ma trận phê duyệt (Approval Matrix)

**Loại:** Trang đầy đủ

**Route:** `AccountController::approvalMatrix()` — mặc định `/account/approval-matrix`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Cấu hình danh sách người dùng có quyền phê duyệt (approval) theo từng Business Unit — mỗi dòng gắn 1 User với danh sách Business Unit mà người đó được phép phê duyệt.

## Mô tả chi tiết

Danh sách (bảng `#zero_config`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | User | `user.usage_name` | |
| 2 | Business Units | `business_unit` | Tên các BU được join từ `business_unit_ids` (JSON), chỉ lấy BU đang Active |
| 3 | Authorised By | `created_user.usage_name` | Người tạo bản ghi |
| 4 | On | `updated_at` (định dạng `d M y, h:i:s`) | |
| 5 | Action | — | Sửa (icon bút) và Xoá (icon thùng rác), mở popup chung |

Popup thêm/sửa (modal `#exampleModal`, dùng chung 1 form cho add/edit/delete):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | User | `user_id` | Select2 (danh sách User là Admin, hoặc Employee/Team Leader có role id = 1, đang Active) | Có (`required`) | |
| 2 | Business Units | `business_unit_ids[]` | Checkbox nhiều lựa chọn | Có (`required`, validate JS) | |
| — | Action | `action` (hidden) | `add`/`edit`/`delete` | | |
| — | Id | `id` (hidden) | | | Khi Sửa/Xoá |

## Chức năng/nút thao tác
- **Add new:** mở popup rỗng, action = `add`.
- **Sửa (icon bút):** mở popup nạp sẵn User + Business Units đã chọn, action = `edit`.
- **Xoá (icon thùng rác):** mở popup xác nhận, action = `delete`.
- **Save (nút trong popup):** submit POST về chính action `approvalMatrix`; server xử lý `add`/`edit`/`delete` trên bảng `ApprovalMatrix`, hiện Flash message, rồi `redirect($this->referer())`.

## Điều hướng
- Vào từ: Sidebar > mục "Approval Matrix" trong Account Settings.
- Điều hướng đến: không điều hướng sang trang khác — toàn bộ thao tác xử lý trong popup trên cùng trang.
