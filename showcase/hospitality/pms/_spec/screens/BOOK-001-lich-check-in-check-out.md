# BOOK-001 — Lịch check-in / check-out
**Loại:** Trang đầy đủ
**Route:** Booking/list (mặc định: `/booking/list`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Màn hình trang chủ/dashboard của module đặt phòng, hiển thị hai bảng theo ngày: danh sách khách **check-out** trong ngày (dải màu đỏ) và danh sách khách **check-in** trong ngày (dải màu xanh lá), nhóm theo Business Unit/Zone. Cho phép điều hướng nhanh giữa các ngày, lọc theo đơn vị kinh doanh, loại dịch vụ, lịch làm việc cá nhân của concierge, và thao tác nhanh (gán concierge, đặt giờ check-in/check-out, ghi chú, duyệt yêu cầu khách).

## Mô tả chi tiết

### Bộ lọc/điều khiển phía trên
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh (Business Unit/Zone) | `business_unit_id` | Select (select2) | Không | Danh sách gồm "All" + các business unit/zone mà user có quyền truy cập (lấy qua `_getAuthBasedBuVilla`) |
| 2 | Chế độ hiển thị booking | `show_bookings` | Select | Không | `all_bookings` (Tất cả) / `concierge_service_only` (Chỉ dịch vụ Concierge). Chỉ hiện với Superadmin/Admin/BU Manager/Planner |
| 3 | Lịch của tôi | `schedule` | Select | Không | `everyone` (Mọi người) / `my_schedule` (Lịch của tôi). Chỉ hiện với vai trò Concierge (không phải Planner) |
| 4 | Hiển thị concierge | `show_concierge` | Select | Không | `concierge_only` (Chỉ concierge) / `all_bu_team` (Toàn bộ team BU). Chỉ hiện với Superadmin/Admin/BU Manager/Planner |
| 5 | Sắp xếp theo | `sort_by` | Select | Không | `property` (Theo villa) / `time` (Theo giờ check-in/out) |
| 6 | Điều hướng ngày check-out | `check-out-left/right`, `check-out-pick-left/right` | Nút mũi tên + Datepicker (ẩn, ngày dạng d/m/Y) | Không | Lùi/tiến 1 ngày hoặc chọn nhanh ngày check-out cần xem |
| 7 | Điều hướng ngày check-in | `check-in-left/right`, `check-in-pick-left/right` | Nút mũi tên + Datepicker (ẩn, ngày dạng Y-m-d) | Không | Lùi/tiến 1 ngày hoặc chọn nhanh ngày check-in cần xem |

### Cột hiển thị — Bảng CHECK-OUT (nhóm theo villa/business unit, tiêu đề nhóm hiển thị tên nhóm)
- Villa (tên villa, icon nhà)
- Booking Grade (VIP)
- Red Box (icon cảnh báo nếu villa được đánh dấu "is_red_box")
- Tên khách (Guest Name)
- Quốc tịch (icon cờ)
- Số đêm ở (Nights)
- Kênh đặt phòng/OTA (Referer)
- Giờ check-out (có thể bấm để đặt giờ nếu chưa có `set_time`; màu xanh nếu đã có giờ do khách yêu cầu được duyệt)
- Concierge phụ trách (emoticon người phụ trách hoặc icon "ghost" nếu chưa gán; icon vương miện nếu là chủ villa)
- Ghi chú (Remark) — có thể chỉnh sửa; icon dấu X đỏ nếu chưa có ghi chú
- Trạng thái duyệt yêu cầu khách (icon in/out mũi tên cam nếu có yêu cầu chưa duyệt, xanh dương nếu đã duyệt, xám nếu hoàn tất)

### Cột hiển thị — Bảng CHECK-IN (cấu trúc tương tự bảng check-out)
- Villa (nền xanh nhạt nếu quy trình check-in đã hoàn tất "done")
- Booking Grade, Red Box, Tên khách, Quốc tịch, Số đêm, Kênh đặt (OTA)
- Giờ check-in (màu xanh lá nếu đã hoàn tất đúng giờ, đỏ nếu trễ giờ dự kiến; kèm icon hình thức đến: sân bay/tại villa)
- Concierge phụ trách, Ghi chú, Trạng thái duyệt yêu cầu khách

## Chức năng/nút thao tác
- Chọn Business Unit/Zone để lọc toàn bộ danh sách (AJAX reload)
- Chuyển đổi hiển thị "Tất cả booking" / "Chỉ dịch vụ Concierge"
- Chuyển đổi "Mọi người" / "Lịch của tôi" (my_schedule) — dành cho Concierge
- Chuyển đổi "Chỉ concierge" / "Toàn bộ team BU"
- Sắp xếp theo villa hoặc theo giờ
- Điều hướng lùi/tiến ngày hoặc chọn ngày cụ thể cho từng bảng (check-in/check-out) — tải lại dữ liệu bằng AJAX
- Đặt/chỉnh giờ check-in, check-out trực tiếp trên bảng (click vào ô giờ)
- Gán/đổi concierge phụ trách cho villa (click vào icon concierge, popup chọn — modal `#exampleModal2` liên quan xóa booking, và các popup khác cho gán concierge)
- Thêm/sửa ghi chú (remark) nhanh trên từng dòng
- Duyệt yêu cầu thời gian đến/đi của khách (guest_approval)
- Popup "Guest Airport Transfer" (`#guest_time_popup`) hiển thị thông tin đưa đón sân bay
- Popup thêm/sửa/xoá Business Unit (`#exampleModal`) và popup xoá booking (`#exampleModal2`)

## Điều hướng
- Mở từ: Menu chính module Đặt phòng (mục "In & Out" / Lịch check-in check-out)
- Điều hướng tới: Click vào tên khách/villa có thể mở BOOK-009 (Chi tiết đặt phòng) hoặc BOOK-013 (Tiến trình check-in) tùy luồng thao tác
- Popup con: popup gán concierge, popup ghi chú, popup xác nhận xóa booking, popup thông tin đưa đón sân bay (đều là modal nội bộ trong cùng trang, không phải action riêng)
