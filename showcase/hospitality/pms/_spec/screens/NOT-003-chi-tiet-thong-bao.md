# NOT-003 — Xem thông báo (Announcement View)

**Loại:** Trang đầy đủ

**Route:** `NoticeController::viewDetail($id)` — mặc định `/notice/view-detail/:id`

**Module:** NOT = Thông báo nội bộ

## Mô tả ngắn gọn
Xem chi tiết đầy đủ của một thông báo/công việc: người gửi, người nhận, nội dung, ngày gửi, trạng thái, hạn hoàn thành (tô đỏ nếu quá hạn), ngày hoàn thành.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Người gửi | `send_array` (usage_name/first+family name) | Text (chỉ đọc) | — | Có thêm tiền tố module nếu `data_array.module` khác rỗng |
| 2 | Người nhận | `recieve_array` | Text (chỉ đọc) | — | |
| 3 | Nội dung công việc | `data_array.notice` | Text (chỉ đọc) | — | Lấy tên GardenService nếu không phải "other" |
| 4 | Ngày gửi | `data_array.created_at` | Text (chỉ đọc, d M y H:i) | — | |
| 5 | Trạng thái | tính toán theo `status`, `sent_by`, `received_by`, `user_type` | Text (chỉ đọc) | — | Hiển thị "Acknowledged"/"Done" tùy vai trò người xem |
| 6 | Hạn hoàn thành | `data_array.deadline` | Text (chỉ đọc, màu đỏ nếu quá hạn) | — | |
| 7 | Ngày hoàn thành | `data_array.update_at` | Text (chỉ đọc) | — | Chỉ hiện khi status = done/is_clap |

## Chức năng/nút thao tác
- **Đóng/Quay lại danh sách (Close notice):** quay lại NOT-002.
- **Xóa thông báo:** (đoạn code hiện bị comment, không hoạt động trên UI hiện tại) mở popup NOT-003-P1 xác nhận trước khi gọi `notice/delete/:id`.
- (Đã comment, không còn active trên UI): Reminder, Done notice, Get Help — các link cũ trỏ sang `remindernotice`, `statusUser`, `helpOtheruser`.

## Điều hướng
- Mở từ: NOT-002 (Thông báo & công việc) khi xem chi tiết một dòng.
- Điều hướng đến: NOT-002 (khi bấm Close), NOT-003-P1 (khi bấm Delete).
