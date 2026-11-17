# OWP-017 — Danh sách đặt phòng trực tiếp (Direct Booking Request)

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::directBookingList()` — không có route đẹp riêng (mặc định `/external-user/direct-booking-list`)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Danh sách các yêu cầu đặt phòng trực tiếp (không qua OTA) do Chủ sở hữu gửi tới đơn vị quản lý, gồm 2 nhóm: đang chờ xử lý (Pending) và đã xử lý (Approved/Rejected).

## Mô tả chi tiết

Bộ lọc:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Biệt thự | villa | Select2 | Không | Có tuỳ chọn "Tất cả" |

Danh sách — cột hiển thị (cả 2 bảng: đang chờ và đã xử lý):

| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | no | |
| 2 | Biệt thự | villa | |
| 3 | Ngày nhận phòng | check_in_date | |
| 4 | Ngày trả phòng | check_out_date | |
| 5 | Người yêu cầu | requested_by (user) | |
| 6 | Ngày yêu cầu | on (created_at) | |
| 7 | Trạng thái | status | Add:Pending / Cancel:Pending / Add:Approved / Add:Rejected / Cancel:Approved / Cancel:Rejected |
| 8 | Người xử lý | processed_by (action_by) | |
| 9 | Thao tác | — | Xem, Sửa (chỉ với mục đang chờ) |

## Chức năng/nút thao tác

- Yêu cầu đặt phòng mới (nút "Request New Booking" → mở OWP-017-P1)
- Xem chi tiết yêu cầu (icon mắt → OWP-017-P3)
- Sửa yêu cầu đang chờ (icon bút → OWP-017-P2)
- Lọc theo biệt thự

## Điều hướng

- Truy cập từ menu chính (Direct Booking)
- Nút "Request New Booking" → OWP-017-P1 (popup thêm đặt phòng trực tiếp)
- Icon xem → OWP-017-P3 (popup xem chi tiết)
- Icon sửa → OWP-017-P2 (popup sửa đặt phòng trực tiếp)
