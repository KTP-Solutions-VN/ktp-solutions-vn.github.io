# PROP-041 — Danh sách thanh toán dịch vụ/phí Property (Service Fee)

**Loại:** Trang đầy đủ
**Route:** property/service-fee/:villa_id (villa_id truyền dạng base64)
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Trang liệt kê toàn bộ bản ghi thanh toán phí dịch vụ (payment record) đã lưu cho một Property (bảng `VillaPaymentRecord`, contain `Villa`, `VillaService`), cho phép xem chứng từ thanh toán, sửa/xóa bản ghi và mở nhanh sang trang thêm bản ghi thanh toán mới hoặc trang cài đặt dịch vụ/tiện ích.

## Mô tả chi tiết

### Cột hiển thị (bảng `#zero_config`)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | STT | — | Text | — | Số thứ tự |
| 2 | Service | `villa_service.service_name` | Text | — | Tên dịch vụ (qua contain VillaService) |
| 3 | Payment | `payment_amount` | Text | — | Số tiền |
| 4 | Payment Date | `payment_date` | Text (datetime, định dạng `d, M Y h:i A`) | — | |
| 5 | Paid By | `paid_by` | Text | — | |
| 6 | From | `payment_from` | Text (datetime) | — | |
| 7 | To | `payment_to` | Text (datetime) | — | |
| 8 | Action | — | Icon-button | — | Xem chứng từ (nếu có `payment_document`), Sửa, Xóa |

## Chức năng/nút thao tác
- Nút "Add Payment Record" → mở PROP-022 (Thêm Tài khoản ngân hàng/Payment Record) tại `payment-record/{base64(villa_id)}`.
- Nút "Add Settings" (ẩn/comment trong code hiện tại) → liên kết tới `service-setting/common-area/{base64(villa_id)}`.
- Icon xem chứng từ (`fa-eye`) → mở file `/files/villas/{payment_document}` ở tab mới.
- Icon Sửa (`fa-edit`) → mở PROP-023 (Sửa bản ghi thanh toán) tại `payment-record-edit/{base64(villa_id)}/{base64(id)}`.
- Icon Xóa (`fa-trash`) → gọi `paymentRecordDelete` (AJAX xác nhận xóa).

## Điều hướng
- Mở từ: PROP-035 (Xem chi tiết Property) hoặc menu quản lý dịch vụ Property.
- Điều hướng tới: PROP-022 (Payment Record — thêm mới), PROP-023 (Payment Record Edit — sửa), file chứng từ thanh toán.
- Popup con: Không có (xóa xử lý qua confirm JS, không phải modal riêng biệt trong file này).
