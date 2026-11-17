# VCS-001 — Danh sách Vật dụng (Item)

**Loại:** Trang đầy đủ
**Route:** villa-common-setting/items (dashed mặc định CakePHP DashedRoute: `/villa-common-setting/items`)
**Module:** VCS = Cấu hình chung villa

## Mô tả ngắn gọn
Màn hình quản lý dữ liệu chủ "Vật dụng" (Item) — danh mục dùng để gắn vào Kho vật dụng (Inventory) của villa. Hiển thị dạng bảng danh sách, cho phép Thêm/Sửa/Xóa qua 1 popup dùng chung.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | No (STT) | — | Số | Không | Sinh tự động theo vòng lặp |
| 2 | Name (Tên vật dụng) | `name` | Text | Không (chỉ hiển thị) | Lấy từ bảng `Item` |
| 3 | Created (Ngày tạo) | `created_at` | Datetime (`d M Y H:i`) | Không (chỉ hiển thị) | |
| 4 | Action | — | Nút Edit/Delete | — | Mở popup VCS-001-P1 |

Không có ô tìm kiếm/lọc riêng (DataTable client-side `#zero_config`).

## Chức năng/nút thao tác
- Nút "Add new" (`.add_item`) → mở popup VCS-001-P1 ở chế độ Thêm mới.
- Nút Edit (icon bút, `.edit_item`) trên từng dòng → mở popup VCS-001-P1 ở chế độ Sửa, đổ dữ liệu qua `data_id`/`data_name`.
- Nút Delete (icon thùng rác, `.delete_item`) trên từng dòng → mở popup VCS-001-P1 ở chế độ Xác nhận xóa (ẩn phần nhập liệu).
- Submit form popup gửi `POST` về chính action `items` với `action=add|edit|delete`; controller `VillaCommonSettingController::items()` lưu/xóa bảng `Item`, ghi Activity Log, hiển thị Flash message, sau đó redirect về trang trước (`referer()`).

## Điều hướng
- Mở từ: Menu Settings > "Inventories" (Kho vật dụng) > submenu "Items".
- Điều hướng tới: không điều hướng sang trang khác (thao tác CRUD tại chỗ qua popup + reload).
- Popup con: VCS-001-P1 (Thêm/Sửa/Xóa Vật dụng).
