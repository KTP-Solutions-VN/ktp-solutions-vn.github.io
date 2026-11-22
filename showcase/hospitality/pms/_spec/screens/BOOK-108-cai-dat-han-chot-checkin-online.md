# BOOK-108 — Hạn chót trước khi đến (Pre-arrival Deadlines)

**Loại:** Trang đầy đủ

**Route:** Booking/onlineCheckinDeadlineSettings

**Route đẹp:** `/booking/online-checkin/deadline-settings`

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Cấu hình các "nhóm hạn chót" (deadline rule) tính bằng số ngày trước ngày nhận phòng, và gán mỗi đơn vị kinh doanh (Business Unit) đang hoạt động vào đúng một nhóm hạn chót — dùng để xác định khi nào một lượt check-in online chưa hoàn tất sẽ được cảnh báo.

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Quốc gia | country | Dropdown (custom, không phải `<select>` chuẩn) | Không | "All countries" hoặc theo danh sách quốc gia có BU đang hoạt động; chỉ lọc hiển thị phía client |

**Mỗi "thẻ nhóm hạn chót" (rule card) gồm:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Số ngày trước ngày nhận phòng | days | Number input | Có | 0–60, không được trùng giữa các nhóm |
| 2 | Danh sách BU được gán | assignments | Multi-select dạng chip (kéo/gán qua modal) | Có | Mỗi BU chỉ thuộc đúng 1 nhóm; chọn BU ở nhóm khác sẽ tự gỡ khỏi nhóm cũ |
| 3 | Người cập nhật / thời gian | updated_by, updated_at | Hiển thị | — | |

Có khu vực "Business Units without a deadline" cảnh báo các BU chưa được gán nhóm nào, và khối xem trước (preview) minh hoạ mốc cảnh báo dựa trên một ngày nhận phòng mẫu (hôm nay + 10 ngày).

## Chức năng/nút thao tác

- "Add new Deadline": thêm một nhóm hạn chót mới (client-side, chưa lưu ngay).
- Gán/gỡ Business Unit vào từng nhóm qua modal chọn (client-side).
- "Delete deadline": xoá một nhóm hạn chót (cảnh báo nếu nhóm đang có BU được gán, yêu cầu chuyển các BU đó sang nhóm khác trước).
- "Save Changes": gửi toàn bộ `rules` + `assignments` tới AJAX `saveOnlineCheckinDeadlineSettings` (POST, dạng JSON payload); validate: số ngày duy nhất (0–60), mọi BU được phép phải được gán đủ, mỗi nhóm phải có ít nhất 1 BU. Lưu trong transaction (tạo/cập nhật bản ghi `OnlineCheckinDeadline` và bảng gán `OnlineCheckinDeadlineBusinessUnit`, xoá các nhóm không còn BU nào).
- Trạng thái "Unsaved changes" hiển thị khi có thay đổi chưa lưu.

## Điều hướng

- Vào từ menu Cài đặt (nhóm "Booking-standardTime"), gần BOOK-106, BOOK-107.
- Không điều hướng sang trang khác; toàn bộ thao tác xử lý bằng AJAX ngay tại trang (breadcrumb trỏ về BOOK-002 danh sách đặt phòng).
