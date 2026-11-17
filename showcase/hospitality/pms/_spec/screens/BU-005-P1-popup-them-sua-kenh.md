# BU-005-P1 — Popup Thêm/Sửa kênh

**Loại:** Popup (mở từ BU-005)

**Route:** Modal Bootstrap (`#chanelModal`) tĩnh trong `chanels.ctp`; submit POST cùng action `BusinessUnitController::chanels()`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới và Sửa thông tin một kênh (Chanel) — cấu hình tên kênh, ownership, quản lý, đơn vị kinh doanh áp dụng và cách nhận/trả tiền.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên kênh | `name` | Text | Có | Validate trùng tên qua AJAX `checkChanel` |
| 2 | Ownership | `ownership` | Select (`Azura Stays` / `Partner`) | Có | |
| 3 | Người quản lý | `manager` | Text | Không | |
| 4 | Đơn vị kinh doanh áp dụng | `business_unit_ids` | Select multiple (select2) | Không | Danh sách đơn vị kinh doanh đang Active |
| 5 | Tài khoản nhận thanh toán | `paid_to_account` | Select (select2) | Không | Danh sách `Account` |
| 6 | Chi trả (Paid out) | `paid_out` | Input | Không | |
| 7 | Kiểu thời điểm chi trả | `paid_out_type` | Select (`Check In` / `Check Out`) | Không | |
| 8 | Nhận (Received) | `received` | Input | Không | |
| 9 | Ảnh | `image` / `cropped_image` | File ảnh (crop) | Không | Upload thư mục `villas` |
| 10 | Logo | `logo` / `cropped_logo` | File ảnh (crop) | Không | Upload thư mục `chanels-logo` |
| 11 | Hành động (ẩn) | `action` | Hidden (`add`/`edit`) | — | |
| 12 | ID (ẩn) | `id` | Hidden | — | Chỉ có khi sửa |

## Chức năng/nút thao tác
- **Save/Update** (đổi nhãn theo action): lưu bản ghi `Chanel`, ghi log hoạt động, hiển thị flash message.
- **Cancel:** đóng modal, không lưu.

## Điều hướng
- Mở từ: BU-005 (danh sách kênh) — nút "Add new", icon Sửa trên từng dòng.
- Sau khi submit: redirect quay lại BU-005 (`referer()`), hiển thị flash message.
