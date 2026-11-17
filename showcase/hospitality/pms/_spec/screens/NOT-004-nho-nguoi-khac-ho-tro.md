# NOT-004 — Nhờ người khác hỗ trợ (Help Other User)

**Loại:** Trang đầy đủ

**Route:** `NoticeController::helpOtheruser($id)` — mặc định `/notice/help-otheruser/:id`

**Module:** NOT = Thông báo

## Mô tả ngắn gọn
Cho phép người nhận một công việc chuyển tiếp/nhờ một nhân sự khác cùng hỗ trợ xử lý công việc đó (thêm một `NoticeBoardDetail` mới gắn với cùng `NoticeBoard`).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nội dung công việc | `notice` | Textarea | Có | Giá trị mặc định lấy từ công việc gốc |
| 2 | Phòng ban | `department_id` | Radio (danh sách Employee Role, đã loại bỏ 4 role id 14-17) | Có | Thay đổi sẽ load lại người nhận qua AJAX `/notice/getHelpOtherUsers` |
| 3 | Đơn vị kinh doanh | `business_units[]` | Checkbox nhiều lựa chọn | Có | Kết hợp với phòng ban để lọc người nhận |
| 4 | Người được nhờ hỗ trợ | `received_by` | Select2 (danh sách User) | Có | Loại trừ chính người dùng hiện tại và người gửi ban đầu |

## Chức năng/nút thao tác
- **Gửi (Send):** tạo thêm bản ghi `NoticeBoardDetail` (và cập nhật `NoticeBoard` trạng thái pending), chuyển hướng về NOT-002.
- **Hủy (Cancel):** quay lại NOT-002.

## Điều hướng
- Mở từ: NOT-003 (Chi tiết thông báo) — liên kết "Get Help" (hiện đã comment trong code, chỉ còn truy cập qua route trực tiếp).
- Sau khi gửi/hủy: chuyển tới NOT-002 (Danh sách thông báo).
