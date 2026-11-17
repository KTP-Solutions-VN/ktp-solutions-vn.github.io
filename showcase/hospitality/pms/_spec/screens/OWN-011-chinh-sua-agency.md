# OWN-011 — Chỉnh sửa Agency

**Loại:** Trang đầy đủ

**Route:** `/Owner/editAgency/{tab}/{id}/{show_page}/{payment_detail_id}` (controller `Owner`, action `editAgency($tab, $id, $show_page, $payment_detail_id)`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Form chỉnh sửa thông tin một Agency đã tồn tại, gồm 2 tab: "Agency Details" (thông tin đại lý — các field giống OWN-010) và "Payment Details" (danh sách/thêm/sửa chi tiết thanh toán ngân hàng của Agency, quản lý ngay trong tab này qua tham số `show_page`: `agencyList` = xem danh sách, `agency`/`edit` = form thêm/sửa một chi tiết thanh toán).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên Agency | `agency_name` | Text | Có | |
| 2 | Tên viết tắt | `short_name` | Text | Có | |
| 3 | Trạng thái | `status` | Radio (Active/Inactive) | Có | |
| 4 | Ngày bắt đầu | `start_date` | Datepicker | Có | |
| 5 | Quốc gia | `country` | Select | Có | |
| 6 | Logo | `logo` / `cropped_image` | File ảnh (crop 1:1) | Không | |
| 7 | Email | `email` | Text (email) | Có | |
| 8 | Website | `website` | Text | Có | |
| 9 | Số điện thoại | `phone_number` | Text | Không | |
| 10 | Business Unit | `business_units[]` | Select, nhiều dòng | Có | |
| 11 | Ngôn ngữ mặc định | `language_id` | Select | Có | |
| — | **Tab Payment Details — danh sách (`show_page=agencyList`)** | | | | Bảng: STT, Phương thức thanh toán, Tên ngân hàng, Tên tài khoản, Số tài khoản, Swift Code, Quốc gia, Tiền tệ, Ưu tiên, Chứng từ, Thao tác |
| 12 | Phương thức thanh toán | `payment_method_id` | Select | Có | trong form thêm/sửa chi tiết thanh toán |
| 13 | Tên ngân hàng | `bank_name` | Text | Có | |
| 14 | Swift Code | `bank_swift` | Text | Có | |
| 15 | Quốc gia (thanh toán) | `country_id` | Select | Có | |
| 16 | Tiền tệ | `currency_id` | Select | Có | |
| 17 | Tên tài khoản | `account_name` | Text | Có | |
| 18 | Số tài khoản | `account_number` | Text | Có | |
| 19 | Chứng từ | `document` | File (ảnh/PDF) | Không | |
| 20 | Ưu tiên | `payment_type` | Checkbox nhóm (Primary/Secondary), chọn 1 | Có | |

## Chức năng/nút thao tác

- **Save** (tab Agency Details): cập nhật `Agency`, `UserBusinessUnit`; ghi log; sau khi lưu ở lại OWN-011.
- **Save** (tab Payment Details, form thêm/sửa): lưu/cập nhật `AgencyBankAccount`; ghi log; quay về danh sách chi tiết thanh toán (`show_page=agencyList`).
- **+ Payment Details**: mở form thêm chi tiết thanh toán (ngay trong tab, không có URL/action riêng).
- **Sửa** (icon bút, từng dòng thanh toán): mở form sửa chi tiết thanh toán tương ứng.
- **Xoá** (icon thùng rác, từng dòng thanh toán): xoá chi tiết thanh toán (action `deleteAgencyPaymentDetail`, không có giao diện riêng).
- **Cancel**: quay lại OWN-009 (Danh sách Agency).

## Điều hướng

- Mở từ: OWN-009 (icon "Sửa" hoặc icon "Thanh toán" trên từng dòng).
- Không điều hướng tới màn hình con độc lập nào khác (form thêm/sửa thanh toán nằm ngay trong trang này).
- Cancel: quay về OWN-009.
