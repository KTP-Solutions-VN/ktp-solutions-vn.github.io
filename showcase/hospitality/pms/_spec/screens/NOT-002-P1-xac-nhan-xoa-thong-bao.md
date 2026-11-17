# NOT-002-P1 — Xác nhận xóa thông báo

**Loại:** Popup (mở từ NOT-002)

**Route:** Modal tĩnh trong `notice_list.ctp`; hành động xóa gọi `NoticeController::delete($id)` qua `GET /notice/delete/:id` (base64 id) khi bấm nút xác nhận trong modal.

**Module:** NOT = Thông báo

## Mô tả ngắn gọn
Hộp thoại xác nhận trước khi xóa một thông báo/công việc khỏi hệ thống.

## Mô tả chi tiết
Không có field nhập liệu, chỉ hiển thị thông điệp xác nhận (`delete_confirm_help_text_notice`).

## Chức năng/nút thao tác
- **Lưu/Xác nhận (Save):** điều hướng trình duyệt tới `notice/delete/:id`, xóa bản ghi `NoticeBoard` và các `NoticeBoardDetail` liên quan, hiển thị flash message, quay lại trang trước.
- **Hủy (Cancel):** đóng modal.

## Điều hướng
- Mở từ: NOT-002 (Danh sách thông báo).
- Sau khi xác nhận: reload/redirect về trang gọi (`referer`), thường là NOT-002.
