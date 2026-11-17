# SET-002-P1 — Popup Thêm Owner Portal URL

**Loại:** Popup (mở từ SET-002, tab Owner Portal URL)

**Route:** Modal Bootstrap `#addUrlModal` trong element `technical-settings/owner_portal_url.ctp`; submit AJAX POST tới `SettingController::generalSettings()` (`tab=owner-portal-url`); kiểm tra trùng URL qua `checkOwnerPortalUrlDuplicate()` — `/setting/check-owner-portal-url-duplicate`.

**Module:** SET = Cài đặt hệ thống

## Mô tả ngắn gọn
Popup thêm mới một Owner Portal URL và gán phạm vi áp dụng theo Quốc gia/Vùng/Đơn vị kinh doanh (Business Unit).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text | Có | |
| 2 | Owner Portal URL | `url` | URL | Có | Validate định dạng URL hợp lệ; kiểm tra trùng qua AJAX `checkOwnerPortalUrlDuplicate` |
| 3 | Vùng áp dụng | `region_ids[]` | Checkbox nhiều lựa chọn, nhóm theo Quốc gia (Greece, France, Thailand) | Có (ít nhất 1 vùng có BU) | Vùng không có Business Unit nào sẽ bị disable |
| 4 | Business Unit áp dụng | `business_unit_ids[]` | Checkbox nhiều lựa chọn trong panel con của từng Vùng đã chọn | Có (ít nhất 1 BU/vùng) | BU đã được gán cho URL khác (không phải URL mặc định) sẽ bị disable + đánh dấu "Already assigned" |
| 5 | Select all available / Clear | — | Nút thao tác nhanh | — | |

## Chức năng/nút thao tác
- **Save:** gửi AJAX tạo `OwnerPortalUrl` mới + các bản ghi `OwnerPortalUrlAccess` (country_id, region_id, business_unit_id) tương ứng; đóng modal và reload trang khi thành công.
- **Cancel:** đóng modal.

## Điều hướng
- Mở từ: SET-002 (tab Owner Portal URL) — nút "+ ADD URL".
- Sau khi lưu: reload lại SET-002 (tab Owner Portal URL), danh sách cập nhật thêm dòng mới.
