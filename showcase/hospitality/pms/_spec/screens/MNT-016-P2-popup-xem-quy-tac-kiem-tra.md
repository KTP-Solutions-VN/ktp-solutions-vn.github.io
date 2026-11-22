# MNT-016-P2 — Chi tiết SLA kiểm tra (Inspection SLA Details)

**Loại:** Popup (mở từ MNT-016)
**Route:** maintenance/viewInspection/:id (id base64)
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Trang xem chi tiết (readonly) một bộ quy tắc thời gian kiểm tra villa theo đơn vị kinh doanh.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Ghi chú |
|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Text readonly | |
| 2 | Danh sách villa thuộc BU | `properties` | Text readonly | |
| 3 | New — số ngày trưởng thành | `new_meturity_days` | Text readonly | |
| 4 | Seen — số ngày trưởng thành | `seen_meturity_days` | Text readonly | |
| 5 | OK — số ngày trưởng thành | `ok_meturity_days` | Text readonly | |

## Chức năng/nút thao tác
- Chỉ xem, không có thao tác chỉnh sửa.

## Điều hướng
- Vào từ: icon Xem trên MNT-016 — SLA kiểm tra.
- Đi tới: có thể có liên kết sang MNT-016-P1 (Sửa).
