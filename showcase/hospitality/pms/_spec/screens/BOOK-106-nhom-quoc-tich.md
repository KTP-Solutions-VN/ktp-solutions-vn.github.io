# BOOK-106 — Nguồn gốc khách (Guest Origins)

**Loại:** Trang đầy đủ

**Route:** Booking/nationalities (mặc định: `/booking/nationalities`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php

**Module:** Đặt chỗ

## Mô tả ngắn gọn

Quản lý các "nhóm quốc tịch" (mega-nationality group) — gom nhiều quốc tịch khách vào một nhóm chung kèm ghi chú hành vi/ứng xử kinh doanh — theo khu vực địa lý (quốc gia) của đơn vị kinh doanh. Dùng để phân loại khách theo vùng miền phục vụ mục đích vận hành/marketing.

## Mô tả chi tiết

**Bộ lọc:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Quốc gia | country_id (country_filter) | Select | Không | Danh sách cố định theo thứ tự Singapore, Greece, France; mặc định theo quốc gia của user |

**Danh sách nhóm quốc tịch (thẻ/card):**

| # | Trường hiển thị | Field code | Ghi chú |
|---|---|---|---|
| 1 | Tên nhóm | name | |
| 2 | Danh sách quốc tịch trong nhóm | nationality_ids | Hiển thị dạng tag |
| 3 | Nút Sửa | — | Mở form bên phải, điền sẵn dữ liệu |
| 4 | Nút Xoá | — | Xoá nhóm |

**Form thêm/sửa nhóm (panel bên phải):**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên nhóm | name | Text | Có | |
| 2 | Danh sách quốc tịch | nationality_ids | Select2 multiple | Có | Nguồn: danh sách quốc gia có khách đặt phòng trong 1 năm gần nhất (từ `guest_details`, đã lọc bỏ các quốc tịch đã được gán vào nhóm khác) |
| 3 | Ghi chú hành vi kinh doanh | behaviour | Textarea | Có | |
| 4 | ID (ẩn, khi sửa) | id | Hidden | — | |

**Khối "Unassigned Nationalities":** liệt kê các quốc tịch chưa được gán vào nhóm nào.

## Chức năng/nút thao tác

- "New Group": mở form trống bên phải để tạo nhóm mới.
- Icon Sửa trên từng nhóm: điền dữ liệu vào form bên phải để chỉnh sửa (qua modal `#exampleModal`).
- Icon Xoá trên từng nhóm: xoá nhóm (submit action=delete).
- "Save" (groupBtn): lưu nhóm mới hoặc cập nhật nhóm (submit action=add/edit qua form `group_form`).
- "Cancel": huỷ thao tác đang chỉnh sửa.
- Đổi Quốc gia + "Load": lọc lại danh sách nhóm theo quốc gia đã chọn.
- Với Superadmin: xem được nhóm của tất cả quốc gia; user thường chỉ xem nhóm theo quốc gia của đơn vị kinh doanh mình.

## Điều hướng

- Vào từ menu Cài đặt (Booking-standardTime group) trong sidebar quản lý.
- Không điều hướng sang màn hình khác; toàn bộ thao tác thực hiện tại chỗ (submit form/redirect về chính trang này).
