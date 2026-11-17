# VCS-002-P1 — Popup Thêm/Sửa/Xóa Hạng mục giá

**Loại:** Popup/Modal (mở từ VCS-002)
**Route:** Không có route riêng — dùng chung form POST về `villa-common-setting/price-categories` (hidden `action`=`add`/`edit`/`delete`); kiểm tra trùng tên qua AJAX `villa-common-setting/checkpricecategory`
**Module:** VCS = Cấu hình chung villa

## Mô tả ngắn gọn
Modal Bootstrap dùng chung (`#exampleModal`) cho 3 kịch bản Thêm/Sửa/Xóa Hạng mục giá, gồm 2 field nhập liệu Tên và Mô tả. Ở chế độ Xóa, phần nhập liệu bị ẩn.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Price Category Name | `name` | Text | Có | Validate required + remote trùng tên qua `checkpricecategory` |
| 2 | Price Category Description | `description` | Text | Có | Validate required |
| 3 | Action (ẩn) | `action` | Hidden (`add`/`edit`/`delete`) | Có | Điều khiển hành vi submit |
| 4 | Id (ẩn) | `id` | Hidden | Điều kiện | Bắt buộc khi sửa/xóa |

## Chức năng/nút thao tác
- Nút "Save"/"Update"/"Delete" (`#submit_button`) — nhãn đổi theo action.
- Nút "Cancel" — đóng modal, không lưu.
- Validate: `name` và `description` bắt buộc, `name` kiểm tra trùng qua remote AJAX `checkpricecategory`.

## Điều hướng
- Mở từ: VCS-002 (nút Add new / Edit / Delete trên bảng danh sách Hạng mục giá).
- Điều hướng tới: không chuyển trang — submit xong reload lại VCS-002 (redirect `referer()`).
