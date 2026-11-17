# BU-010-P5 — Popup Mở sổ quỹ tài khoản (Open Statement)

**Loại:** Popup (mở từ BU-010, tab Tài khoản)

**Route:** Modal Bootstrap (`#openStatementModal`) trong element `business-unit/accounts.ctp`; submit POST tới `BusinessUnitController::openStatement()`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup nhập Ngày mở sổ và Số dư đầu kỳ để "mở sổ quỹ" (kích hoạt theo dõi giao dịch/sổ quỹ — statement) cho một tài khoản chưa mở sổ. Sau khi mở, hệ thống tự tạo một bút toán "Opening balance" (credit) làm số dư khởi điểm; icon trên danh sách chuyển từ "Open Account" sang "Statement" và dẫn thẳng sang `Account::statements`.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | ID tài khoản (ẩn) | `accounting_id` | Hidden | Có | Gán bằng JS khi bấm icon "Open Statement" trên từng dòng của bảng Tài khoản |
| 2 | Ngày mở sổ | `opening_date` | Date picker (text + datepicker) | Có | |
| 3 | Số dư đầu kỳ | `opening_balance` | Number (text) | Có | Phải là số hợp lệ (validate `number: true`) |

Tiêu đề popup hiển thị động dạng "Open Statement: `<tên tài khoản>`".

## Chức năng/nút thao tác
- **Save:** submit POST tới `openStatement`; cập nhật `Account.opening_date`, `Account.opening_balance`, `Account.opened_by`, `Account.opened_date`, `Account.is_statement_open = open`; đồng thời tạo bản ghi `AccountStatement` (loại `credit`, `is_opening_statement = 1`, mô tả "Opening balance", `ref = <tên tài khoản>-00001`); ghi Access Log; hiển thị Flash thành công/lỗi; quay lại trang trước.
- **Cancel:** đóng modal, không lưu.

## Điều hướng
- Mở từ: BU-010 (tab Tài khoản) — icon "Open Statement" (chỉ hiển thị khi tài khoản chưa mở sổ, `is_statement_open != 'open'`).
- Sau khi submit: quay lại BU-010 (tab Tài khoản).
- Sau khi tài khoản đã mở sổ: icon đổi thành "Statement", điều hướng sang `Account::statements` (ngoài phạm vi module Đơn vị kinh doanh).
