# BU-020 — Thêm ngân hàng

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::addBank()` — mặc định `/business-unit/add-bank`

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Biểu mẫu thêm mới một ngân hàng vào danh mục dùng chung, gồm thông tin định danh, quy tắc định dạng số tài khoản và logo.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên đầy đủ | `name` | Text | Có | |
| 2 | BIC/SWIFT | `bic_swift` | Text | Có | |
| 3 | Tên viết tắt | `short_name` | Text | Có | |
| 4 | Định dạng số tài khoản | `account_formatting` | Text | Có | Mẫu dạng `xxx-xxxxxx-x`, mỗi `x` là 1 chữ số, `-` để phân tách |
| 5 | Địa chỉ | `address` | Text | Không | |
| 6 | Quốc gia | `country_name` | Select (select2) | Có | |
| 7 | Logo | `logo` / `cropped_image` | File ảnh (crop 1:1, ≤1MB) | Không | Upload thư mục `bank-logos` |

## Chức năng/nút thao tác
- **Save:** lưu bản ghi `Bank`, ghi log hoạt động.
- **Cancel:** quay lại BU-019, không lưu.

## Điều hướng
- Mở từ: BU-019 (danh sách ngân hàng) — nút "Add new".
- Sau khi lưu: redirect về BU-019.
