# VCS-007 — Loại hình sử dụng (Usage Types)

**Loại:** Trang đầy đủ
**Route:** villa-common-setting/villa-usage (dashed mặc định CakePHP DashedRoute: `/villa-common-setting/villa-usage`)
**Module:** VCS = Thuộc tính tài sản

## Mô tả ngắn gọn
Màn hình quản lý dữ liệu chủ "Công năng sử dụng" (Usage) của villa (ví dụ: nghỉ dưỡng, cho thuê dài hạn...). Hiển thị dạng bảng danh sách, cho phép Thêm/Sửa/Xóa qua 1 popup dùng chung. Cấu trúc và hành vi giống hệt VCS-001 (Danh mục tiện nghi), khác model dữ liệu.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | No (STT) | — | Số | Không | Sinh tự động theo vòng lặp |
| 2 | Name (Tên công năng) | `name` | Text | Không (chỉ hiển thị) | Lấy từ bảng `Uzage`, sắp xếp theo tên |
| 3 | Created (Ngày tạo) | `created_at` | Datetime (`d M Y H:i`) | Không (chỉ hiển thị) | |
| 4 | Action | — | Nút Edit/Delete | — | Mở popup VCS-007-P1 |

Không có ô tìm kiếm/lọc riêng (DataTable client-side `#zero_config`).

## Chức năng/nút thao tác
- Nút "Add new" (`.add_villa_usage`) → mở popup VCS-007-P1 ở chế độ Thêm mới.
- Icon Edit (`.edit_villa_usage`) trên từng dòng → mở popup VCS-007-P1 ở chế độ Sửa.
- Icon Delete (`.delete_villa_usage`) trên từng dòng → mở popup VCS-007-P1 ở chế độ Xác nhận xóa (ẩn phần nhập liệu).
- Submit form popup gửi `POST` về chính action `villaUsage` với `action=add|edit|delete`; controller `VillaCommonSettingController::villaUsage()` lưu/xóa bảng `Uzage`, ghi Activity Log, hiển thị Flash message, redirect `referer()`.

## Điều hướng
- Mở từ: Menu Portfolio Setup > "Property Attributes" > submenu "Usage Types".
- Điều hướng tới: không điều hướng sang trang khác (thao tác CRUD tại chỗ qua popup + reload).
- Popup con: VCS-007-P1 (Form loại hình sử dụng).
