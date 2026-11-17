# VCS-003-P1 — Popup Thêm/Sửa/Xóa Loại hình bất động sản

**Loại:** Popup/Modal (mở từ VCS-003)
**Route:** Không có route riêng — dùng chung form POST về `villa-common-setting/villa-types` (hidden `action`=`add`/`edit`/`delete`); kiểm tra trùng tên qua AJAX `villa-common-setting/checkvillatype`
**Module:** VCS = Cấu hình chung villa

## Mô tả ngắn gọn
Modal Bootstrap dùng chung (`#exampleModal`) cho 3 kịch bản Thêm/Sửa/Xóa Loại hình bất động sản, gồm Tên loại hình và Danh mục bất động sản cha. Ở chế độ Xóa, phần nhập liệu bị ẩn.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Property Type Name | `name` | Text | Có | Validate required + remote trùng tên qua `checkvillatype` |
| 2 | Property Category | `villa_categories_id` | Select (dropdown `VillaCategory`) | Có (class `required`, ràng buộc chỉ ở CSS, không thấy rule JS) | Danh sách lấy từ `VillaCategory`, sắp theo thứ tự ưu tiên Flat/House/Resort rồi alphabet |
| 3 | Action (ẩn) | `action` | Hidden (`add`/`edit`/`delete`) | Có | Điều khiển hành vi submit |
| 4 | Id (ẩn) | `id` | Hidden | Điều kiện | Bắt buộc khi sửa/xóa |

## Chức năng/nút thao tác
- Nút "Save"/"Update"/"Delete" (`#submit_button`) — nhãn đổi theo action.
- Nút "Cancel" — đóng modal, không lưu.
- Validate: `name` bắt buộc + kiểm tra trùng qua remote AJAX `checkvillatype`.

## Điều hướng
- Mở từ: VCS-003 (nút Add new / Edit / Delete trên bảng danh sách Loại hình bất động sản).
- Điều hướng tới: không chuyển trang — submit xong reload lại VCS-003 (redirect `referer()`); nếu Thêm mới thành công, hệ thống ngầm tạo dữ liệu Photo Standard Areas liên quan (không có màn hình riêng).
