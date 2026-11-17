# OWN-001 — Danh sách chủ sở hữu

**Loại:** Trang đầy đủ

**Route:** `/Owner/list` (controller `Owner`, action `list()`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Màn hình danh sách toàn bộ chủ sở hữu (Owner) villa trong hệ thống, cho phép lọc theo Business Unit, lọc theo trạng thái Active/Inactive, xem nhanh số lượng villa đang hoạt động/ngưng hoạt động của từng chủ sở hữu, và là điểm khởi đầu để thêm mới, xem chi tiết, chỉnh sửa hoặc xoá một chủ sở hữu.

## Mô tả chi tiết

### Bộ lọc

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (dropdown) | Không | Mặc định lấy theo Business Unit được phân quyền/đang chọn của user; có tuỳ chọn "All" |
| 2 | Trạng thái Active/Inactive | `status` | Nút submit ẩn dạng toggle (hidden field `status`) | Không | Nút bấm đảo trạng thái lọc giữa "Active Owners" / "Inactive Owners" |

### Danh sách (bảng)

| # | Tên cột | Field code | Loại dữ liệu | Ghi chú |
|---|---|---|---|---|
| 1 | STT | — | Số thứ tự | Tự sinh |
| 2 | Họ (Family Name) | `family_name` | Text | Sắp xếp mặc định theo cột này (ASC) |
| 3 | Tên (First Name) | `first_name` | Text | |
| 4 | Email | `email` | Text | |
| 5 | Quốc tịch (Nationality) | `nationality` | Text | |
| 6 | Số villa (Nb Properties) | `active_villa` / `inactive_villa` | Text (tổng hợp) | Hiển thị dạng `Active (Inactive)` |
| 7 | Ngày tạo | `created_at` | Datetime | Định dạng `d M Y H:i` |
| 8 | Thao tác | — | Nhóm nút | Xem, Sở hữu villa, Thanh toán, Sửa, Xoá |

## Chức năng/nút thao tác

- **Thêm mới** (nút "+ Add New"): điều hướng sang OWN-002 (Thêm mới chủ sở hữu).
- **Login Log** (nút): điều hướng sang OWN-014 (Nhật ký đăng nhập chủ sở hữu).
- **Lọc theo Business Unit**: submit form lọc lại danh sách.
- **Active/Inactive owners** (nút toggle): đổi điều kiện lọc trạng thái và submit lại danh sách.
- **Xem chi tiết** (icon con mắt, mỗi dòng): mở OWN-001-P1 (Xem chi tiết chủ sở hữu).
- **Sở hữu villa** (icon nhà, mỗi dòng): điều hướng tới OWN-003 (Chỉnh sửa chủ sở hữu) — tab "Properties".
- **Thanh toán** (icon dollar, mỗi dòng): điều hướng tới OWN-003 (Chỉnh sửa chủ sở hữu) — tab "Payment Details".
- **Sửa** (icon bút, mỗi dòng): điều hướng tới OWN-003 (Chỉnh sửa chủ sở hữu) — tab "Owner Details".
- **Xoá** (icon thùng rác, mỗi dòng): xoá chủ sở hữu (action `delete($id)`, không có giao diện riêng — chỉ xác nhận rồi gọi ajax/redirect).

## Điều hướng

- Vào từ: menu chính (sidebar) mục "Owners".
- Đi tới:
  - OWN-002 — Thêm mới chủ sở hữu (nút Add New)
  - OWN-001-P1 — Xem chi tiết chủ sở hữu (icon mắt)
  - OWN-003 — Chỉnh sửa chủ sở hữu (icon nhà/dollar/bút, mở các tab tương ứng)
  - OWN-014 — Nhật ký đăng nhập chủ sở hữu (nút Login Log)
