# SET-002-P2 — Sửa URL Owner Hub (Edit Owner Hub URL)

**Loại:** Popup (mở từ SET-002, tab Owner Hub URL)

**Route:** Modal Bootstrap `#editModal` trong element `technical-settings/owner_portal_url.ctp`; lấy dữ liệu qua AJAX GET `SettingController::getEditOwnerPortalUrl($id)` (`/setting/get-edit-owner-portal-url/:id`); submit AJAX POST tới `SettingController::generalSettings()` (`tab=owner-portal-url`, kèm `id`); kiểm tra trùng URL qua `checkOwnerPortalUrlDuplicate()` — `/setting/check-owner-portal-url-duplicate`.

**Module:** SET = Cài đặt nền tảng

## Mô tả ngắn gọn
Popup sửa thông tin một Owner Hub URL đã có (tiêu đề, URL, phạm vi áp dụng theo Quốc gia/Vùng/Business Unit). Với bản ghi URL mặc định (`is_default = 1`), chỉ cho sửa URL — Title bị khoá (readonly) và không hiển thị phần chọn Vùng/Business Unit vì URL mặc định áp dụng tự động cho mọi vùng chưa bị URL khác nhận.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text | Có | Readonly nếu là URL mặc định (`is_default=1`) |
| 2 | Owner Hub URL | `url` | URL | Có | Validate định dạng URL hợp lệ; kiểm tra trùng qua AJAX `checkOwnerPortalUrlDuplicate` (loại trừ chính bản ghi đang sửa) |
| 3 | Vùng áp dụng | `region_ids[]` | Checkbox nhiều lựa chọn, nhóm theo Quốc gia | Có (nếu không phải URL mặc định) | Ẩn toàn bộ khối này nếu là URL mặc định; các Vùng đã gán cho URL này được tick sẵn |
| 4 | Business Unit áp dụng | `business_unit_ids[]` | Checkbox nhiều lựa chọn trong panel con của từng Vùng đã chọn | Có (nếu không phải URL mặc định) | BU thuộc chính URL này luôn bật + tick sẵn; BU đã gán cho URL khác bị disable + đánh dấu "Already assigned to another URL" |
| 5 | Select all available / Clear | — | Nút thao tác nhanh | — | Chỉ áp dụng cho vùng/BU chưa bị khoá |

Dữ liệu nạp vào form khi mở popup (qua `getEditOwnerPortalUrl`): `id`, `title`, `url`, `is_default`, `region_ids` (vùng hiện đang gán), `business_unit_ids` (BU hiện đang gán), `other_assigned_business_unit_ids` (BU đã bị URL khác chiếm, để disable).

## Chức năng/nút thao tác
- **Save:** gửi AJAX cập nhật `OwnerPortalUrl` + ghi lại toàn bộ `OwnerPortalUrlAccess` (xoá cũ, tạo lại theo lựa chọn mới) nếu không phải URL mặc định; đóng modal và reload trang khi thành công.
- **Cancel:** đóng modal, reset toàn bộ lựa chọn.

## Điều hướng
- Mở từ: SET-002 (tab Owner Hub URL) — icon "Sửa" (bút chì) trên từng dòng URL.
- Sau khi lưu: reload lại SET-002 (tab Owner Hub URL), dữ liệu dòng URL cập nhật.
