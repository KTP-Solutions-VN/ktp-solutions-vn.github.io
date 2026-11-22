# MNT-016-P1 — Sửa SLA kiểm tra (Edit Inspection SLA)

**Loại:** Popup (mở từ MNT-016)
**Route:** maintenance/editInspection/:id (id base64)
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Trang chỉnh sửa số ngày trưởng thành (maturity days) của một bộ quy tắc kiểm tra villa theo đơn vị kinh doanh.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Text readonly | — | Hiển thị tham khảo, không đổi được |
| 2 | Danh sách villa thuộc BU | `properties` | Text readonly (danh sách) | — | Tham khảo |
| 3 | New — số ngày | `data[0][meturity]` | Text số | Không | |
| 4 | Seen — số ngày | `data[1][meturity]` | Text số | Không | |
| 5 | OK — số ngày | `data[2][meturity]` | Text số | Không | |

## Chức năng/nút thao tác
- **Save**: cập nhật `InspectionServices`, quay lại MNT-016.
- **Cancel**: quay lại MNT-016.

## Điều hướng
- Vào từ: icon Sửa trên MNT-016 — SLA kiểm tra.
- Đi tới: sau khi Save, quay về MNT-016.
