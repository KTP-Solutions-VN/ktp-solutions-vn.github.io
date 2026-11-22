# BU-019-P1 — Xác nhận xóa ngân hàng (Confirm Bank Deletion)

**Loại:** Popup (mở từ BU-019)

**Route:** Modal Bootstrap (`#exampleModal`) tĩnh trong `banks.ctp`; xác nhận điều hướng tới `BusinessUnitController::deleteBank($id)` — `/business-unit/delete-bank/{id}` (id mã hoá base64).

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Popup xác nhận trước khi xóa vĩnh viễn một ngân hàng.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung xác nhận | — | Text tĩnh | — | Hiển thị tên ngân hàng sắp xóa |

## Chức năng/nút thao tác
- **Delete:** điều hướng trình duyệt tới `delete-bank/{id}`, xóa bản ghi `Bank`.
- **Cancel:** đóng modal, không xóa.

## Điều hướng
- Mở từ: BU-019 (danh sách ngân hàng) — icon Xóa trên từng dòng.
- Sau khi xác nhận: redirect về BU-019.
