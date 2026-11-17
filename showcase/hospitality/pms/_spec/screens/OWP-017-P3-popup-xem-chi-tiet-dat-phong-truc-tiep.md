# OWP-017-P3 — Popup Xem chi tiết đặt phòng trực tiếp

**Loại:** Popup (mở từ OWP-017)

**Route:** `ExternalUserController::viewDirectBooking($id)` — không có route đẹp riêng, mở từ icon mắt trên OWP-017 (mặc định `/external-user/view-direct-booking/{id_base64}`)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Xem chi tiết đầy đủ (không chỉnh sửa) của một yêu cầu đặt phòng trực tiếp: thông tin khách, thông tin đặt phòng, người yêu cầu và người xử lý.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên khách | guest_first_name | Text (hiển thị) | — | "N/A" nếu trống |
| 2 | Họ khách | guest_family_name | Text (hiển thị) | — | |
| 3 | Số điện thoại khách | guest_phone_number | Text (hiển thị) | — | |
| 4 | Email khách | guest_email | Text (hiển thị) | — | |
| 5 | Loại đặt phòng | booking_type | Text (hiển thị) | — | |
| 6 | Ngày tạo yêu cầu | created_at | Ngày (hiển thị) | — | |
| 7 | Biệt thự | villa.name | Text (hiển thị) | — | |
| 8 | Ngày nhận phòng | check_in_date | Ngày (hiển thị) | — | |
| 9 | Ngày trả phòng | check_out_date | Ngày (hiển thị) | — | |
| 10 | Số tiền đặt phòng | booking_amount | Số (hiển thị) | — | Kèm tên tiền tệ theo villa |
| 11 | Số tiền đã thanh toán | payment | Số (hiển thị) | — | |
| 12 | Người thực hiện thanh toán | paid_via | Text (hiển thị) | — | |
| 13 | Điều kiện đặc biệt | special_requirements | Text (hiển thị) | — | |
| 14 | Tổng số khách | total_guest | Số (hiển thị) | — | |
| 15 | Tổng số đêm | total_night | Số (hiển thị) | — | |
| 16 | Trạng thái | status | Text (hiển thị) | — | Bỏ tiền tố "Add:" khi hiển thị |
| 17 | Người yêu cầu | user (first_name + family_name) | Text (hiển thị) | — | |
| 18 | Người duyệt | action_by (first_name + family_name) | Text (hiển thị) | — | Chỉ hiện khi trạng thái là Add:Approved hoặc Cancel:Approved |
| 19 | Ngày duyệt | (modified date) | Ngày (hiển thị) | — | Chỉ hiện khi trạng thái là Add:Approved hoặc Cancel:Approved |

## Chức năng/nút thao tác

- Xem toàn bộ thông tin chi tiết yêu cầu đặt phòng trực tiếp (không chỉnh sửa được)

## Điều hướng

- Mở từ OWP-017 (icon mắt trên từng dòng)
- Đóng/quay lại → OWP-017
