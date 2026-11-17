# OWP-019 — Danh sách hủy đặt phòng trực tiếp

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::cancelDirectBookingList()` — không có route đẹp riêng (mặc định `/external-user/cancel-direct-booking-list`)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Danh sách các đặt phòng trực tiếp đã được duyệt (Add:Approved) của Chủ sở hữu, cho phép gửi yêu cầu huỷ một đặt phòng đã duyệt tới đơn vị quản lý.

## Mô tả chi tiết

Bộ lọc:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Biệt thự | villa | Select | Không | Lọc danh sách theo biệt thự, submit qua nút "Search" |

Danh sách — cột hiển thị:

| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | no | |
| 2 | Ngày nhận phòng | check_in_date | |
| 3 | Ngày trả phòng | check_out_date | |
| 4 | Khách | guest_first_name + guest_family_name | |
| 5 | Thao tác | — | Icon "x" → mở popup nhập lý do huỷ |

## Chức năng/nút thao tác

- Lọc theo biệt thự
- Yêu cầu huỷ đặt phòng: icon "x" → mở popup nhập "Lý do huỷ" (cancel_reason, bắt buộc) → submit gọi `cancelDirectBooking()` (đổi trạng thái đặt phòng sang Cancel:Pending, gửi email thông báo, không có view riêng) → quay lại OWP-019

## Điều hướng

- Truy cập từ OWP-017 (liên kết "Delete Booking" — hiện đang ẩn trong giao diện) hoặc menu chính
- Sau khi gửi yêu cầu huỷ → quay lại OWP-019
