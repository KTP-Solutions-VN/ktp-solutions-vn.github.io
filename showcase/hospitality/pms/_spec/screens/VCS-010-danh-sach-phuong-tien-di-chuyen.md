# VCS-010 — Danh sách Phương tiện di chuyển (Transport)

**Loại:** Trang đầy đủ
**Route:** villa-common-setting/villa-transport (dashed mặc định CakePHP DashedRoute: `/villa-common-setting/villa-transport`)
**Module:** VCS = Cấu hình chung villa

## Mô tả ngắn gọn
Màn hình quản lý dữ liệu chủ "Phương tiện di chuyển" liên quan tới villa (ví dụ: xe máy, ô tô, thuyền...). Hiển thị dạng bảng danh sách, cho phép Thêm/Sửa/Xóa qua 1 popup dùng chung. Cấu trúc và hành vi giống hệt VCS-001 (Vật dụng), khác model dữ liệu.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | No (STT) | — | Số | Không | Sinh tự động theo vòng lặp |
| 2 | Name (Tên phương tiện) | `name` | Text | Không (chỉ hiển thị) | Lấy từ bảng `VillaTransport`, sắp xếp theo tên |
| 3 | Created (Ngày tạo) | `created_at` | Datetime (`d M Y H:i`) | Không (chỉ hiển thị) | |
| 4 | Action | — | Nút Edit/Delete | — | Mở popup VCS-010-P1 |

Không có ô tìm kiếm/lọc riêng (DataTable client-side `#zero_config`).

## Chức năng/nút thao tác
- Nút "Add new" (`.add_villa_transport`) → mở popup VCS-010-P1 ở chế độ Thêm mới.
- Icon Edit (`.edit_villa_transport`) trên từng dòng → mở popup VCS-010-P1 ở chế độ Sửa.
- Icon Delete (`.delete_villa_transport`) trên từng dòng → mở popup VCS-010-P1 ở chế độ Xác nhận xóa (ẩn phần nhập liệu).
- Submit form popup gửi `POST` về chính action `villaTransport` với `action=add|edit|delete`; controller `VillaCommonSettingController::villaTransport()` lưu/xóa bảng `VillaTransport`, ghi Activity Log, hiển thị Flash message, redirect `referer()`.

## Điều hướng
- Mở từ: Menu Settings > "Properties" > submenu "Transport".
- Điều hướng tới: không điều hướng sang trang khác (thao tác CRUD tại chỗ qua popup + reload).
- Popup con: VCS-010-P1 (Thêm/Sửa/Xóa Phương tiện di chuyển).
