# BU-021 — Sửa hồ sơ ngân hàng (Edit Bank Record)

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::editBank($id)` — mặc định `/business-unit/edit-bank/{id}` (id mã hoá base64)

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Biểu mẫu chỉnh sửa thông tin một ngân hàng đã tồn tại — cùng bộ field với BU-020 (Thêm ngân hàng), nạp sẵn dữ liệu hiện có.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên đầy đủ | `name` | Text | Có | |
| 2 | BIC/SWIFT | `bic_swift` | Text | Có | |
| 3 | Tên viết tắt | `short_name` | Text | Có | |
| 4 | Định dạng số tài khoản | `account_formatting` | Text | Có | |
| 5 | Địa chỉ | `address` | Text | Không | |
| 6 | Quốc gia | `country_name` | Select (select2) | Có | |
| 7 | Logo | `logo` / `cropped_image` | File ảnh (crop 1:1, ≤1MB) | Không | Giữ logo cũ nếu không chọn ảnh mới |

## Chức năng/nút thao tác
- **Save:** cập nhật bản ghi `Bank`, ghi log hoạt động.
- **Cancel:** quay lại BU-019, không lưu.

## Điều hướng
- Mở từ: BU-019 (danh sách ngân hàng) — icon Sửa trên từng dòng.
- Sau khi lưu: redirect về BU-019.
