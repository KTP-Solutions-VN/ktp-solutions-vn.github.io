# REN-004 — Sửa dự án nâng cấp (Edit Refurbishment Project)

**Loại:** Trang đầy đủ
**Route:** renovation/edit/:renovation_id + route đẹp dạng dashed: renovation/edit/:renovation_id (id truyền base64)
**Module:** REN = Nâng cấp tài sản

## Mô tả ngắn gọn
Form chỉnh sửa thông tin khởi tạo của một dự án cải tạo: đơn vị kinh doanh, villa, tiêu đề dự án, ngày bắt đầu/hoàn thành dự kiến và danh sách hạng mục/ngân sách dự kiến. Cấu trúc field tương tự REN-001 (Tạo dự án nâng cấp) nhưng nạp sẵn dữ liệu hiện có; khi lưu sẽ xóa toàn bộ `RenovationItem` cũ và tạo lại theo danh sách mới nhập.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Không | Nạp sẵn giá trị hiện tại |
| 2 | Villa | `villa_id` | Select2 (theo BU) | Có | Nạp sẵn giá trị hiện tại |
| 3 | Tiêu đề dự án | `title` | Text | Có | |
| 4 | Ngày bắt đầu/hoàn thành dự kiến | `start_date`, `end_date` | Datepicker | Có | |
| 5 | Hạng mục | `item[]` | Text (nhiều dòng) | Có | Nạp sẵn từ `RenovationItem.item_name` |
| 6 | Ngân sách hạng mục | `budget[]` | Text số | Có | Nạp sẵn từ `RenovationItem.budget_amount` |

## Chức năng/nút thao tác
- **Save**: `leader_id` được gán lại theo user hiện tại; xóa toàn bộ `RenovationItem` cũ của dự án rồi tạo lại theo `item[]`/`budget[]` mới nhập.
- **Thêm hạng mục mới**: thêm một dòng `item[]`/`budget[]`.

## Điều hướng
- Vào từ: icon "Sửa" tại REN-002 — Theo dõi nâng cấp.
- Đi tới: sau khi lưu thành công, quay về REN-002 — Theo dõi nâng cấp.
