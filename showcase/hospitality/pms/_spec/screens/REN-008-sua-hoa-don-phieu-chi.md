# REN-008 — Sửa hóa đơn/phiếu chi

**Loại:** Trang đầy đủ
**Route:** renovation/editRenovationReceipt/:id + route đẹp dạng dashed: renovation/edit-renovation-receipt/:id (id truyền base64)
**Module:** REN = Cải tạo

## Mô tả ngắn gọn
Form chỉnh sửa một phiếu chi đã lưu: cập nhật lại số tiền phân bổ cho từng hạng mục, người trả tiền và hình thức thanh toán. Khi lưu, hệ thống tính lại chênh lệch `real_amount` của từng hạng mục và ghi đè lại các bút toán sổ quỹ liên quan tới phiếu chi này.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên file hóa đơn | `receipt_name` | Text, readonly | — | Không cho đổi file sau khi tạo |
| 2 | Hạng mục & số tiền chi | `item[<key>][name]`, `item[<key>][amount]` | Bảng | Có (số tiền) | Nạp sẵn từ `RenovationReceipt.renovation_items` (đã unserialize) |
| 3 | Tổng tiền | `total_amount` | Text, readonly, tự tính | — | |
| 4 | Người trả tiền | `payment_by` | Select2 | Không | |
| 5 | Hình thức chi trả | `paid_type` | Radio: advanced by staff / paid by company | Có | |
| 6 | Phương thức thanh toán | `payment_method` | Select2 (`PaymentMethod`) | Điều kiện | Chỉ khi `paid_type = paid by company` |

## Chức năng/nút thao tác
- **Update**: gộp các hạng mục trùng tên, tính lại chênh lệch `real_amount` so với số cũ, cập nhật `RenovationItem`; xóa toàn bộ `RenovationPayment` cũ gắn với phiếu chi này rồi ghi lại theo `paid_type` mới (tương tự logic ở REN-007).

## Điều hướng
- Vào từ: icon "Sửa" tại bảng hóa đơn trong REN-003 — Theo dõi dự án cải tạo.
- Đi tới: sau khi lưu thành công, quay về REN-003 — Theo dõi dự án cải tạo.
