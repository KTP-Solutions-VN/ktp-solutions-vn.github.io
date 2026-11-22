# VCS-009 — Đặc điểm tiếp cận (Access Features)

**Loại:** Trang đầy đủ
**Route:** villa-common-setting/villa-accessible (dashed mặc định CakePHP DashedRoute: `/villa-common-setting/villa-accessible`)
**Module:** VCS = Thuộc tính tài sản

## Mô tả ngắn gọn
Màn hình quản lý dữ liệu chủ "Khả năng tiếp cận" villa (ví dụ: gần biển, xa trung tâm...). Hiển thị dạng bảng danh sách, cho phép Thêm/Sửa/Xóa qua 1 popup dùng chung. Cấu trúc và hành vi giống hệt VCS-001 (Danh mục tiện nghi), khác model dữ liệu.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | No (STT) | — | Số | Không | Sinh tự động theo vòng lặp |
| 2 | Name (Tên khả năng tiếp cận) | `name` | Text | Không (chỉ hiển thị) | Lấy từ bảng `VillaAccessible`, sắp xếp theo tên |
| 3 | Created (Ngày tạo) | `created_at` | Datetime (`d M Y H:i`) | Không (chỉ hiển thị) | |
| 4 | Action | — | Nút Edit/Delete | — | Mở popup VCS-009-P1 |

Không có ô tìm kiếm/lọc riêng (DataTable client-side `#zero_config`).

## Chức năng/nút thao tác
- Nút "Add new" (`.add_villa_accessible`) → mở popup VCS-009-P1 ở chế độ Thêm mới.
- Icon Edit (`.edit_villa_accessible`) trên từng dòng → mở popup VCS-009-P1 ở chế độ Sửa.
- Icon Delete (`.delete_villa_accessible`) trên từng dòng → mở popup VCS-009-P1 ở chế độ Xác nhận xóa (ẩn phần nhập liệu).
- Submit form popup gửi `POST` về chính action `villaAccessible` với `action=add|edit|delete`; controller `VillaCommonSettingController::villaAccessible()` lưu/xóa bảng `VillaAccessible`, ghi Activity Log, hiển thị Flash message, redirect `referer()`.

## Điều hướng
- Mở từ: Menu Portfolio Setup > "Property Attributes" > submenu "Access Features".
- Điều hướng tới: không điều hướng sang trang khác (thao tác CRUD tại chỗ qua popup + reload).
- Popup con: VCS-009-P1 (Form đặc điểm tiếp cận).
