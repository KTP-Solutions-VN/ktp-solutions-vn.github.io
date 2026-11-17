# PROP-032 — Bảng điều khiển Property (Property Dashboard)

**Loại:** Trang đầy đủ
**Route:** property/dashboard (dashed mặc định CakePHP DashedRoute: `/property/dashboard`)
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Trang dashboard tổng quan của module Property, hiển thị 2 widget cảnh báo theo Business Unit: số property chưa gán Concierge và số nhân sự chưa gán Leader, kèm nút tải báo cáo tương ứng.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 | Không | `{0: 'All'} + business_unit`; đổi giá trị → gọi lại 2 AJAX cập nhật widget, không reload trang |
| 2 | Widget "SET-UP" (properties chưa gán Concierge) | `#total_properties` | Text (đọc, cập nhật qua AJAX) | — | Gọi AJAX POST `checkNotAssignConciergeToVilla` với `business_unit`; hiện "N properties not assigned" hoặc thông báo tương ứng |
| 3 | Widget nhân sự chưa gán Leader | `#total_leaders` | Text (đọc, cập nhật qua AJAX) | — | Gọi AJAX POST `checkNoLeaderAssigned` với `business_unit`; hiện "N staff have no leaders" hoặc thông báo tương ứng |

## Chức năng/nút thao tác
- Đổi Business Unit → gọi lại 2 hàm JS `checkNotAssignConciergeToVilla()` và `checkNotAssignedToLeader()` để refresh 2 widget tại chỗ (không điều hướng trang).
- Nút ảnh "save-it" dưới widget "SET-UP" (`.save_btn`) → điều hướng sang action `territories` (ngoài phạm vi 3 action được giao); ẩn (`d-none`) khi không có property nào chưa gán hoặc business unit không có property.
- Nút ảnh "save-it" dưới widget Leader (`.leader_save_btn`) → điều hướng sang `User::downloadUserReport/leader-list` (tải báo cáo, ngoài phạm vi được giao); ẩn khi tất cả nhân sự đã có leader.

## Điều hướng
- Mở từ: Menu chính (`active_menu = '8'`).
- Điều hướng tới: action `territories` (Property) và `User::downloadUserReport/leader-list` (đều ngoài phạm vi 3 action được giao, chỉ ghi chú điều hướng).
- Popup con: Không có.
