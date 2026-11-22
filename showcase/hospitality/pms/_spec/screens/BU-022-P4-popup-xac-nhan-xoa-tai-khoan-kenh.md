# BU-022-P4 — Xác nhận xóa tài khoản kênh (Confirm Channel Account Deletion)

**Loại:** Popup (mở từ BU-022, tab Tài khoản kênh)

**Route:** Modal Bootstrap (`#deleteModal`) tĩnh trong `channels.ctp`; submit POST tới `BusinessUnitController::channels('accounts')` với `action=delete`.

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Popup xác nhận trước khi xóa vĩnh viễn một tài khoản kênh.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung xác nhận | — | Text tĩnh | — | Hiển thị tên tài khoản sắp xóa |
| 2 | ID (ẩn) | `id` | Hidden | Có | |

## Chức năng/nút thao tác
- **Delete:** gửi POST xóa bản ghi `Chanel`.
- **Cancel:** đóng modal, không xóa.

## Điều hướng
- Mở từ: BU-022 (tab Tài khoản kênh) — icon Xóa trên từng dòng.
- Sau khi submit: ở lại BU-022 (tab `accounts`).
