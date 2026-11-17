# BU-010-P4 — Popup Xác nhận xóa tài khoản

**Loại:** Popup (mở từ BU-010, tab Tài khoản)

**Route:** Modal Bootstrap (`#exampleModalDelete`) trong element `business-unit/accounts.ctp`; submit POST tới action `BusinessUnitController::paymentMethod()` với `tab=accounts`, `page_action=delete`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup xác nhận trước khi xóa vĩnh viễn một tài khoản.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung xác nhận | — | Text tĩnh | — | Hiển thị tên tài khoản sắp xóa |
| 2 | Tab (ẩn) | `tab` | Hidden | — | `accounts` |
| 3 | Hành động trang (ẩn) | `page_action` | Hidden (`delete`) | — | |
| 4 | ID tài khoản (ẩn) | `account_id` | Hidden | Có | |

## Chức năng/nút thao tác
- **Delete:** gửi POST xóa bản ghi `Account`, gỡ liên kết khỏi các phương thức thanh toán (`_syncAccountIntoPaymentMethods`).
- **Cancel:** đóng modal, không xóa.

## Điều hướng
- Mở từ: BU-010 (tab Tài khoản) — icon Xóa trên từng dòng.
- Sau khi submit: quay lại BU-010 (tab Tài khoản).
