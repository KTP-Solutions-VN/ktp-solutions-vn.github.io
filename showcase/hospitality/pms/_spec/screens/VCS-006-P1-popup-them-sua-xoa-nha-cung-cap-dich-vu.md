# VCS-006-P1 — Form nhà cung cấp được duyệt (Approved Vendor Form)

**Loại:** Popup/Modal (mở từ VCS-006)
**Route:** Không có route riêng — dùng chung form POST về `villa-common-setting/service-providers` (hidden `action`=`add`/`edit`/`delete`); kiểm tra trùng tên qua AJAX `villa-common-setting/check-service-provider-name` (route đẹp cấu hình riêng trong Routes.php)
**Module:** VCS = Thuộc tính tài sản

## Mô tả ngắn gọn
Modal Bootstrap (`#providerModal`) cho 3 kịch bản Thêm/Sửa/Xóa Nhà cung cấp dịch vụ, gồm thông tin liên hệ, loại dịch vụ cung cấp (mỗi loại có thể gắn nhãn hiển thị riêng) và danh sách Business Unit được phép sử dụng. Ở chế độ Xóa, phần nhập liệu bị ẩn.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Service Provider (Tên nhà cung cấp) | `name` | Text | Có | Validate required + remote trùng tên qua `checkServiceProviderName` |
| 2 | Service Type (Loại dịch vụ) | `villa_services_id[]` | Select2 multiple | Có | Danh sách `ProviderService`; chọn nhiều |
| 3 | Nhãn hiển thị theo dịch vụ | `label_name[]` | Text (động, sinh theo số lượng Service Type đã chọn) | Có (khi hiện) | Nút "Add Field" thêm dòng nhãn tương ứng từng dịch vụ đã chọn |
| 4 | Contact Person | `contact_person` | Text | Có | |
| 5 | Address | `address` | Text | Có | |
| 6 | Country | `country` | Select2 | Có | Danh sách quốc gia |
| 7 | Phone Number | `phone_number` | Text | Có | |
| 8 | Email | `email` | Text | Có | |
| 9 | Messenger | `messenger` | Text | Không | |
| 10 | Messenger ID | `messenger_id` | Text | Không | |
| 11 | Status | `status` | Select (Active/Inactive) | Có | |
| 12 | Business Units | `business_units[]` | Checkbox nhiều lựa chọn | Có (ít nhất 1) | Validate JS tùy biến: yêu cầu tick ít nhất 1 checkbox |
| 13 | Action (ẩn) | `action` | Hidden (`add`/`edit`/`delete`) | Có | |
| 14 | Id (ẩn) | `id` | Hidden | Điều kiện | Bắt buộc khi sửa/xóa |

## Chức năng/nút thao tác
- Nút "Save"/"Update"/"Delete" (`#submit_button`) — nhãn đổi theo action; chỉ submit khi jQuery Validate hợp lệ (bao gồm rule tùy biến cho checkbox Business Units).
- Nút "Cancel" — đóng modal, không lưu.
- Nút "Add Field" (`#add_labels`) — thêm 1 ô nhãn (`label_name[]`) tương ứng mỗi Service Type đang chọn (đồng bộ khi thay đổi lựa chọn Service Type).
- Khi sửa: đổ lại toàn bộ dữ liệu từ `data-*` attribute của nút Edit (tên, loại dịch vụ đã chọn, business units đã tick, nhãn dịch vụ, liên hệ...).
- Validate: các field text/select bắt buộc; `name` kiểm tra trùng qua remote AJAX `checkServiceProviderName`; `business_units` yêu cầu tick tối thiểu 1.

## Điều hướng
- Mở từ: VCS-006 (tab "Approved Vendors") — nút Add new / Edit / Delete trên bảng danh sách.
- Điều hướng tới: không chuyển trang — submit xong reload lại VCS-006 (redirect `referer()`).
