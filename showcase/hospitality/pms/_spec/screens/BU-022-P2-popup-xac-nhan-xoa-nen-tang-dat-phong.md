# BU-022-P2 — Popup Xác nhận xóa nền tảng đặt phòng

**Loại:** Popup (mở từ BU-022, tab Nền tảng đặt phòng)

**Route:** Modal Bootstrap (`#deletePlatformModal`) tĩnh trong `channels.ctp`; submit POST tới `BusinessUnitController::channels('platforms')` với `platform_action=delete`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup xác nhận trước khi xóa vĩnh viễn một nền tảng đặt phòng. Hệ thống chặn xóa nếu còn Tài khoản kênh (`Chanel`) đang sử dụng nền tảng này, hiển thị danh sách tài khoản cần xóa trước.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung xác nhận | — | Text tĩnh | — | Hiển thị tên nền tảng sắp xóa |
| 2 | ID (ẩn) | `platform_id` | Hidden | Có | |
| 3 | Tên (ẩn) | `platform_name` | Hidden | Có | |

## Chức năng/nút thao tác
- **Delete:** gửi POST xóa bản ghi `BookingPlatform`; nếu còn tài khoản kênh liên kết, hiển thị flash lỗi kèm danh sách tài khoản thay vì xóa.
- **Cancel:** đóng modal, không xóa.

## Điều hướng
- Mở từ: BU-022 (tab Nền tảng đặt phòng) — icon Xóa trên từng dòng.
- Sau khi submit: ở lại BU-022 (tab `platforms`).
