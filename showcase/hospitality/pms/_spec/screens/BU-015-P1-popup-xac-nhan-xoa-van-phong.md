# BU-015-P1 — Xác nhận xóa văn phòng (Confirm Office Deletion)

**Loại:** Popup (mở từ BU-015)

**Route:** Modal Bootstrap (`#exampleModal`) tĩnh trong `offices.ctp`; xác nhận điều hướng tới `BusinessUnitController::deleteOffice($id)` — `/business-unit/delete-office/{id}` (id mã hoá base64).

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Popup xác nhận trước khi xóa vĩnh viễn một văn phòng.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung xác nhận | — | Text tĩnh | — | Hiển thị tên văn phòng sắp xóa |

## Chức năng/nút thao tác
- **Delete:** điều hướng trình duyệt tới `delete-office/{id}`, xóa bản ghi `Office`.
- **Cancel:** đóng modal, không xóa.

## Điều hướng
- Mở từ: BU-015 (danh sách văn phòng) — icon Xóa trên từng dòng.
- Sau khi xác nhận: redirect về BU-015.
