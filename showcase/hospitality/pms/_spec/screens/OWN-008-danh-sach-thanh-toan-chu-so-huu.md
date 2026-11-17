# OWN-008 — Danh sách chi tiết thanh toán của chủ sở hữu

**Loại:** Trang đầy đủ

**Route:** `/Owner/payment/{owner_id}` (controller `Owner`, action `payment($owner_id)`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Màn hình liệt kê các tài khoản/chi tiết thanh toán (ngân hàng) đã khai báo cho một chủ sở hữu cụ thể. Đây là luồng CRUD thanh toán độc lập (song song với tab "Payment Details" nhúng trong OWN-003) — hiện chỉ là điểm đến sau khi thêm/sửa/xoá chi tiết thanh toán qua các action `addPaymentDetail`/`editPaymentDetail`/`deletePaymentDetail`; trong mã nguồn hiện tại không tìm thấy liên kết trực tiếp nào dẫn vào màn hình này từ OWN-001/OWN-003.

## Mô tả chi tiết

| # | Tên cột | Field code | Loại dữ liệu | Ghi chú |
|---|---|---|---|---|
| 1 | STT | — | Số | |
| 2 | Phương thức thanh toán | `payment_method_id` | Text (map danh mục) | |
| 3 | Tên ngân hàng | `bank_name` | Text | |
| 4 | Tên tài khoản | `account_name` | Text | |
| 5 | Số tài khoản | `account_number` | Text | |
| 6 | Swift Code | `bank_swift` | Text | |
| 7 | Quốc gia | `country_id` | Text (map) | |
| 8 | Tiền tệ | `currency_id` | Text (map) | |
| 9 | Chứng từ | `document` | Link xem file | |
| 10 | Thao tác | — | Sửa / Xoá | |

## Chức năng/nút thao tác

- **+ Payment Details**: mở OWN-008-P1 (Thêm chi tiết thanh toán).
- **Sửa** (icon bút, từng dòng): mở OWN-008-P2 (Chỉnh sửa chi tiết thanh toán).
- **Xoá** (icon thùng rác, từng dòng): xoá chi tiết thanh toán (action `deletePaymentDetail`, không có giao diện riêng).

## Điều hướng

- Đi tới:
  - OWN-008-P1 — Thêm chi tiết thanh toán chủ sở hữu
  - OWN-008-P2 — Chỉnh sửa chi tiết thanh toán chủ sở hữu
- Ghi chú: hiện chưa xác định được điểm vào (entry point) trực tiếp từ giao diện Admin OwnerController; cần rà soát thêm với đội phát triển để xác nhận đây là luồng còn dùng hay đã được thay thế bởi tab "Payment Details" của OWN-003.
