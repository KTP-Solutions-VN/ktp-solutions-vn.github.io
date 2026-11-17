# OWN-008-P1 — Thêm chi tiết thanh toán chủ sở hữu

**Loại:** Popup (mở từ OWN-008)

**Route:** `/Owner/addPaymentDetail/{owner_id}` (controller `Owner`, action `addPaymentDetail($owner_id)`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Form thêm mới một tài khoản/chi tiết thanh toán (ngân hàng) cho một chủ sở hữu cụ thể. Mở từ nút "+ Payment Details" trên màn hình OWN-008 (Danh sách thanh toán của chủ sở hữu).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Phương thức thanh toán | `payment_method_id` | Select | Có | Nếu chọn phương thức id=1, hiện thêm field "Tên ngân hàng" (`bank_name`, Text, bắt buộc) bằng JS |
| 2 | Swift Code | `bank_swift` | Text | Có | |
| 3 | Quốc gia | `country_id` | Select | Có | |
| 4 | Tiền tệ | `currency_id` | Select | Có | |
| 5 | Tên tài khoản | `account_name` | Text | Có | |
| 6 | Số tài khoản | `account_number` | Text | Có | |
| 7 | Chứng từ | `document` | File (ảnh/PDF) | Không | Tối đa 1MB, chỉ nhận JPG/JPEG/PNG/PDF; click vào khung ảnh để chọn file |
| 8 | Ưu tiên (Preference) | `payment_type` | Checkbox nhóm (Primary/Secondary), chỉ chọn 1 | Có | Chọn 1 trong 2 (`prefered`/`other`), JS tự bỏ chọn cái còn lại |

## Chức năng/nút thao tác

- **Save**: lưu bản ghi `OwnerBankAccount` mới cho owner; nếu đã có bản ghi cùng `payment_type` (prefered/other) thì ghi đè lên bản ghi đó; ghi log hoạt động; sau khi lưu chuyển hướng tới OWN-008 (`payment/{owner_id}`).
- **Cancel**: quay lại OWN-001 (Danh sách chủ sở hữu).

## Điều hướng

- Mở từ: OWN-008 (nút "+ Payment Details").
- Sau khi lưu thành công hoặc thất bại: quay về OWN-008 — Danh sách thanh toán của chủ sở hữu.
