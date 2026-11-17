# OWN-009 — Danh sách Agency

**Loại:** Trang đầy đủ

**Route:** `/Owner/agencyList` (controller `Owner`, action `agencyList()`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Màn hình liệt kê toàn bộ Agency (đại lý) trong hệ thống. Superadmin thấy tất cả Agency; các user khác chỉ thấy Agency thuộc business unit mà mình được phân quyền. Đây là menu cấp 1 trong sidebar (mục "Agencies"), song được cài đặt trong `OwnerController` cùng với module chủ sở hữu.

## Mô tả chi tiết

| # | Tên cột | Field code | Loại dữ liệu | Ghi chú |
|---|---|---|---|---|
| 1 | STT | — | Số | |
| 2 | Tên Agency | `agency_name` | Text | |
| 3 | Quốc gia | `country` | Text | |
| 4 | Người tạo | `created_by` | Text | |
| 5 | Ngày tạo | `created_at` | Datetime | Định dạng `d M Y H:i` |
| 6 | Thao tác | — | Xem / Thanh toán / Sửa / Xoá | |

## Chức năng/nút thao tác

- **+ Add New**: mở OWN-010 (Thêm mới Agency).
- **Xem** (icon con mắt): mở OWN-012 (Xem chi tiết Agency).
- **Thanh toán** (icon đô la): mở OWN-011 (Chỉnh sửa Agency) ở tab "Payment Details", danh sách chi tiết thanh toán.
- **Sửa** (icon bút): mở OWN-011 (Chỉnh sửa Agency) ở tab "Agency Details".
- **Xoá** (icon thùng rác): xác nhận qua popup modal, sau đó gọi `deleteAgency/{id}` (không có giao diện riêng).

## Điều hướng

- Mở từ: Menu sidebar "Agencies" (`active_menu` 9/91).
- Đi tới:
  - OWN-010 — Thêm mới Agency
  - OWN-011 — Chỉnh sửa Agency
  - OWN-012 — Xem chi tiết Agency
