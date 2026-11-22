# PROP-023 — Sửa bút toán phí dịch vụ (Edit Service Fee Entry)

**Loại:** Trang đầy đủ
**Route:** property/payment-record-edit/:villa_id/:payment_id (cả 2 tham số truyền dạng base64)
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Form chỉnh sửa một bản ghi thanh toán dịch vụ (Villa Payment Record) đã tồn tại của một Property — bao gồm loại dịch vụ, số tiền, khoảng thời gian áp dụng, người trả và chứng từ đính kèm.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Id (ẩn) | `id` | Hidden | — | Id bản ghi VillaPaymentRecord |
| 2 | Villa Service | `villa_services` | Select (danh sách VillaService) | Có | |
| 3 | Payment Amount | `amount` | Text | Có | |
| 4 | Payment From | `payment_from` | Text (datepicker `d F, Y`) | Có | |
| 5 | Payment To | `payment_to` | Text (datepicker `d F, Y`) | Có | |
| 6 | Payment Date | `payment_date` | Text (datepicker `d F, Y`) | Có | |
| 7 | Paid By | `paid_by` | Select (Azura / Owner) | Không | |
| 8 | Payment Details | `payment_details` | Text | Có | |
| 9 | Payment Document | `payment_document` | File upload (jpg/png/jpeg/gif/pdf) | Không | Nếu không chọn file mới, giữ nguyên file cũ; xem trước ảnh (nếu là ảnh) |

## Chức năng/nút thao tác
- Nút "Save" (`name="common_area_form"`) — chuyển đổi ngày về định dạng chuẩn, upload file chứng từ (nếu có), lưu vào `VillaPaymentRecord`; ghi Activity Log; hiển thị Flash message; redirect về `service-fee/{base64(villa_id)}`.
- Nút "Cancel" (`type=reset`) — reset form về giá trị ban đầu (không rời trang).

## Điều hướng
- Mở từ: Trang "Service Fee" của Property (ngoài phạm vi mã hiện tại) — danh sách các payment record, bấm Edit trên 1 dòng.
- Điều hướng tới: `service-fee/{villa_id}` sau khi lưu thành công.
- Popup con: Không có.
