# OWN-003 — Sửa tài khoản chủ nhà (Edit Owner Account)

**Loại:** Trang đầy đủ

**Route:** `/Owner/edit/{tab}/{id}/{show_page}/{payment_detail_id}` (controller `Owner`, action `edit($tab, $id, $show_page, $payment_detail_id)`)

**Module:** Quan hệ chủ nhà (Admin)

## Mô tả ngắn gọn

Màn hình quản lý toàn diện một chủ sở hữu đã tồn tại, tổ chức theo dạng tab trên cùng một trang: Thông tin chủ sở hữu, Villa sở hữu, Chi tiết thanh toán (ngân hàng), Đồng sở hữu (Co-owner) và Chi tiết thanh toán của đồng sở hữu. Tham số `$tab` trên URL quyết định tab nào được kích hoạt khi tải trang; `$show_page` (list/add/edit) quyết định hiển thị danh sách hay form thêm/sửa trong tab thanh toán.

## Mô tả chi tiết

### Tab "Owner Details" (`owner-details`)

Giống hệt bộ field của OWN-002 (Thêm tài khoản chủ nhà), nhưng có sẵn dữ liệu để chỉnh sửa và ẩn field "Gửi email mật khẩu".

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên | `first_name` | Text | Có | |
| 2 | Họ | `family_name` | Text | Có | |
| 3 | Quốc tịch | `nationality` | Select2 | Có | |
| 4 | Email | `email` | Text (email) | Có | |
| 5 | Tên đăng nhập | `username` | Text | Có | |
| 6 | Mật khẩu | `password` | Password | Có | Hiển thị mật khẩu hiện tại đã giải mã |
| 7 | Số điện thoại | `phone_number` | Text | Không | |
| 8 | Trạng thái | `status` | Select | Có | |
| 9 | Loại | `company_name` | Radio | Có | |
| 10 | Vai trò | `role` | Radio | Có | |
| 11 | Phân quyền module | `user_role[]` | Checkbox | Điều kiện | |
| 12 | Business Unit | `business_units[]` | Select2 (nhiều dòng) | Có | |
| 13 | Ngôn ngữ | `language_id` | Select | Có | |
| 14 | Cổng truy cập | `access_portal[]` | Checkbox | Có | |
| 15 | Ảnh đại diện | `upload` | File ảnh | Không | |
| 16 | Thêm đồng sở hữu | nút "Add Co-owner" | Button | — | Sinh thêm form đồng sở hữu động |

### Tab "Properties" (`owner-properties`)

Danh sách villa thuộc sở hữu, dạng thẻ (card), không phải bảng.

| # | Tên cột | Field code | Loại dữ liệu | Ghi chú |
|---|---|---|---|---|
| 1 | Ảnh villa | `villa_image` | Ảnh | Ảnh mặt tiền, mặc định no-image |
| 2 | Tên villa | `name` | Text (link) | Nếu villa đang mở (`status = Open`) thì bấm vào mở trang chi tiết villa (tab mới); nếu đóng thì không click được |

### Tab "Payment Details" (`payment-details`, dùng chung element cho cả chủ sở hữu chính)

- Chế độ danh sách (`show_page=list`): bảng các tài khoản ngân hàng của chủ sở hữu.

| # | Tên cột | Field code | Loại dữ liệu | Ghi chú |
|---|---|---|---|---|
| 1 | STT | — | Số | |
| 2 | Phương thức thanh toán | `payment_method_id` | Text (map từ danh mục) | |
| 3 | Tên ngân hàng | `bank_name` | Text | |
| 4 | Tên tài khoản | `account_name` | Text | |
| 5 | Số tài khoản | `account_number` | Text | |
| 6 | Swift Code | `bank_swift` | Text | |
| 7 | Quốc gia | `country_id` | Text (map) | |
| 8 | Tiền tệ | `currency_id` | Text (map) | |
| 9 | Ưu tiên thanh toán | `payment_type` | Text (Primary/Secondary) | |
| 10 | Chứng từ | `document` | Link xem file | |
| 11 | Thao tác | — | Sửa / Xoá | |

- Chế độ thêm/sửa (`show_page=add|edit`): form nhập chi tiết thanh toán.

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại thanh toán | `payment_method_id` | Select | Có | |
| 2 | Tên ngân hàng | `bank_name` | Text | Có | |
| 3 | Swift Code | `bank_swift` | Text | Có | |
| 4 | Quốc gia | `country_id` | Select | Có | |
| 5 | Tiền tệ | `currency_id` | Select | Có | |
| 6 | Tên tài khoản | `account_name` | Text | Có | |
| 7 | Số tài khoản | `account_number` | Text | Có | |
| 8 | Chứng từ đính kèm | `document` | File (ảnh/PDF) | Không | Tối đa 5MB |
| 9 | Ưu tiên | `payment_type` | Checkbox (Primary/Secondary) | Có | |

### Tab "Co-owner" (mỗi đồng sở hữu một form riêng, động theo số lượng)

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên | `first_name` | Text | Có | |
| 2 | Họ | `family_name` | Text | Có | |
| 3 | Email | `email` | Text (email) | Có | |
| 4 | Ngôn ngữ | `language_id` | Select | Có | |

### Tab "Co-owner Payment Details" (`co-owner-payment-details-{n}`)

Cấu trúc field giống hệt tab "Payment Details" của chủ sở hữu chính (list/add/edit), áp dụng cho từng đồng sở hữu.

## Chức năng/nút thao tác

- **Save** (mỗi tab có nút Save riêng): lưu dữ liệu tab tương ứng, ghi log hoạt động, chuyển hướng lại vào đúng tab vừa lưu.
- **Cancel**: quay về OWN-001 (Tài khoản chủ nhà).
- **+ Add Business Unit**: thêm dòng chọn business unit trong tab Owner Details.
- **+ Add Co-owner**: thêm form đồng sở hữu mới (tab Owner Details).
- **+ Payment Details / Edit / Delete** (trong tab Payment Details và Co-owner Payment Details): chuyển giữa danh sách và form thêm/sửa của cùng màn hình (qua tham số `show_page`).

## Điều hướng

- Mở từ: OWN-001 (icon nhà/dollar/bút trên từng dòng), OWN-002 (sau khi thêm mới thành công).
- Không có popup con tách biệt — mọi thao tác con (thêm/sửa villa, thêm/sửa thanh toán, thêm/sửa đồng sở hữu) đều nằm trong cùng một trang thông qua tham số tab/show_page.
- Cancel: quay về OWN-001.
