# VCS-004 — Danh sách Dịch vụ (Service)

**Loại:** Trang đầy đủ
**Route:** villa-common-setting/services (dashed mặc định: `/villa-common-setting/services`)
**Module:** VCS = Cấu hình chung villa

## Mô tả ngắn gọn
Màn hình quản lý dữ liệu chủ "Dịch vụ" (Service) — danh mục dịch vụ dùng làm thành phần cấu hình cho Loại dịch vụ hợp đồng (Contract Service Type, xem VCS-005). Hiển thị dạng bảng danh sách, cho phép Thêm/Sửa/Xóa qua 1 popup dùng chung.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | No (STT) | — | Số | Không | Sinh tự động theo vòng lặp |
| 2 | Name (Tên dịch vụ) | `name` | Text | Không (chỉ hiển thị) | |
| 3 | Created (Ngày tạo) | `created_at` | Datetime (`d M Y H:i`) | Không (chỉ hiển thị) | |
| 4 | Action | — | Nút Edit/Delete | — | Mở popup VCS-004-P1 |

Không có ô tìm kiếm/lọc riêng.

## Chức năng/nút thao tác
- Nút "Add new" (`.add_country`) → mở popup VCS-004-P1 ở chế độ Thêm mới.
- Nút Edit (icon bút, `.edit_country`) trên từng dòng → mở popup VCS-004-P1 ở chế độ Sửa.
- Nút Delete (icon thùng rác, `.delete_country`) trên từng dòng → mở popup VCS-004-P1 ở chế độ Xác nhận xóa.
- Submit form popup gửi `POST` về chính action `services`; lưu/xóa bảng `Service`, ghi Activity Log, hiển thị Flash message, redirect về trang trước.

## Điều hướng
- Mở từ: Menu Settings > "Properties" (Cấu hình chung villa) > submenu "Services".
- Điều hướng tới: không điều hướng sang trang khác.
- Popup con: VCS-004-P1 (Thêm/Sửa/Xóa Dịch vụ).
