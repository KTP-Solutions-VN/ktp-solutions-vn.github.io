# PROP-022 — Thông tin ngân hàng của tài sản (Property Bank Details)

**Loại:** Trang đầy đủ
**Route:** property/payment-record/:villa_id (villa_id truyền dạng base64)
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Form thêm/cập nhật thông tin tài khoản ngân hàng (Villa Bank Account) dùng để nhận thanh toán cho một Property cụ thể. Mỗi Property chỉ có 1 bản ghi tài khoản ngân hàng (nếu đã tồn tại thì submit sẽ update theo id cũ).

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Account Name | `account_name` | Text | Có (class `required`) | |
| 2 | Account Number | `account_number` | Text | Có | |
| 3 | Bank Swift | `bank_swift` | Text | Có | |
| 4 | Country | `country_id` | Select (danh sách Country) | Có | |
| 5 | Currency | `currency_id` | Select (danh sách Currency) | Có | |
| 6 | Mode of Payment | `payment_method_id` | Select (danh sách PaymentMethod) | Có | |

Giá trị mặc định của các field lấy từ bản ghi `VillaBankAccount` hiện có của `villa_id` (nếu có).

## Chức năng/nút thao tác
- Nút "Save" — lưu vào bảng `VillaBankAccount` (thêm mới hoặc update nếu đã có bản ghi theo `villa_id`); ghi Activity Log; hiển thị Flash message; redirect về `property/list/{base64(villa_id)}`.
- Nút "Cancel" — quay lại danh sách Property (`property/list`).

## Điều hướng
- Mở từ: Trang chi tiết Property (Property list/identification — ngoài phạm vi mã hiện tại).
- Điều hướng tới: `property/list/{villa_id}` sau khi lưu thành công hoặc khi bấm Cancel.
- Popup con: Không có.
