# MNT-001 — Danh sách nhật ký bảo trì

**Loại:** Trang đầy đủ
**Route:** maintenance/list
**Module:** MNT = Bảo trì

## Mô tả ngắn gọn
Màn hình danh sách các nhật ký bảo trì (Maintenance log) đang mở/chờ xử lý (status Open/Pending), xem theo 4 tab: Property (theo villa), Priority (theo mức ưu tiên), Due Date (theo hạn xử lý), Areas (theo khu vực). Có form tìm kiếm nâng cao (submit POST, tab "search") lọc theo nhiều tiêu chí.

## Mô tả chi tiết

### Bộ lọc tìm kiếm (form search)
| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Khu vực | `area_id` | Select | Khi chọn sẽ tự lấy danh sách villa thuộc khu vực (ajax `getAreaVilla`) nếu chưa chọn villa cụ thể |
| 2 | Villa | `villa_id` | Select | Lọc `Maintenance.villa_id IN` |
| 3 | Danh mục | `maintenance_category_id` | Select (danh sách `MaintenanceCategory`) | Lọc `Maintenance.maintenance_category_id` |
| 4 | Người mở | `open_by` | Select (danh sách user) | Lọc `Maintenance.open_by` |
| 5 | Người đóng | `close_by` | Select (danh sách user) | Lọc `Maintenance.close_by` |
| 6 | Ngày mở | `open_date` | Text/Datepicker | Lọc theo `substr(open_date,1,10)` |

### Cột/thẻ hiển thị (mỗi tab, nhóm theo villa)
| # | Cột | Field code nguồn | Ghi chú |
|---|---|---|---|
| 1 | Villa | `villa.name` | |
| 2 | Danh mục | `maintenance_category_id` → tên category | |
| 3 | Mức ưu tiên | `MaintenancePriority.name/color` | Hiển thị badge màu theo `MaintenancePriority.color` |
| 4 | Người phụ trách | `user.emoticon`/`user_id` | Icon emoticon người xử lý; icon mặt buồn nếu chưa gán |
| 5 | Hạn xử lý | `due_date` | Định dạng `d M`; tô đỏ nếu quá hạn |
| 6 | Ngày sẵn sàng tiếp theo | `next_availability` | Tính theo lịch booking của villa (ngày trống gần nhất) |
| 7 | Khu vực (chỉ tab Areas) | `area` | Lấy qua `VillaLocation` |

## Chức năng/nút thao tác
- **4 Tab**: chuyển view client-side (dữ liệu `data_v`, `data_p`, `data_d`, `data_a` đã render sẵn theo 4 cách sắp xếp khác nhau: theo villa, theo mức ưu tiên, theo hạn, theo khu vực).
- **Tìm kiếm**: submit form POST, kết quả nhóm lại theo villa (`search_data`), hiển thị ở tab "search".
- **Thêm mới** (nút "+"): mở MNT-002 — Thêm nhật ký bảo trì.
- **Click vào một dòng/thẻ**: tùy trạng thái — mở MNT-003 (Nhận/Từ chối, nếu status Pending) hoặc MNT-004 (Cập nhật xử lý, nếu status Open/đã nhận).

## Điều hướng
- Vào từ: menu "Maintenance" trong sidebar.
- Đi tới: MNT-002 (Thêm mới), MNT-003 (Nhận việc), MNT-004 (Xử lý), MNT-005 (Xem chi tiết).
