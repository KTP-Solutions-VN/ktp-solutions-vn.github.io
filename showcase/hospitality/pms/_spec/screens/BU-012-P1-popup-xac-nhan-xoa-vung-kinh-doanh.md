# BU-012-P1 — Popup Xác nhận xóa vùng kinh doanh

**Loại:** Popup (mở từ BU-012)

**Route:** Modal Bootstrap (`#exampleModal`) tĩnh trong `zoning.ctp`; xác nhận điều hướng tới `BusinessUnitController::deleteZoning($id)` — `/business-unit/delete-zoning/{id}` (id mã hoá base64).

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup xác nhận trước khi xóa (đánh dấu ẩn) một vùng kinh doanh.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung xác nhận | — | Text tĩnh | — | Hiển thị tên vùng sắp xóa |

## Chức năng/nút thao tác
- **Delete:** điều hướng trình duyệt tới `delete-zoning/{id}`, đặt `is_deleted=1` cho bản ghi `BusinessUnitZone`.
- **Cancel:** đóng modal, không xóa.

## Điều hướng
- Mở từ: BU-012 (danh sách vùng kinh doanh) — icon Xóa trên từng dòng.
- Sau khi xác nhận: redirect về BU-012.
