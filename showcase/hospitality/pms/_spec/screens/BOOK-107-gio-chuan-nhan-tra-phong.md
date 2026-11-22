# BOOK-107 — Giờ lưu trú mặc định (Default Stay Times)

**Loại:** Trang đầy đủ

**Route:** Booking/standardTime (mặc định: `/booking/standard-time`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Cấu hình giờ nhận phòng (check-in) và trả phòng (check-out) tiêu chuẩn cho từng đơn vị kinh doanh (Business Unit).

## Mô tả chi tiết

**Danh sách:**

| # | Cột hiển thị | Field code | Ghi chú |
|---|---|---|---|
| 1 | No | — | Số thứ tự |
| 2 | Business Units | name | Tên đơn vị kinh doanh |
| 3 | Check In Time | check_in_time | Định dạng H:i A |
| 4 | Check Out Time | check_out_time | Định dạng H:i A |
| 5 | Action | — | Nút Sửa / Xoá |

Chỉ hiển thị các BU đã có `check_in_time`/`check_out_time` khác `00:00:00`.

**Form thêm/sửa (modal):**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | business_unit_id | Select | Có | Chỉ chọn được khi thêm mới; khi sửa cố định theo dòng đang sửa |
| 2 | Giờ Check In | check_in_time | Time picker | Có | |
| 3 | Giờ Check Out | check_out_time | Time picker | Có | |
| 4 | ID (ẩn, khi sửa) | id | Hidden | — | |

## Chức năng/nút thao tác

- "Add New" (modal `#exampleModal`): thêm cấu hình giờ chuẩn cho một BU (action=save mặc định).
- Icon Sửa: mở modal điền sẵn dữ liệu dòng đang chọn (action=edit).
- Icon Xoá: đặt lại `check_in_time`/`check_out_time` của BU đó về `00:00:00` (action=delete).
- Mỗi thao tác lưu/sửa/xoá đều ghi log hoạt động (Activity Log) và hiển thị flash message thành công/lỗi.

## Điều hướng

- Vào từ menu Cài đặt (nhóm "Booking-standardTime") trong sidebar quản lý, cùng nhóm với BOOK-106 và BOOK-108.
- Sau khi lưu/sửa/xoá → tải lại chính trang này (redirect referer).
