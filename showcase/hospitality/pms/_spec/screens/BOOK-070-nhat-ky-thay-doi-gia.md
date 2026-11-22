# BOOK-070 — Ghi chú thay đổi giá (Price Change Notes)

**Loại:** Trang đầy đủ
**Route:** Booking/ratesLogs (mặc định: `/booking/rates-logs`)
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Trang ghi nhận và tra cứu nhật ký các thay đổi/ghi chú liên quan đến giá villa, có thể khai báo theo 3 cấp: Villa (Property), Khu (Residence) hoặc Toà/Đơn nguyên (Unit). Hỗ trợ thêm/sửa/xoá log ngay trên trang qua popup.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select (GET) | Không | Truyền qua query string dạng base64 |
| 2 | Cấp độ khai báo | `entry_level` | Select (Property/Residence/Unit) | Không | Quyết định field lọc tiếp theo hiển thị |
| 3 | Khu (Residence) | `residence_id` | Select | Có nếu entry_level = Residence | Chỉ hiện khi chọn cấp Residence |
| 4 | Toà/Đơn nguyên (Unit) | `unit_id` | Select | Có nếu entry_level = Unit | Chỉ hiện khi chọn cấp Unit |
| 5 | Villa | `villa_id` | Select | Có nếu entry_level = Property | Chỉ hiện khi chọn cấp Property |

Mỗi lần đổi bộ lọc sẽ reload trang qua query string (`window.location`).

### Bảng danh sách log
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Date | Ngày ghi log |
| 2 | Property Unit Or Residence | Tên villa/khu/toà tương ứng |
| 3 | Action | Nội dung ghi chú (comment) |
| 4 | By | Người thực hiện (`action_by`) |
| 5 | Actions | Icon Sửa (mở popup Edit), icon Xoá (mở popup Delete) |

## Chức năng/nút thao tác
- Lọc theo Đơn vị kinh doanh / Cấp độ / Villa / Khu / Toà
- Icon **+** (góc phải bảng) — mở popup **Thêm log** (input ẩn: villa, business_unit_id, residence_id, unit_id, entry_level; textarea "Action") — submit POST về chính action `ratesLogs` với `action=Save`
- Icon **Sửa** trên từng dòng — mở lại popup, prefill nội dung comment — submit với `action=Edit`
- Icon **Xoá** trên từng dòng — mở popup xác nhận xoá — submit với `action=delete`

Popup thêm/sửa/xoá dùng chung 1 modal (`#exampleModal1`) ngay trên trang này, không phải trang riêng.

## Điều hướng
- Mở từ: BOOK-066 (nút Logs)
- Điều hướng tới: không điều hướng sang trang khác (thao tác thêm/sửa/xoá xử lý ngay tại popup trên trang này)

## Ghi chú
Controller còn tồn tại 2 action riêng `ratesLogAdd` (BOOK-071) và `ratesLogEdit` (BOOK-072) với view dạng trang đầy đủ riêng biệt, nhưng hiện không còn được liên kết từ BOOK-070 (đã bị thay thế bởi popup thêm/sửa ngay trên trang này). Xem ghi chú tại BOOK-071/BOOK-072.
