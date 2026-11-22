# BOOK-090 — Gộp hội thoại (Merge Conversation)

**Loại:** Trang đầy đủ (mở từ BOOK-089)

**Route:** Booking/linkChat/:booking_id (id được base64_encode)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Cho phép liên kết (gộp) chat của một booking mới vào một nhóm chat đang mở sẵn của booking khác (ví dụ khách đặt nối tiếp nhiều lần cùng villa/nhóm), tránh phải mở kênh chat mới. Sau khi liên kết, dữ liệu Firebase của chat cũ được copy sang booking hiện tại và chat cũ đóng lại.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngày đặt phòng | booking_date | Hiển thị | — | |
| 2 | Ngày nhận/trả phòng | check_in_date / check_out_date | Hiển thị | — | |
| 3 | Villa | villa.name | Hiển thị | — | |
| 4 | Tên khách | guest.first_name/family_name | Hiển thị | — | |
| 5 | Quốc tịch khách | guest.country | Hiển thị (nếu có) | — | |
| 6 | Trạng thái chat hiện tại | chat_status | Hiển thị | — | "To Open" nếu Off, ngược lại "Active" |
| 7 | Đơn vị kinh doanh | business_unit_id | Select | Có | Dùng để tìm villa cần liên kết |
| 8 | Villa cần liên kết | villa_id | Select | Có | Load theo BU đã chọn |
| 9 | Ngày nhận phòng cần tìm | check_in | Text (datepicker) | Có | Dùng để tìm booking đích cần liên kết |
| 10 | Kết quả tìm booking để liên kết | (khung `#link_booking`) | Bảng AJAX | — | Hiển thị danh sách booking khớp điều kiện để chọn liên kết |

## Chức năng/nút thao tác

- Nút "Retrieve and Link" (Tìm kiếm & Liên kết): gọi AJAX tìm booking phù hợp theo villa/ngày nhận phòng, hiển thị kết quả vào khung `#link_booking` để chọn.
- Chọn booking đích và xác nhận liên kết → submit form (POST) → set trạng thái chat cũ thành "Inactive", tạo bản ghi GroupChat mới với `status = Link`, copy dữ liệu Firebase (`copyFirebaseData`), đóng chat Firebase cũ (`updateFirebaseChatStatus`), hiển thị thông báo thành công/lỗi, redirect về BOOK-089.

## Điều hướng

- Mở từ BOOK-089 (nút Liên kết trên dòng có trạng thái "New").
- Sau khi liên kết thành công → quay lại BOOK-089.
- Booking sau khi liên kết có thể xem lại quan hệ liên kết tại BOOK-091 (Hội thoại đã gộp).
