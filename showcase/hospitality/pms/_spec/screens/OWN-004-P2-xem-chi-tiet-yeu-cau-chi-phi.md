# OWN-004-P2 — Xem chi tiết yêu cầu chi phí (Claim)

**Loại:** Popup (mở từ OWN-004, mở ở tab trình duyệt mới)

**Route:** `/Owner/viewClaim/{claim_id}` (controller `Owner`, action `viewClaim($claim_id)`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Trang chi tiết (chỉ đọc) của một khoản chi phí (claim expense) được tính cho chủ sở hữu villa, hiển thị thông tin công ty con, nhà cung cấp, số tiền, tiền tệ, mô tả và hình ảnh hoá đơn đính kèm. Mở từ icon "View" trong tab Receipts của màn hình OWN-004 (mở ở tab trình duyệt mới, `target="_blank"`).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên công ty con | `company_subsidiary.short_name` | Text (readonly) | — | |
| 2 | Tên nhà cung cấp | `supplier_name` | Text (readonly) | — | |
| 3 | Số tiền | `claim_amount` | Số (readonly) | — | Định dạng 2 số thập phân |
| 4 | Tiền tệ | `currency.code` | Text (readonly) | — | |
| 5 | Mô tả | `description` | Text (readonly) | — | |
| 6 | Hình ảnh hoá đơn | `receipt_image` | Ảnh (readonly) | — | |

## Chức năng/nút thao tác

- Chỉ xem thông tin, không có nút chỉnh sửa.

## Điều hướng

- Mở từ: OWN-004 (tab Receipts, icon con mắt trên từng dòng dữ liệu) — mở tab trình duyệt mới.
- Không điều hướng tiếp tới màn hình con nào khác.
