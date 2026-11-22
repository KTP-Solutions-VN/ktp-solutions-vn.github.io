# BU-010-P1 — Form phương thức thanh toán (Payment Method Form)

**Loại:** Popup (mở từ BU-010, tab Phương thức thanh toán)

**Route:** Modal Bootstrap (`#exampleModal`) trong element `business-unit/main_list.ctp`; submit AJAX tới action `BusinessUnitController::paymentMethod()` (tab `main-list`).

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới và Sửa một phương thức thanh toán, kèm chọn Đơn vị kinh doanh áp dụng và Tài khoản liên kết.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên phương thức | `name` | Text | Có | Validate trùng tên qua AJAX `checkPaymentMethod` |
| 2 | Icon | `icon_image` / `cropped_icon` | File ảnh (crop 1:1, ≤1.2MB) | Không | Upload thư mục `payment-method-logo` |
| 3 | Đơn vị kinh doanh áp dụng | `business_unit_id[]` | Checkbox tag (nhiều) | Không | |
| 4 | Tài khoản liên kết | `account_ids[]` | Checkbox tag (nhiều) | Không | Danh sách tài khoản được lọc động theo Đơn vị kinh doanh đã chọn (AJAX `getBuAccount`) |
| 5 | Hành động (ẩn) | `action` | Hidden (`add`/`edit`) | — | |
| 6 | ID (ẩn) | `id` | Hidden | — | Chỉ có khi sửa |

## Chức năng/nút thao tác
- **Save/Update:** gửi AJAX lưu bản ghi `PaymentMethod`, đồng bộ ngược danh sách tài khoản (`_syncPaymentMethodIntoAccounts`), tải lại bảng không reload trang.
- **Cancel:** đóng modal, không lưu.

## Điều hướng
- Mở từ: BU-010 (tab Phương thức thanh toán) — nút "Add new", icon Sửa trên từng dòng.
- Sau khi submit: ở lại BU-010, bảng được tải lại qua AJAX.
