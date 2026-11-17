# BU-007-P1 — Popup Thêm/Sửa tiền tệ

**Loại:** Popup (mở từ BU-007)

**Route:** Modal Bootstrap (`#exampleModal`) tĩnh trong `currency.ctp`; submit POST cùng action `BusinessUnitController::currency()`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới và Sửa một loại tiền tệ.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên tiền tệ | `name` | Text | Có | |
| 2 | Mã | `code` | Text | Có | Mã ISO tiền tệ |
| 3 | Quốc gia | `country_id` | Select (select2) | Có | |
| 4 | Ký hiệu | `sign` | Text | Có | |
| 5 | Hành động (ẩn) | `action` | Hidden (`add`/`edit`) | — | |
| 6 | ID (ẩn) | `id` | Hidden | — | Chỉ có khi sửa |

## Chức năng/nút thao tác
- **Save/Update** (đổi nhãn theo action): lưu bản ghi `Currency`.
- **Cancel:** đóng modal, không lưu.

## Điều hướng
- Mở từ: BU-007 (danh sách tiền tệ) — nút "Add new" (Superadmin), icon Sửa trên từng dòng.
- Sau khi submit: redirect quay lại BU-007 (`referer()`), hiển thị flash message.
