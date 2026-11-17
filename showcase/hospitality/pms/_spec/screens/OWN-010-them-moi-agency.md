# OWN-010 — Thêm mới Agency

**Loại:** Trang đầy đủ

**Route:** `/Owner/agency` (controller `Owner`, action `agency($tab = null, $agency_id = null, $show_page = null, $payment_detail_id = null)`, khi không truyền `agency_id`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Form tạo mới một Agency (đại lý) trong hệ thống, gồm 2 tab: "Agency Details" (thông tin đại lý) và "Payment Details" (chi tiết thanh toán — chỉ dùng được sau khi đã lưu tab đầu, vì cần `agency_id`). Cùng action còn xử lý chỉnh sửa khi có `agency_id` (xem OWN-011), nhưng theo route mặc định (không tham số) đây là màn hình thêm mới.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tên Agency | `agency_name` | Text | Có | tối thiểu 2 ký tự |
| 2 | Tên viết tắt | `short_name` | Text | Có | tối thiểu 2 ký tự |
| 3 | Trạng thái | `status` | Radio (Active/Inactive) | Có | |
| 4 | Ngày bắt đầu | `start_date` | Datepicker (dd-mm-yyyy) | Có | |
| 5 | Quốc gia | `country` | Select | Có | |
| 6 | Logo | `logo` / `cropped_image` | File ảnh (crop tự động tỉ lệ 1:1) | Không | Tối đa 1MB |
| 7 | Email | `email` | Text (email) | Có | |
| 8 | Website | `website` | Text | Có | |
| 9 | Số điện thoại | `phone_number` | Text | Không | |
| 10 | Business Unit | `business_units[]` | Select, có thể thêm nhiều dòng (nút "+ Add Business Unit") | Có | |
| 11 | Ngôn ngữ mặc định | `language_id` | Select | Có | |

## Chức năng/nút thao tác

- **Save** (tab Agency Details): lưu bản ghi `Agency`, `UserBusinessUnit`; ghi log hoạt động; sau khi lưu chuyển sang OWN-011 (Chỉnh sửa Agency) ở tab "agency_payment_details", `show_page=agencyList`.
- **Cancel**: quay lại OWN-009 (Danh sách Agency).
- Tab "Payment Details": chưa dùng được ở màn hình Thêm mới (cần `agency_id`, chỉ hoạt động sau khi đã lưu và chuyển sang OWN-011).

## Điều hướng

- Mở từ: OWN-009 (nút "+ Add New").
- Sau khi lưu thành công: chuyển tới OWN-011 — Chỉnh sửa Agency (tab Payment Details).
- Cancel: quay về OWN-009.
