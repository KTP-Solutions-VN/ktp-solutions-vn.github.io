# BU-022-P3 — Popup Thêm/Sửa tài khoản kênh

**Loại:** Popup (mở từ BU-022, tab Tài khoản kênh)

**Route:** Modal Bootstrap (`#chanelModal`) tĩnh trong `channels.ctp`; submit POST tới `BusinessUnitController::channels('accounts')`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup dùng chung cho Thêm mới và Sửa một tài khoản kênh (`Chanel`) thuộc một Nền tảng đặt phòng cụ thể, cấu hình ownership, quản lý, đơn vị kinh doanh áp dụng và cách nhận/trả tiền.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên tài khoản | `name` | Text | Có | |
| 2 | Ownership | `ownership` | Select (`Azura Stays` / `Partner`) | Có | |
| 3 | Nền tảng | `booking_platform_id` | Select | Có | |
| 4 | Người quản lý | `manager` | Text | Không | |
| 5 | Đơn vị kinh doanh áp dụng | `business_unit_ids[]` | Select multiple (select2) | Có | |
| 6 | Tài khoản nhận thanh toán | `paid_to_account` | Select (select2) | Không | Danh sách `Account` |
| 7 | Chi trả (Paid out) | `paid_out` | Number (ngày) | Không | Kèm chọn thời điểm: Check In/Check Out |
| 8 | Kiểu thời điểm chi trả | `paid_out_type` | Select (`Check In` / `Check Out`) | Không | |
| 9 | Nhận (Received) | `received` | Number (ngày) | Không | |
| 10 | Hành động (ẩn) | `action` | Hidden (`add`/`edit`) | — | |
| 11 | ID (ẩn) | `id` | Hidden | — | Chỉ có khi sửa |

## Chức năng/nút thao tác
- **Save:** lưu bản ghi `Chanel`, ghi log hoạt động.
- **Cancel:** đóng modal, không lưu.

## Điều hướng
- Mở từ: BU-022 (tab Tài khoản kênh) — nút "Add new", icon Sửa trên từng dòng.
- Sau khi submit: ở lại BU-022 (tab `accounts`).
