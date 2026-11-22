# BOOK-068 — Thêm trạng thái gói giá (New Rate Plan Status)

**Loại:** Trang đầy đủ (trang con, điều hướng từ BOOK-067 — không phải popup/modal)
**Route:** Booking/ratesStatusAdd (mặc định: `/booking/rates-status-add`)
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Form thêm mới một bản ghi trạng thái giá thuê (`VillaRateStatus`) cho villa: chọn loại giá (Yearly/Monthly/Daily) và ngày áp dụng.

**Lưu ý:** nút "Add" từng dẫn tới màn hình này trên BOOK-067/các trang liên quan hiện đã bị comment (ẩn) trong toàn bộ view của module — không còn lối vào trực tiếp từ giao diện, chỉ truy cập được qua URL trực tiếp. Vẫn giữ tài liệu vì action và view thực tế còn hoạt động.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select | Có | Khi đổi sẽ load lại danh sách villa qua ajax `getBusinessUnitVilla` |
| 2 | Villa | `villa` | Select | Có | Rỗng ban đầu, chỉ có dữ liệu sau khi chọn đơn vị kinh doanh |
| 3 | Loại giá | `type` | Radio (Yearly/Monthly/Daily) | Có | Nếu chọn Daily thì ẩn 2 field "Until" và "Rent due date" |
| 4 | Đến ngày | `until` | Date picker | Có (nếu type khác Daily) | Định dạng dd-mm-yyyy |
| 5 | Ngày đến hạn thu tiền thuê | `rent_due_date` | Number | Có (nếu type khác Daily) | |

## Chức năng/nút thao tác
- **Save** — lưu bản ghi `VillaRateStatus` mới (villa_id, business_unit_id, type, until, rent_due_date), sau đó chuyển hướng về BOOK-067
- **Reset** — xoá dữ liệu đã nhập trên form

## Điều hướng
- Mở từ: BOOK-067 (nút Add — hiện đã bị ẩn trong UI)
- Điều hướng tới: quay lại BOOK-067 sau khi lưu thành công/thất bại
