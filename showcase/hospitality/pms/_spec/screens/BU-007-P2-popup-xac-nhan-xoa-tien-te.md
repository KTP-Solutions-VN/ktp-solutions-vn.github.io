# BU-007-P2 — Popup Xác nhận xóa tiền tệ

**Loại:** Popup (mở từ BU-007)

**Route:** Modal Bootstrap (`#exampleModal`, chế độ ẩn phần form) tĩnh trong `currency.ctp`; submit POST cùng action `BusinessUnitController::currency()` với `action=delete`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup xác nhận trước khi xóa vĩnh viễn một loại tiền tệ khỏi hệ thống.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung xác nhận | — | Text tĩnh | — | Hiển thị tên tiền tệ sắp xóa |
| 2 | ID (ẩn) | `id` | Hidden | Có | |
| 3 | Hành động (ẩn) | `action` | Hidden (`delete`) | — | |

## Chức năng/nút thao tác
- **Delete:** gửi POST xóa bản ghi `Currency`, hiển thị flash message thành công/lỗi.
- **Cancel:** đóng modal, không xóa.

## Điều hướng
- Mở từ: BU-007 (danh sách tiền tệ) — icon Xóa trên từng dòng.
- Sau khi submit: redirect quay lại BU-007 (`referer()`).
