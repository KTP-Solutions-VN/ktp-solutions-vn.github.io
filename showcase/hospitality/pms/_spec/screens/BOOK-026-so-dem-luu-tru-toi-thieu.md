# BOOK-026 — Số đêm tối thiểu (Minimum Nights)
**Loại:** Trang đầy đủ
**Route:** booking/minimum (base path `/VM` xuất hiện trong các lời gọi AJAX của ứng dụng)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Màn hình cho phép người quản lý xem và cập nhật nhanh số đêm lưu trú tối thiểu (minimum stay) áp dụng cho từng villa, lọc theo Business Unit/khu vực (Zone).

## Mô tả chi tiết
**Bộ lọc phía trên:**
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit / Khu vực | `business_unit_id` | Select2 (dropdown) | Không | Mặc định "All"; khi đổi giá trị form tự submit lại để load danh sách villa tương ứng (hỗ trợ cả Zone gộp nhiều BU) |

**Bảng danh sách villa (chỉnh sửa trực tiếp trên dòng — inline edit):**
| Cột | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|
| Property (Villa) | `name` (readonly), `id_<i>` (hidden) | Text hiển thị | Tên villa, không cho sửa |
| Minimum Stay | `minimum_stay_<i>` | Input text/number | Giá trị hiện tại của villa; nếu villa chưa cấu hình sẽ hiển thị "To Fill" và dòng được tô màu cam cảnh báo |

## Chức năng/nút thao tác
- Đổi Business Unit/Zone → tự động tải lại danh sách villa theo phạm vi được chọn.
- Sửa trực tiếp giá trị "Minimum Stay" trên từng dòng villa.
- Nút "Update" (`#confirm_send`): gửi toàn bộ thay đổi (AJAX tới `saveMinimumStay`) và hiển thị thông báo thành công/lỗi ngay trên trang.
- Bảng hỗ trợ DataTable (phân trang, ghi nhớ số dòng/trang qua cookie).

## Điều hướng
- Mở từ: Menu Đặt chỗ.
- Điều hướng tới: không điều hướng sang trang khác (thao tác lưu tại chỗ qua AJAX).
- Popup con: không có.
