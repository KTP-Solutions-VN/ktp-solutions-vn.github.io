# NOT-002 — Danh sách thông báo/công việc (Notice List)

**Loại:** Trang đầy đủ

**Route:** `NoticeController::noticeList($tab, $sub_tab)` — mặc định `/notice/notice-list/:tab/:sub_tab`

**Module:** NOT = Thông báo

## Mô tả ngắn gọn
Màn hình trung tâm quản lý công việc/thông báo dạng tab: Việc của tôi (my-task), Việc đã giao (assigned-task), Việc của team (my-team-task), Nhắc nhở (reminders). Mỗi tab hiển thị 3 nhóm: đang xử lý (active), chờ xác nhận hoàn thành (review/is_clap), đã hoàn thành (completed).

## Mô tả chi tiết

Danh sách (mỗi nhóm trong tab là 1 bảng dữ liệu — DataTable):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Villa/Property | `villa_name` | Tên villa liên quan |
| 2 | Nội dung công việc | `notice` | Tên dịch vụ (GardenService.name) hoặc nội dung tự do nếu `service_category = other` |
| 3 | Người gửi | `senders` | Ghép usage_name hoặc first+last name; "Azura" nếu hệ thống tự gửi (sent_by = 0) |
| 4 | Người nhận | `receivers` | Ghép usage_name hoặc first+last name |
| 5 | Hạn hoàn thành | `deadline` | Định dạng d M y H:i |
| 6 | Ngày hoàn thành | `completed_on` | Chỉ có ở nhóm review/completed |
| 7 | Trạng thái | `status` | pending / is_clap (chờ xác nhận) / done / reminder |
| 8 | Tin tức công ty (khối riêng) | — | Danh sách `company_news` hiển thị song song (ngày đăng, người đăng, BU, tiêu đề) |

Filter/điều hướng: tab chính (`tab`: my-task, assigned-task, my-team-task, reminders), field ẩn `sub_tab` dùng cho sub-tab bên trong từng tab (active/review/completed) — được render qua các element `notice_board/my_task`, `notice_board/assigned_task`, `notice_board/my_team_task`, `notice_board/reminders`.

## Chức năng/nút thao tác
- **Assign Task (icon):** mở NOT-001 (Notice Board) để tạo công việc mới.
- **Xem chi tiết:** mở NOT-003 (View Detail) cho từng dòng.
- **Reminder:** gọi action `remindernotice($id)` — nhắc lại thông báo (không có view riêng, redirect về lại trang hiện tại).
- **Đánh dấu hoàn thành / Clap:** gọi action `statusUser($id)` (chuyển trạng thái sang `is_clap`) hoặc `clapUpdate($id)` (chuyển sang `done`) — không có view riêng, chỉ redirect.
- **Nhờ hỗ trợ:** mở NOT-004 (Help Other User).
- **Xóa thông báo:** mở popup xác nhận NOT-002-P1, khi đồng ý gọi `notice/delete/:id`.
- **Thêm/sửa Quote:** form ẩn submit trực tiếp trong trang (lưu bảng `Quote`), không có view riêng.

## Điều hướng
- Vào từ: menu chính "Notice Board".
- Điều hướng đến: NOT-001 (tạo mới), NOT-003 (xem chi tiết), NOT-004 (nhờ hỗ trợ), NOT-005 (Tin tức công ty, thông qua khối company news / link riêng).
