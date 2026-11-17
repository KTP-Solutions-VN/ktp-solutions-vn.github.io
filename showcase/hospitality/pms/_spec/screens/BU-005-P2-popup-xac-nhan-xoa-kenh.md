# BU-005-P2 — Popup xác nhận xóa kênh

**Loại:** Popup (mở từ BU-005)

**Route:** Modal Bootstrap (`#deleteModal`) tĩnh trong `chanels.ctp`; submit POST cùng action `BusinessUnitController::chanels()` với `action=delete`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup xác nhận trước khi xóa một kênh (Chanel) khỏi hệ thống.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung xác nhận | — | Text tĩnh | — | Thông báo xác nhận xóa chung |
| 2 | ID kênh (ẩn) | `id` | Hidden | — | |

## Chức năng/nút thao tác
- **Delete (nút xác nhận):** gửi POST `action=delete` để xóa bản ghi `Chanel`, ghi log hoạt động.
- **Cancel:** đóng modal, không thực hiện thao tác.

## Điều hướng
- Mở từ: BU-005 (danh sách kênh) — icon Xóa trên từng dòng.
- Sau khi xác nhận: redirect quay lại BU-005, hiển thị flash message.
