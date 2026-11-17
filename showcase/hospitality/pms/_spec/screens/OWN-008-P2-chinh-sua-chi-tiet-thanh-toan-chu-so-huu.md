# OWN-008-P2 — Chỉnh sửa chi tiết thanh toán chủ sở hữu

**Loại:** Popup (mở từ OWN-008)

**Route:** `/Owner/editPaymentDetail/{id}` (controller `Owner`, action `editPaymentDetail($id)`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Form chỉnh sửa một tài khoản/chi tiết thanh toán (ngân hàng) đã có của chủ sở hữu. Mở từ icon "Sửa" (bút) trên từng dòng của màn hình OWN-008.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Phương thức thanh toán | `payment_method_id` | Select | Có | Giá trị hiện tại được chọn sẵn |
| 2 | Tên ngân hàng | `bank_name` | Text | Có (nếu payment_method_id = 1) | Chỉ hiện khi phương thức id=1 |
| 3 | Swift Code | `bank_swift` | Text | Có | |
| 4 | Quốc gia | `country_id` | Select | Có | |
| 5 | Tiền tệ | `currency_id` | Select | Có | |
| 6 | Tên tài khoản | `account_name` | Text | Có | |
| 7 | Số tài khoản | `account_number` | Text | Có | |
| 8 | Chứng từ | `document` | File (ảnh/PDF) | Không | Hiển thị file đã upload trước đó (ảnh hoặc link "View PDF"); tối đa 1MB |
| 9 | Ưu tiên (Preference) | `payment_type` | Checkbox nhóm (Primary/Secondary), chỉ chọn 1 | Có | Giá trị hiện tại được chọn sẵn |

## Chức năng/nút thao tác

- **Save**: cập nhật bản ghi `OwnerBankAccount`; nếu đổi `payment_type` thì bản ghi cùng loại còn lại của owner sẽ tự chuyển sang loại đối lập; ghi log hoạt động; sau khi lưu chuyển hướng tới OWN-008 (`payment/{owner_id}`).
- **Cancel**: quay lại OWN-001 (Danh sách chủ sở hữu).

## Điều hướng

- Mở từ: OWN-008 (icon "Sửa" trên từng dòng chi tiết thanh toán).
- Sau khi lưu thành công hoặc thất bại: quay về OWN-008 — Danh sách thanh toán của chủ sở hữu.
