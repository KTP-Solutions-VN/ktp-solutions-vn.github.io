# VCS-005 — Danh sách Loại dịch vụ hợp đồng (Contract Service Type)

**Loại:** Trang đầy đủ
**Route:** villa-common-setting/contract-service-types (dashed mặc định: `/villa-common-setting/contract-service-types`)
**Module:** VCS = Cấu hình chung villa

## Mô tả ngắn gọn
Màn hình quản lý dữ liệu chủ "Loại dịch vụ hợp đồng" (Contract Service Type) — mỗi loại là một tổ hợp gồm nhiều Dịch vụ (Service, xem VCS-004) được chọn qua checkbox; tên hiển thị của loại được ghép tự động từ tên các dịch vụ đã chọn (nối bằng dấu `+`). Lưu ý: menu điều hướng tới màn hình này hiện đang bị comment/ẩn trong sidebar (`management-sidebar.ctp`), nhưng action và view vẫn hoạt động khi truy cập trực tiếp URL.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | No (STT) | — | Số | Không | Sinh tự động theo vòng lặp |
| 2 | Name (Tên loại) | `name` | Text (tự sinh) | Không (chỉ hiển thị) | Ghép từ tên các Service đã chọn, nối bằng `+` |
| 3 | Created (Ngày tạo) | `created_at` | Datetime (`d M Y H:i`) | Không (chỉ hiển thị) | |
| 4 | Action | — | Nút Edit/Delete | — | Mở popup VCS-005-P1 |

Không có ô tìm kiếm/lọc riêng.

## Chức năng/nút thao tác
- Nút "Add new" (`.add_country`) → mở popup VCS-005-P1 ở chế độ Thêm mới.
- Nút Edit (icon bút, `.edit_contract_service`) trên từng dòng → mở popup VCS-005-P1 ở chế độ Sửa, các checkbox Service tương ứng (`service_ids` giải mã từ `unserialize`) được tick sẵn.
- Nút Delete (icon thùng rác, `.delete_contract_service`) trên từng dòng → mở popup VCS-005-P1 ở chế độ Xác nhận xóa.
- Submit form popup gửi `POST` về chính action `contractServiceTypes`; controller ghép `name` từ danh sách Service đã chọn, `serialize()` mảng `service_ids` lưu vào cột `service_ids` của bảng `ContractServiceType`, ghi Activity Log, hiển thị Flash message, redirect về trang trước.

## Điều hướng
- Mở từ: Không có link trong menu hiện hành (mục menu bị comment); trước đây/hoặc truy cập trực tiếp qua URL `/villa-common-setting/contract-service-types`.
- Điều hướng tới: không điều hướng sang trang khác.
- Popup con: VCS-005-P1 (Thêm/Sửa/Xóa Loại dịch vụ hợp đồng).
