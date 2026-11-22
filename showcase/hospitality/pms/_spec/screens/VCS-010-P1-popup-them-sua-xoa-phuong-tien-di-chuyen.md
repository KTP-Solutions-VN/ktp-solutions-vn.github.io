# VCS-010-P1 — Form phương án di chuyển (Transport Option Form)

**Loại:** Popup/Modal (mở từ VCS-010)
**Route:** Không có route riêng — dùng chung form POST về `villa-common-setting/villa-transport` (hidden `action`=`add`/`edit`/`delete`); kiểm tra trùng tên qua AJAX `villa-common-setting/checkVillaTransport`
**Module:** VCS = Thuộc tính tài sản

## Mô tả ngắn gọn
Modal Bootstrap dùng chung (`#exampleModal`) cho 3 kịch bản Thêm/Sửa/Xóa Phương tiện di chuyển. Ở chế độ Xóa, phần nhập liệu bị ẩn.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Transport Name | `name` | Text | Có | Validate required + remote trùng tên qua `checkVillaTransport` (khi sửa gửi kèm `id` để loại trừ chính nó) |
| 2 | Action (ẩn) | `action` | Hidden (`add`/`edit`/`delete`) | Có | Điều khiển hành vi submit |
| 3 | Id (ẩn) | `id` | Hidden | Điều kiện | Bắt buộc khi sửa/xóa |

## Chức năng/nút thao tác
- Nút "Save"/"Update"/"Delete" (`#submit_button`) — nhãn đổi theo action; chỉ submit khi jQuery Validate hợp lệ.
- Nút "Cancel" (`#cancel_button`) — đóng modal, không lưu.
- Validate: `name` bắt buộc, kiểm tra trùng tên qua remote AJAX `checkVillaTransport`.

## Điều hướng
- Mở từ: VCS-010 (nút Add new / Edit / Delete trên bảng Phương án di chuyển).
- Điều hướng tới: không chuyển trang — submit xong reload lại VCS-010 (redirect `referer()`).
