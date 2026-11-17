# BOOK-088 — Danh sách theo dõi (Watch List)

**Loại:** Trang đầy đủ
**Route:** Booking/watchList
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (URL dùng dạng `/booking/watch-list?business_unit=...` theo script trong view)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Danh sách các booking cần theo dõi đặc biệt dựa trên quốc tịch/số điện thoại khách (theo danh sách quốc gia được cấu hình theo dõi cho từng đơn vị kinh doanh), giúp phát hiện các booking từ nhóm khách cần chú ý (ví dụ theo mã vùng điện thoại quốc gia). Cho phép đánh dấu "đã xem" từng booking và xuất báo cáo Excel.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select | Không | Đổi giá trị sẽ tải lại trang |
| 2 | Danh sách quốc gia theo dõi | `country_name` | Multi-select | Không | Danh sách quốc gia mà booking của khách mang quốc tịch/số điện thoại tương ứng sẽ được đưa vào watch list; lưu vào bảng `CountryWatchList` theo đơn vị kinh doanh (áp dụng cho cả các BU con nếu là "zone") |

### Cột hiển thị
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Check-in | Ngày nhận phòng |
| 2 | Check-out | Ngày trả phòng |
| 3 | Property | Tên villa |
| 4 | Guest Name | Họ tên khách |
| 5 | Country | Quốc gia (suy ra từ mã vùng số điện thoại khách) |
| 6 | Group Chat | Trạng thái nhóm chat, link mở/kích hoạt chat (`activateChat`) |
| 7 | Seen By | Nếu đã được đánh dấu xem (`is_watch_list = yes`): tên người đã xem; nếu chưa: icon con mắt để đánh dấu đã xem |

Chỉ hiển thị các booking có ngày check-out từ hôm qua trở đi, chưa bị huỷ, và khách có số điện thoại khớp với mã vùng của (các) quốc gia đang theo dõi.

## Chức năng/nút thao tác
- Nút **Updated** (submit filter) — lưu lại danh sách quốc gia theo dõi cho đơn vị kinh doanh và tải lại danh sách
- Icon con mắt trên từng dòng — đánh dấu booking đã được xem (`watch_list = 1`, `watched_by` = người dùng hiện tại)
- Icon **Download** — xuất file Excel (`.xlsx`) toàn bộ danh sách hiện tại (cột: Check-In, Check-Out, Property, Guest Name, Country, Group Chat, Seen By)
- Link trạng thái **Group Chat** — mở/kích hoạt nhóm chat của booking (action `activateChat`)

## Điều hướng
- Mở từ: Menu module Đặt phòng > Watch List
- Điều hướng tới: không có trang con riêng; mở nhóm chat qua action `activateChat` (ngoài phạm vi nhóm màn hình này)
