# OWN-017 — Email thông báo cho chủ nhà (Owner Email Alerts)

**Loại:** Trang đầy đủ

**Route:** `/Owner/emailAccessTemplate/{tab}/{selected_lang}` (controller `Owner`, action `emailAccessTemplate($tab, $selected_lang)`)

**Module:** Quan hệ chủ nhà (Admin)

## Mô tả ngắn gọn

Màn hình quản lý nội dung 5 mẫu email tự động gửi liên quan tới chủ sở hữu: email tạo tài khoản (sign up), email thông báo yêu cầu đặt phòng trực tiếp gửi Business Unit, email thông báo yêu cầu đặt phòng trực tiếp gửi Owner, email khi yêu cầu được duyệt, và email khi yêu cầu bị từ chối. Đây là menu cấp 1 trong Settings (mục "Email Notifications"). Mỗi tab quản lý nội dung theo từng ngôn ngữ.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Tab | `tab` (hidden) | Tab (Account Detail Email / Booking Request BU / Booking Request Owner / Booking Status Approved / Booking Status Rejected) | — | URL cập nhật theo tab đang chọn |
| 2 | Ngôn ngữ | `language_id` | Select | Có | Chọn ngôn ngữ để load lại tiêu đề + nội dung mẫu tương ứng (ajax nội bộ, không load lại trang) |
| 3 | Tiêu đề email | `title` | Text | Có | |
| 4 | Nội dung email | `content` | Rich text (TinyMCE) | Có | |

## Chức năng/nút thao tác

- **Chuyển tab**: đổi loại mẫu email đang chỉnh sửa (5 loại, mỗi loại có form Save riêng — cùng cấu trúc field như trên).
- **Đổi ngôn ngữ**: nạp lại tiêu đề/nội dung theo ngôn ngữ đã có sẵn cho loại mẫu email đang chọn (không cần submit).
- **Save** (từng tab): lưu bản ghi `EmailTemplate` tương ứng với `template_for` (`sign_up`, `direct_booking_bu_email`, `direct_booking_owner_email`, `direct_booking_approved_owner_email`, `direct_booking_rejected_owner_email`) và `language_id`.

## Điều hướng

- Mở từ: Menu Settings sidebar "Owner Email Alerts" (`active_menu` 98).
- Không điều hướng tới màn hình con khác — toàn bộ thao tác thực hiện trong cùng trang qua các tab.
