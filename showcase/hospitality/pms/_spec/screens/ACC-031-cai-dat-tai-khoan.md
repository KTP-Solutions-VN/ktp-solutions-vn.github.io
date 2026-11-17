# ACC-031 — Cài đặt (Settings)

**Loại:** Trang đầy đủ

**Route:** `AccountController::setting()` — mặc định `/account/setting` (không có tham số)

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Trang "Settings" của module Tài khoản & Nhân sự. Action chỉ set tiêu đề trang (`settings_text`) và `active_menu = 'acc-ota'`, không truy vấn hay set thêm biến dữ liệu nào khác.

## Mô tả chi tiết

**Phát hiện quan trọng:** file view `plugins/VillaManagement/src/Template/Account/setting.ctp` **rỗng hoàn toàn** (0 dòng) — trang khi truy cập trực tiếp chỉ hiển thị layout khung (header, sidebar) mà không có bất kỳ nội dung/form nào bên trong. Đây thực chất là một trang chưa được triển khai nội dung (hoặc chỉ đóng vai trò điểm neo để bật submenu).

Vì vậy không có bảng field/cột nào để mô tả cho chính action `setting()`.

Theo cấu trúc sidebar (`Element/side-bar/account-sidebar.ctp`), mục **Settings** ở nhóm menu trên cùng vừa là link tới `Account::setting`, vừa có khả năng dùng làm nút bật/tắt hiển thị nhóm menu con `.account-setting-menu` (submenu Settings, ẩn mặc định bằng CSS `display:none`) chứa các mục:
- Supplies (Suppliers, Products)
- Services (Suppliers, Services)
- **Assets** (Vehicles — ACC-032, Phones, Computers, Sim Cards)
- Nhân sự (Public Holidays, Wage Periods)
- Chart of Accounts (chỉ Superadmin)
- Approval Matrix (chỉ Superadmin)
- Menu (quay lại ACC-029 — `Account::index`)

Như vậy nội dung "Cài đặt" thực tế nằm rải rác ở các submenu con nêu trên chứ không nằm trực tiếp trên trang `setting()`.

## Chức năng/nút thao tác
- Không có nút thao tác nào trên chính trang này (view rỗng).
- Về mặt điều hướng, menu "Settings" ở sidebar dẫn tới các mục con liệt kê ở trên.

## Điều hướng
- Vào từ: Sidebar > Account & HR > **Settings** (mục top-level, có icon Setting-Icon.png).
- Điều hướng đến: không có nội dung/liên kết nào phát sinh từ trang `setting()` — các màn hình cấu hình thực tế (Vehicles - ACC-032, Suppliers, Services, Public Holidays, Wage Periods, Chart of Accounts, Approval Matrix...) được truy cập trực tiếp từ submenu sidebar, không phải từ nội dung của trang này.
