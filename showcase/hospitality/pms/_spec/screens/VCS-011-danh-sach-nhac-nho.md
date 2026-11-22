# VCS-011 — Nhắc việc cho nhân viên (Staff Reminders)

**Loại:** Trang đầy đủ
**Route:** villa-common-setting/reminders (dashed mặc định CakePHP DashedRoute: `/villa-common-setting/reminders`)
**Module:** VCS = Thuộc tính tài sản

## Mô tả ngắn gọn
Màn hình quản lý dữ liệu chủ "Nhắc nhở" (Reminder) hiển thị cho concierge/khách trong quy trình vận hành villa. Ngoài Thêm/Sửa/Xóa qua popup dùng chung như các danh mục khác, màn hình còn hỗ trợ sắp xếp thứ tự hiển thị (kéo lên/xuống) qua AJAX.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | No (STT) | — | Số | Không | Sinh tự động theo vòng lặp |
| 2 | Name (Nội dung nhắc nhở) | `name` | Text | Không (chỉ hiển thị) | Lấy từ bảng `Reminder`, sắp xếp theo `order_number` tăng dần |
| 3 | Created (Ngày tạo) | `created_at` | Datetime (`d M Y H:i`) | Không (chỉ hiển thị) | |
| 4 | Action | — | Nút Edit/Delete/Lên/Xuống | — | Mở popup VCS-011-P1 hoặc đổi thứ tự tại chỗ |

Không có ô tìm kiếm/lọc riêng (DataTable client-side `#zero_config`).

## Chức năng/nút thao tác
- Nút "Add new" (`.add_reminder`) → mở popup VCS-011-P1 ở chế độ Thêm mới; bản ghi mới luôn được gán `order_number` lớn nhất + 1 (thêm ở cuối danh sách).
- Icon Edit (`.edit_reminder`) trên từng dòng → mở popup VCS-011-P1 ở chế độ Sửa (chỉ sửa nội dung, không đổi thứ tự).
- Icon Delete (`.delete_reminder`) trên từng dòng → mở popup VCS-011-P1 ở chế độ Xác nhận xóa; khi xóa, controller tự động giảm `order_number` của các bản ghi phía sau đi 1 để không bị hở số thứ tự.
- Icon mũi tên Xuống (hiện với mọi dòng trừ dòng cuối) → gọi AJAX `changeReminderOrder` với `direction=down`, hoán đổi `order_number` với bản ghi kế tiếp, render lại bảng bằng JS không load lại trang.
- Icon mũi tên Lên (hiện với mọi dòng trừ dòng đầu) → gọi AJAX `changeReminderOrder` với `direction=up`, hoán đổi `order_number` với bản ghi trước đó, render lại bảng bằng JS.
- Submit form popup gửi `POST` về chính action `reminders` với `action=add|edit|delete`; controller `VillaCommonSettingController::reminders()` lưu/xóa bảng `Reminder`, ghi Activity Log, hiển thị Flash message, redirect `referer()`.

## Điều hướng
- Mở từ: Menu Portfolio Setup > "Property Attributes" > submenu "Staff Reminders".
- Điều hướng tới: không điều hướng sang trang khác (thao tác CRUD + đổi thứ tự tại chỗ qua popup/AJAX).
- Popup con: VCS-011-P1 (Form nhắc việc).
