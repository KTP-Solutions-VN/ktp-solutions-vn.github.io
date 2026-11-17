# VCS-007-P1 — Popup Thêm/Sửa/Xóa Công năng sử dụng

**Loại:** Popup/Modal (mở từ VCS-007)
**Route:** Không có route riêng — dùng chung form POST về `villa-common-setting/villa-usage` (hidden `action`=`add`/`edit`/`delete`); kiểm tra trùng tên qua AJAX `villa-common-setting/checkVillaUsage`
**Module:** VCS = Cấu hình chung villa

## Mô tả ngắn gọn
Modal Bootstrap dùng chung (`#exampleModal`) cho 3 kịch bản Thêm/Sửa/Xóa Công năng sử dụng villa. Ở chế độ Xóa, phần nhập liệu bị ẩn.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Property Usage Name | `name` | Text | Có | Validate required + remote trùng tên qua `checkVillaUsage` (khi sửa gửi kèm `id` để loại trừ chính nó) |
| 2 | Action (ẩn) | `action` | Hidden (`add`/`edit`/`delete`) | Có | Điều khiển hành vi submit |
| 3 | Id (ẩn) | `id` | Hidden | Điều kiện | Bắt buộc khi sửa/xóa |

## Chức năng/nút thao tác
- Nút "Save"/"Update"/"Delete" (`#submit_button`) — nhãn đổi theo action; chỉ submit khi jQuery Validate hợp lệ.
- Nút "Cancel" (`#cancel_button`) — đóng modal, không lưu.
- Validate: `name` bắt buộc, kiểm tra trùng tên qua remote AJAX `checkVillaUsage`.

## Điều hướng
- Mở từ: VCS-007 (nút Add new / Edit / Delete trên bảng danh sách Công năng sử dụng).
- Điều hướng tới: không chuyển trang — submit xong reload lại VCS-007 (redirect `referer()`).
