# ACC-028 — Đối soát tài khoản (bản cũ/legacy)

**Loại:** Trang đầy đủ (nghi vấn không còn được sử dụng — xem phần Điều hướng)

**Route:** `AccountController::reconcile()` — mặc định `/account/reconcile`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Action rất ngắn: chỉ lấy danh sách toàn bộ `Account` (không lọc theo `is_statement_open`) rồi render trang `reconcile.ctp` với một form tĩnh (chọn Account, nhập Start Balance/Reconcile Amount/Reconcile Date) và nút Save — nhưng form này không submit đi đâu (không có `Form->create`, action, hay xử lý POST nào trong controller). Có vẻ là bản dựng dở/legacy của chức năng đối soát, đã được thay thế bởi ACC-009 (`statementReconcile`).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Account | `account_id` | Select2 (toàn bộ `Account`, không lọc trạng thái) | Đánh dấu class `required` trên UI nhưng không có validate JS | |
| 2 | Start Balance | `start_balance` | Input number | Không | Không có value mặc định, không đọc từ DB |
| 3 | Reconcile Amount | `reconcile_amount` | Input number | Không | |
| 4 | Reconcile Date | `reconcile_date` | Input number (thực chất field ngày nhưng type=number, không gắn datepicker) | Không | |

Không có bảng danh sách bút toán, không có DataTable, không có xử lý POST trong controller (`reconcile()` chỉ set `accounts` rồi render).

## Chức năng/nút thao tác
- **Save:** nút bấm nhưng KHÔNG nằm trong `Form->create` nào và controller không xử lý request POST — bấm Save không có tác dụng lưu dữ liệu thực tế (view không bọc form, chỉ có các input rời rạc).
- **Cancel:** link tĩnh trỏ về `User::list` (không liên quan tới account/statements).
- Không có AJAX nào được gắn kèm trong file `reconcile.ctp` ngoài cập nhật breadcrumb.

## Điều hướng
- Vào từ: KHÔNG tìm thấy link nào trỏ tới action `reconcile` trong toàn bộ template (đã tìm kiếm `account-sidebar.ctp` và các view khác). Action này dùng cùng `active_menu = 'acc-statementReconcile'` như ACC-009 (`statementReconcile`), nhưng mục menu "Reconcile" trong sidebar trỏ thẳng tới `statementReconcile`, không trỏ tới `reconcile`. Kết luận: đây là màn hình dường như không còn được liên kết trong menu hiện tại, có khả năng là phiên bản cũ/legacy đã bị thay thế bởi ACC-009.
- Điều hướng đến: không có (nút Save/Cancel không hoạt động đúng nghĩa nghiệp vụ đối soát).
