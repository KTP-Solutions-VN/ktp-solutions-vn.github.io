# OWN-001 — Tài khoản chủ nhà (Owner Accounts)

**Loại:** Trang đầy đủ

**Route:** `/Owner/list` (controller `Owner`, action `list()`)

**Module:** Quan hệ chủ nhà (Admin)

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

- **Thêm mới** (nút "+ Add New"): điều hướng sang OWN-002 (Thêm tài khoản chủ nhà).
- **Access History** (nút): điều hướng sang OWN-014 (Lịch sử truy cập của chủ nhà).
- **Lọc theo Business Unit**: submit form lọc lại danh sách.
- **Active/Inactive owners** (nút toggle): đổi điều kiện lọc trạng thái và submit lại danh sách.
- **Xem chi tiết** (icon con mắt, mỗi dòng): mở OWN-001-P1 (Tóm tắt tài khoản chủ nhà).
- **Sở hữu villa** (icon nhà, mỗi dòng): điều hướng tới OWN-003 (Sửa tài khoản chủ nhà) — tab "Properties".
- **Thanh toán** (icon dollar, mỗi dòng): điều hướng tới OWN-003 (Sửa tài khoản chủ nhà) — tab "Payment Details".
- **Sửa** (icon bút, mỗi dòng): điều hướng tới OWN-003 (Sửa tài khoản chủ nhà) — tab "Owner Details".
- **Xoá** (icon thùng rác, mỗi dòng): xoá chủ sở hữu (action `delete($id)`, không có giao diện riêng — chỉ xác nhận rồi gọi ajax/redirect).

## Điều hướng

- Vào từ: menu chính (sidebar) mục "Owner Accounts".
- Đi tới:
  - OWN-002 — Thêm tài khoản chủ nhà (nút Add New)
  - OWN-001-P1 — Tóm tắt tài khoản chủ nhà (icon mắt)
  - OWN-003 — Sửa tài khoản chủ nhà (icon nhà/dollar/bút, mở các tab tương ứng)
  - OWN-014 — Lịch sử truy cập của chủ nhà (nút Access History)
