# BU-010-P2 — Popup Xác nhận xóa phương thức thanh toán

**Loại:** Popup (mở từ BU-010, tab Phương thức thanh toán)

**Route:** Modal Bootstrap (`#exampleModalDeletePM`) trong element `business-unit/main_list.ctp`; submit AJAX tới action `BusinessUnitController::paymentMethod()` với `action=delete`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup xác nhận trước khi xóa vĩnh viễn một phương thức thanh toán.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung xác nhận | — | Text tĩnh | — | Hiển thị tên phương thức sắp xóa |
| 2 | ID (ẩn) | `id` | Hidden | Có | |

## Chức năng/nút thao tác
- **Delete:** gửi AJAX xóa bản ghi `PaymentMethod`, gỡ liên kết khỏi tài khoản (`_syncPaymentMethodIntoAccounts` với danh sách rỗng), tải lại bảng.
- **Cancel:** đóng modal, không xóa.

## Điều hướng
- Mở từ: BU-010 (tab Phương thức thanh toán) — icon Xóa trên từng dòng.
- Sau khi submit: ở lại BU-010, bảng được tải lại qua AJAX.
