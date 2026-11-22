# BOOK-101-P2 — Điều chỉnh trạng thái (Adjust Live Status)

**Loại:** Popup/trang phụ (mở từ BOOK-101)

**Route:** Booking/adjustDetail (mặc định: `/booking/adjust-detail?param=<booking_id>_<clean_id>_<makeup_id>_<villa_id>_<clean_status>_<makeup_status>_<guest_status>_<booking_id_2>_<mode>`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Popup cho phép điều chỉnh nhanh trạng thái dọn dẹp (cleaning), makeup và trạng thái khách (check-in/check-out) của một villa ngay tại màn hình BOOK-101, thay vì phải vào từng module riêng. Truy cập bằng icon "Adjust" trên dòng villa (chỉ hiện khi không đang trong trạng thái "Checking-out").

## Mô tả chi tiết

Tham số `param` được ghép chuỗi bởi 9 giá trị phân tách bằng `_`: booking_id, villasclean_id (clean_id), makeupclean_id, villaId, clean_status, makeup_status, guest_status, booking_id_2, mode.

**Các form điều chỉnh hiển thị có điều kiện:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Trạng thái khách (Check-out) | left_option_checkout | Select: Select/Early check-out/Late check-out/No show | Không | Chỉ hiện khi `guest_status` có giá trị và `mode` = 1 hoặc 3 |
| 2 | Trạng thái khách (Check-in) | left_option_checkin | Select: Select/Early check-in/Late check-in/No show | Không | Chỉ hiện khi `guest_status` có giá trị và `mode` = 2 hoặc 3 |
| 3 | Trạng thái dọn dẹp | right_option (clean_status) | Select: Clean / To be Cleaned | Không | Chỉ hiện khi `clean_status` có giá trị; mặc định theo giá trị hiện tại |
| 4 | Trạng thái makeup | makeup_option (makeup_status) | Select: Clean / To be Cleaned | Không | Chỉ hiện khi `makeup_status` có giá trị |

## Chức năng/nút thao tác

- Nút "Update" cạnh mỗi select → gửi AJAX riêng theo từng loại trạng thái:
  - Trạng thái dọn dẹp → `updateCleaningstatus` (chặn nếu chọn trùng trạng thái hiện tại, báo bằng Sweetalert).
  - Trạng thái makeup → `updateMakeupstatus` (tương tự).
  - Trạng thái khách check-in/check-out → `updateGueststatus`.
- Sau khi cập nhật trạng thái dọn dẹp/makeup thành công → chuyển hướng về BOOK-101.
- Icon đóng (ảnh close) → quay lại BOOK-101.

## Điều hướng

- Mở từ BOOK-101 (icon "Adjust" trên dòng villa, ẩn khi khách đang trong trạng thái "Checking-out").
- Sau khi lưu trạng thái dọn dẹp/makeup → tự động quay lại BOOK-101.
- Đóng popup → quay lại BOOK-101.
