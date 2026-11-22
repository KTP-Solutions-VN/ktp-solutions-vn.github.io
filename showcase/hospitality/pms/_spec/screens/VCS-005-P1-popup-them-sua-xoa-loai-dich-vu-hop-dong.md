# VCS-005-P1 — Form gói dịch vụ (Service Bundle Form)

**Loại:** Popup/Modal (mở từ VCS-005)
**Route:** Không có route riêng — dùng chung form POST về `villa-common-setting/contract-service-types` (hidden `action`=`add`/`edit`/`delete`); kiểm tra trùng tổ hợp dịch vụ qua AJAX `villa-common-setting/check-contract-servicetype`
**Module:** VCS = Thuộc tính tài sản

## Mô tả ngắn gọn
Modal Bootstrap dùng chung (`#exampleModal`) cho 3 kịch bản Thêm/Sửa/Xóa. Thay vì nhập tên, người dùng chọn 1 hoặc nhiều Dịch vụ (Service) qua checkbox — tên loại dịch vụ hợp đồng được hệ thống tự sinh từ danh sách dịch vụ đã chọn. Ở chế độ Xóa, phần nhập liệu bị ẩn.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Service Type (danh sách chọn) | `services[]` (id `services-<id>`) | Checkbox list (nguồn: toàn bộ `Service`) | Có (tối thiểu 1) | Thông báo lỗi "You must check at least 1 box" |
| 2 | Name (ẩn, tự sinh) | `name` | Hidden | — | Server tự ghép từ tên các Service đã chọn |
| 3 | Data (ẩn) | `data` | Hidden (JSON các id đã check) | — | Dùng để remote-check trùng tổ hợp dịch vụ qua `checkContractServicetype` |
| 4 | Action (ẩn) | `action` | Hidden (`add`/`edit`/`delete`) | Có | Điều khiển hành vi submit |
| 5 | Id (ẩn) | `id` | Hidden | Điều kiện | Bắt buộc khi sửa/xóa |

## Chức năng/nút thao tác
- Nút "Save"/"Update"/"Delete" (`#submit_button`) — nhãn đổi theo action.
- Nút "Cancel" — đóng modal, không lưu.
- Khi tick/bỏ tick checkbox, JS đồng bộ danh sách id đã chọn vào field ẩn `data` (dùng cho remote validate).
- Validate: bắt buộc chọn ít nhất 1 Service; kiểm tra tổ hợp dịch vụ đã tồn tại qua remote AJAX `checkContractServicetype`.

## Điều hướng
- Mở từ: VCS-005 (nút Add new / Edit / Delete trên bảng Gói dịch vụ).
- Điều hướng tới: không chuyển trang — submit xong reload lại VCS-005 (redirect `referer()`).
