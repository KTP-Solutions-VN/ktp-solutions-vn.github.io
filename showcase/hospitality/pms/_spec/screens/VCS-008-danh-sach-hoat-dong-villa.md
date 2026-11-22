# VCS-008 — Hoạt động cho khách (Guest Activities)

**Loại:** Trang đầy đủ
**Route:** villa-common-setting/villa-activity (dashed mặc định CakePHP DashedRoute: `/villa-common-setting/villa-activity`)
**Module:** VCS = Thuộc tính tài sản

## Mô tả ngắn gọn
Màn hình quản lý dữ liệu chủ "Hoạt động" (Activity) mà villa có thể cung cấp cho khách (ví dụ: yoga, câu cá...). Hiển thị dạng bảng danh sách, cho phép Thêm/Sửa/Xóa qua 1 popup dùng chung. Cấu trúc và hành vi giống hệt VCS-001 (Danh mục tiện nghi), khác model dữ liệu.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | No (STT) | — | Số | Không | Sinh tự động theo vòng lặp |
| 2 | Name (Tên hoạt động) | `name` | Text | Không (chỉ hiển thị) | Lấy từ bảng `Activity`, sắp xếp theo tên |
| 3 | Created (Ngày tạo) | `created_at` | Datetime (`d M Y H:i`) | Không (chỉ hiển thị) | |
| 4 | Action | — | Nút Edit/Delete | — | Mở popup VCS-008-P1 |

Không có ô tìm kiếm/lọc riêng (DataTable client-side `#zero_config`).

## Chức năng/nút thao tác
- Nút "Add new" (`.add_villa_activity`) → mở popup VCS-008-P1 ở chế độ Thêm mới.
- Icon Edit (`.edit_villa_activity`) trên từng dòng → mở popup VCS-008-P1 ở chế độ Sửa.
- Icon Delete (`.delete_villa_activity`) trên từng dòng → mở popup VCS-008-P1 ở chế độ Xác nhận xóa (ẩn phần nhập liệu).
- Submit form popup gửi `POST` về chính action `villaActivity` với `action=add|edit|delete`; controller `VillaCommonSettingController::villaActivity()` lưu/xóa bảng `Activity`, ghi Activity Log, hiển thị Flash message, redirect `referer()`.

## Điều hướng
- Mở từ: Menu Portfolio Setup > "Property Attributes" > submenu "Guest Activities".
- Điều hướng tới: không điều hướng sang trang khác (thao tác CRUD tại chỗ qua popup + reload).
- Popup con: VCS-008-P1 (Form hoạt động cho khách).
