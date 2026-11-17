# VCS-006 — Danh sách Nhà cung cấp dịch vụ (Service Providers)

**Loại:** Trang đầy đủ
**Route:** villa-common-setting/service-providers/:tab (dashed mặc định CakePHP DashedRoute: `/villa-common-setting/service-providers`, tham số `tab` mặc định `service-providers`)
**Module:** VCS = Cấu hình chung villa

## Mô tả ngắn gọn
Màn hình quản lý danh mục "Nhà cung cấp dịch vụ" (Service Provider) gắn với các Loại dịch vụ (Villa Services) và Business Unit. Trang có 2 tab: "Service Providers" (danh sách nhà cung cấp) và "Services" (danh sách loại dịch vụ villa, chỉ Superadmin thấy). Thêm/Sửa/Xóa qua popup.

## Mô tả chi tiết
### Tab "Service Providers" (mặc định)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Filter Business Unit | `business_unit` | Select2 | Không | Lọc danh sách theo BU đang chọn; đổi giá trị → load lại bảng qua AJAX, lưu cookie business unit |
| Cột bảng | No | — | Số | — | STT |
| Cột bảng | Service (Loại dịch vụ) | — | Text | — | Ghép tên các `provider_service` mà nhà cung cấp đang gắn |
| Cột bảng | Name (Tên nhà cung cấp) | `name` | Text | — | |
| Cột bảng | Business Units | — | Text | — | Danh sách tên BU đã gán |
| Cột bảng | Created On | `created_at` | Datetime | — | |
| Cột bảng | By | — | Text | — | Người tạo (`created_user.usage_name`) |
| Cột bảng | Actions | — | Nút Edit/Delete | — | Mở popup VCS-006-P1 |

### Tab "Services" (chỉ hiển thị khi user là Superadmin)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nút "+ Add new" | — | Button | — | Mở popup VCS-006-P2 |
| Cột bảng | No | — | Số | — | STT |
| Cột bảng | Name (Tên loại dịch vụ) | `name` | Text | — | Từ bảng `ProviderService` |
| Cột bảng | Created On | `created_at` | Datetime | — | |

Cả 2 bảng dùng DataTable client-side (`#zero_config1` cho Service Providers, `#zero_config` cho Services), không có ô search riêng.

## Chức năng/nút thao tác
- Chuyển tab "Service Providers" / "Services" (Bootstrap nav-tabs, giữ trạng thái qua tham số `tab` trên URL).
- Select "Business Unit" (tab Service Providers) → lọc lại danh sách theo BU, lưu cookie qua `_setBusinessUnitCookie`.
- Nút "+ Add new" (tab Service Providers, `.add_provider`) → mở popup VCS-006-P1 ở chế độ Thêm mới.
- Icon Edit (`.edit_provider`) → mở popup VCS-006-P1 ở chế độ Sửa, đổ toàn bộ dữ liệu (tên, loại dịch vụ, business units, liên hệ, nhãn tuỳ chỉnh...).
- Icon Delete (`.delete_provider`) → mở popup VCS-006-P1 ở chế độ Xác nhận xóa (ẩn phần nhập liệu).
- Nút "+ Add new" (tab Services, `.add_service`) → mở popup VCS-006-P2.
- Submit form popup provider gửi `POST` về chính action `serviceProviders` với `action=add|edit|delete`; controller lưu/xóa bảng `ServiceProvider` (đồng bộ nhiều dòng theo từng `villa_services_id` đã chọn — so sánh id cũ/mới để thêm/sửa/xóa), ghi Activity Log, Flash message, redirect `referer()`.
- Submit form popup service gửi `POST` với `action=add_service` (giá trị khác `add/edit/delete`) → controller lưu bảng `ProviderService`.

## Điều hướng
- Mở từ: Menu "Users" > "Service Providers".
- Điều hướng tới: không điều hướng sang trang khác (CRUD tại chỗ qua popup + reload).
- Popup con: VCS-006-P1 (Thêm/Sửa/Xóa Nhà cung cấp dịch vụ), VCS-006-P2 (Thêm Loại dịch vụ villa).
