# PROP-017 — Danh sách Property thiếu Room ID

**Loại:** Trang đầy đủ
**Route:** property/missing-roomids/:id (route mặc định dạng dashed, tham số `$id` truyền qua URL nhưng thực tế bị controller reset về rỗng rồi lấy lại từ `$_REQUEST['id']`)
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Màn hình liệt kê các Property (Villa) đang ở trạng thái "Open" nhưng chưa có `room_id_1` (chưa cấu hình mã phòng để đồng bộ OTA/Beds24), lọc theo Business Unit. Cho phép xuất danh sách ra file Excel.

## Mô tả chi tiết

### Filter
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 (dropdown, có option "All") | Không | Khi đổi giá trị, redirect `missing-roomids?id=...`; giá trị được lưu cookie `property_business_unit_id` |

### Cột hiển thị (bảng `#zero_config`)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Property | `Villa.name` | Text (link) | Không (chỉ hiển thị) | Link mở `villa/identification/{id}` ở tab mới |

Dữ liệu lấy từ `Villa` với điều kiện `status = Open` và `room_id_1 = ''`, lọc thêm theo `business_unit_id` (hoặc theo danh sách `selected_business` của user nếu chọn "All").

## Chức năng/nút thao tác
- Nút "Download List" (icon tải xuống, `name="export"`) — submit form ẩn để xuất file Excel (`.xlsx`) gồm 2 cột: Villa Name, Business Unit. File đặt tên `-MissingRoomId-{ymd}.xlsx`.
- Đổi Business Unit — tự động load lại trang theo `id` được chọn (JS `window.location.href`).

## Điều hướng
- Mở từ: Màn hình Quality (PROP-030) — nút "Room Id" ở đầu trang.
- Điều hướng tới: `villa/identification/{id}` (trang chi tiết Property, ngoài phạm vi PROP-017..031).
- Popup con: Không có.
