# VCS-004-P1 — Form dịch vụ trong danh mục (Catalog Service Form)

**Loại:** Popup/Modal (mở từ VCS-004)
**Route:** Không có route riêng — dùng chung form POST về `villa-common-setting/services` (hidden `action`=`add`/`edit`/`delete`); kiểm tra trùng tên qua AJAX `villa-common-setting/checkservice`
**Module:** VCS = Thuộc tính tài sản

## Mô tả ngắn gọn
Modal Bootstrap dùng chung (`#exampleModal`) cho 3 kịch bản Thêm/Sửa/Xóa Dịch vụ. Ở chế độ Xóa, phần nhập liệu bị ẩn.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Service | `name` | Text | Có | Validate required + remote trùng tên qua `checkservice` |
| 2 | Action (ẩn) | `action` | Hidden (`add`/`edit`/`delete`) | Có | Điều khiển hành vi submit |
| 3 | Id (ẩn) | `id` | Hidden | Điều kiện | Bắt buộc khi sửa/xóa |

## Chức năng/nút thao tác
- Nút "Save"/"Update"/"Delete" (`#submit_button`) — nhãn đổi theo action.
- Nút "Cancel" — đóng modal, không lưu.
- Validate: `name` bắt buộc + kiểm tra trùng qua remote AJAX `checkservice`.

## Điều hướng
- Mở từ: VCS-004 (nút Add new / Edit / Delete trên bảng Danh mục dịch vụ).
- Điều hướng tới: không chuyển trang — submit xong reload lại VCS-004 (redirect `referer()`).
