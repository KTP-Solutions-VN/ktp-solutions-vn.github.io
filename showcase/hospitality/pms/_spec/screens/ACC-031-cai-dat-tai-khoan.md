# ACC-031 — Tùy chọn tài chính (Finance Preferences)

**Loại:** Trang đầy đủ

**Route:** `AccountController::setting()` — mặc định `/account/setting` (không có tham số)

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Trang "Finance Preferences" của module Tài chính & Hành chính. Action chỉ set tiêu đề trang (`settings_text`) và `active_menu = 'acc-ota'`, không truy vấn hay set thêm biến dữ liệu nào khác.

## Mô tả chi tiết

**Phát hiện quan trọng:** file view `plugins/VillaManagement/src/Template/Account/setting.ctp` **rỗng hoàn toàn** (0 dòng) — trang khi truy cập trực tiếp chỉ hiển thị layout khung (header, sidebar) mà không có bất kỳ nội dung/form nào bên trong. Đây thực chất là một trang chưa được triển khai nội dung (hoặc chỉ đóng vai trò điểm neo để bật submenu).

Vì vậy không có bảng field/cột nào để mô tả cho chính action `setting()`.

Theo cấu trúc sidebar (`Element/side-bar/account-sidebar.ctp`), mục **Finance Preferences** ở nhóm menu trên cùng vừa là link tới `Account::setting`, vừa có khả năng dùng làm nút bật/tắt hiển thị nhóm menu con `.account-setting-menu` (submenu Finance Preferences, ẩn mặc định bằng CSS `display:none`) chứa các mục:
- Supplies (Goods Vendors, Goods Catalog)
- Services (Service Vendors, Billable Services)
- **Assets** (Company Fleet — ACC-032, Mobile Devices, IT Equipment, Mobile Lines)
- Nhân sự (Holiday Calendar, Pay Periods)
- Account Structure (chỉ Superadmin)
- Spending Limits (chỉ Superadmin)
- Summary (quay lại ACC-029 — `Account::index`)

Như vậy nội dung "Finance Preferences" thực tế nằm rải rác ở các submenu con nêu trên chứ không nằm trực tiếp trên trang `setting()`.

## Chức năng/nút thao tác
- Không có nút thao tác nào trên chính trang này (view rỗng).
- Về mặt điều hướng, menu "Finance Preferences" ở sidebar dẫn tới các mục con liệt kê ở trên.

## Điều hướng
- Vào từ: Sidebar > Finance & Admin > **Finance Preferences** (mục top-level, có icon Setting-Icon.png).
- Điều hướng đến: không có nội dung/liên kết nào phát sinh từ trang `setting()` — các màn hình cấu hình thực tế (Company Fleet - ACC-032, Goods Vendors, Billable Services, Holiday Calendar, Pay Periods, Account Structure, Spending Limits...) được truy cập trực tiếp từ submenu sidebar, không phải từ nội dung của trang này.
