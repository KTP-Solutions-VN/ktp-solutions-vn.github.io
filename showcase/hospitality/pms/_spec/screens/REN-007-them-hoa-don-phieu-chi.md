# REN-007 — Thêm hóa đơn hoặc biên nhận (Add Invoice or Receipt)

**Loại:** Trang đầy đủ
**Route:** renovation/addNewReceipt/:renovation_id + route đẹp dạng dashed: renovation/add-new-receipt/:renovation_id (id truyền base64)
**Module:** REN = Nâng cấp tài sản

## Mô tả ngắn gọn
Form tạo một phiếu chi mới cho dự án cải tạo: tải lên file PDF hóa đơn, phân bổ số tiền thực chi cho từng hạng mục đã khai báo (hoặc thêm hạng mục phát sinh mới), chọn người trả tiền và hình thức thanh toán. Hệ thống tự sinh tên file hóa đơn theo villa + số thứ tự, cập nhật `real_amount` của các hạng mục liên quan và ghi các bút toán thu/chi tương ứng vào sổ quỹ (REN-005).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | File hóa đơn | `receipt_name` | Upload file (chỉ PDF) | Không | Tự đặt tên `<Villa>-Renovation-<ymd>-<STT>.pdf` |
| 2 | Hạng mục & số tiền chi | `item[<key>][name]`, `item[<key>][amount]` | Bảng: tên hạng mục (có sẵn, readonly) + số tiền (nhập) | Có (số tiền) | Có thể thêm dòng hạng mục phát sinh mới (nhập tên) |
| 3 | Tổng tiền | `total_amount` | Text, readonly, tự tính | — | Tổng các `item[].amount` |
| 4 | Người trả tiền | `payment_by` | Select2 (danh sách user) | Không | |
| 5 | Hình thức chi trả | `paid_type` | Radio: advanced by staff / paid by company | Có | Quyết định cách ghi sổ quỹ |
| 6 | Phương thức thanh toán | `payment_method` | Select2 (`PaymentMethod`) | Điều kiện | Chỉ áp dụng khi `paid_type = paid by company` |

## Chức năng/nút thao tác
- **+ Thêm hạng mục**: thêm dòng hạng mục phát sinh mới vào bảng.
- **Save**: upload file hóa đơn, lưu `RenovationReceipt` (kèm `renovation_items` serialize), cộng dồn `real_amount` vào từng `RenovationItem` tương ứng, và ghi bút toán vào `RenovationPayment`:
  - Nếu "Advanced by staff": ghi 1 dòng debit (nhân viên ứng trước).
  - Nếu "Paid by company": ghi 2 dòng — debit "Supplier" theo phương thức thanh toán và credit "Company".

## Điều hướng
- Vào từ: nút "+ Thêm hóa đơn mới" tại REN-003 — Tiến trình dự án.
- Đi tới: sau khi lưu thành công, quay về REN-003 — Tiến trình dự án.
