# ACC-056 — Rebill

**Loại:** Trang đầy đủ

**Route:** `AccountController::rebill()` — mặc định `/account/rebill`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Danh sách các bản ghi Rebill (chi phí phát sinh của Property cần lập lại hoá đơn/tính lại cho tháng cụ thể), cho phép thêm mới, sửa và xoá.

## Mô tả chi tiết

Danh sách (bảng `#zero_config`, nguồn dữ liệu `VillaExpense` với `expense_type = rebill`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property | `villa.name` | |
| 2 | Rebill Month | `rebill_month` | |
| 3 | Expense Month | `expense_month` | |
| 4 | Created At | `created_at` (định dạng `d M Y H:i`) | |
| 5 | Action | — | Nút Sửa (link sang ACC-056-P2) và Xoá (mở popup xác nhận) |

Popup xác nhận Xoá (modal `#exampleModal`):
- Chỉ có 1 dòng text xác nhận, không có field nhập liệu.

## Chức năng/nút thao tác
- **Add new:** điều hướng sang ACC-056-P1 (`addRebill`).
- **Sửa (icon bút, trên từng dòng):** điều hướng sang ACC-056-P2 (`editRebill/<id>`).
- **Xoá (icon thùng rác, trên từng dòng):** mở popup xác nhận; bấm Save trong popup sẽ điều hướng tới `AccountController::deleteRebill(base64(id))` — xoá bản ghi `VillaExpense`, ghi access log, Flash message, rồi quay lại danh sách Rebill.

## Điều hướng
- Vào từ: Sidebar > mục "Rebill" trong nhóm Account/Expenses.
- Điều hướng đến: ACC-056-P1 (Popup thêm Rebill), ACC-056-P2 (Popup sửa Rebill).
