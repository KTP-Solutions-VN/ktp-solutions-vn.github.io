# BOOK-101-P1 — Chi tiết nhân viên villa (Staff Detail)

**Loại:** Popup/trang phụ (mở từ BOOK-101)

**Route:** Booking/staffDetail (mặc định: `/booking/staff-detail?booking_id=...&clean_id=...&makeup_id=...&villa_id=...`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php

**Module:** Đặt phòng

## Mô tả ngắn gọn

Hiển thị thông tin nhân viên phụ trách trả phòng, dọn dẹp (cleaning) và dọn giường/vệ sinh bổ sung (makeup) của một villa: ai làm, thời gian, vị trí bắt đầu/kết thúc và khoảng cách tới villa. Truy cập bằng cách bấm icon "Staff" trên dòng villa tại BOOK-101 (chỉ hiện khi villa có booking).

## Mô tả chi tiết

**Tham số đầu vào (query string, không phải form):**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Booking ID | booking_id | Query param | Có | |
| 2 | ID bản ghi dọn dẹp | clean_id | Query param | Không | "null" nếu chưa có |
| 3 | ID bản ghi makeup | makeup_id | Query param | Không | "null" nếu chưa có |
| 4 | Villa ID | villa_id | Query param | Có | |

**Nội dung hiển thị (chỉ đọc):**

| # | Khối thông tin | Nội dung | Ghi chú |
|---|---|---|---|
| 1 | Tên villa + toạ độ | villa_name, villa_detail (lat/lng) | Làm tròn 3 chữ số thập phân |
| 2 | Checkout | Tên nhân viên (emoticon - usage_name - first_name), bảng: Start/Start Location/Start Distance/End/End Location/End Distance | Nếu villa chưa checkout xong thì lấy nhân viên concierge phụ trách villa làm người hiển thị mặc định |
| 3 | Cleaning | Tên nhân viên dọn dẹp, ngày dọn, nút "Clean" (Preview) | Chỉ hiện khi `cleaning_status == 3` (đã dọn xong) |
| 4 | Makeup | Tên nhân viên makeup, ngày dọn, nút "Clean" (Preview) | Chỉ hiện khi `cleaning_status == 3` |

## Chức năng/nút thao tác

- Chỉ xem thông tin, không có form nhập liệu trên popup này.
- Nút "Clean" ở khối Cleaning → mở `/VM/villa-services/planning-teams-detail/:id/staff` (thuộc module Villa Services, ngoài phạm vi Booking).
- Nút "Clean" ở khối Makeup → mở `/VM/villa-services/makeup-teams-detail/:id/staff` (thuộc module Villa Services, ngoài phạm vi Booking).
- Icon đóng (ảnh close) → quay lại BOOK-101 (Trạng thái villa).

## Điều hướng

- Mở từ BOOK-101 (icon "Staff" trên dòng villa có booking).
- → Villa Services (planning-teams-detail / makeup-teams-detail) khi bấm nút "Clean" — ngoài phạm vi tài liệu Booking.
- Đóng popup → quay lại BOOK-101.
