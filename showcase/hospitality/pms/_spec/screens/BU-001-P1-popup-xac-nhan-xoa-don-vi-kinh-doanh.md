# BU-001-P1 — Popup xác nhận xóa đơn vị kinh doanh

**Loại:** Popup (mở từ BU-001)

**Route:** Modal Bootstrap (`#exampleModal`) tĩnh trong `list.ctp`; xác nhận sẽ điều hướng trình duyệt tới `BusinessUnitController::delete($id)` — `/business-unit/delete/{id_base64}`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup xác nhận trước khi xóa một đơn vị kinh doanh khỏi hệ thống.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung xác nhận | — | Text tĩnh | — | Hiển thị tên đơn vị kinh doanh sắp xóa trong tiêu đề modal |

## Chức năng/nút thao tác
- **Delete (nút xác nhận, id `submit_button`):** điều hướng tới `delete/{id}` (id mã hoá base64 phía client bằng `btoa`) để thực hiện xóa.
- **Cancel:** đóng modal, không thực hiện thao tác.

## Điều hướng
- Mở từ: BU-001 (danh sách đơn vị kinh doanh) — icon Xóa trên từng dòng.
- Sau khi xác nhận: gọi `BusinessUnitController::delete()`, ghi log hoạt động, hiển thị flash message rồi redirect về BU-001.
