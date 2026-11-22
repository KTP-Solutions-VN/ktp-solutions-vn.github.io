# VCS-006-P2 — Form loại dịch vụ của nhà cung cấp (Vendor Service Type Form)

**Loại:** Popup/Modal (mở từ VCS-006)
**Route:** Không có route riêng — dùng chung form POST về `villa-common-setting/service-providers` (hidden `action`=`add_service`); kiểm tra trùng tên qua AJAX `villa-common-setting/check-service-name` (route đẹp cấu hình riêng trong Routes.php)
**Module:** VCS = Thuộc tính tài sản

## Mô tả ngắn gọn
Modal Bootstrap (`#serviceModel`) chỉ phục vụ Thêm mới "Loại dịch vụ" (`ProviderService`) — dữ liệu chủ dùng để gắn cho các Nhà cung cấp dịch vụ ở VCS-006. Chỉ hiển thị với user Superadmin (do tab "Services" chỉ hiện với Superadmin).

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Name (Tên loại dịch vụ) | `name` (id `service_name`) | Text | Có | Validate required + remote trùng tên qua `checkServiceName` |
| 2 | Action (ẩn) | `action` (id `service_action`) | Hidden (`add_service`) | Có | Giá trị cố định `add_service`, khác `add/edit/delete` để controller rẽ sang nhánh lưu `ProviderService` |
| 3 | Id (ẩn) | `id` (id `service_id`) | Hidden | Không dùng | Modal chỉ hỗ trợ thêm mới, không có chế độ sửa/xóa |

## Chức năng/nút thao tác
- Nút "Save" (`#submit_button1`) — submit khi hợp lệ, lưu bản ghi `ProviderService` mới.
- Nút "Cancel" — đóng modal, không lưu.
- Validate: `name` bắt buộc, kiểm tra trùng qua remote AJAX `checkServiceName`.

## Điều hướng
- Mở từ: VCS-006 (tab "Service Catalog") — nút "+ Add new".
- Điều hướng tới: không chuyển trang — submit xong reload lại VCS-006 (redirect `referer()`), Loại dịch vụ mới xuất hiện trong danh sách chọn ở VCS-006-P1.
