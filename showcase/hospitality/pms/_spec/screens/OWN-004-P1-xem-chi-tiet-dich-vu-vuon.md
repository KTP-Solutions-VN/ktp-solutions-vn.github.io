# OWN-004-P1 — Xem chi tiết dịch vụ vườn

**Loại:** Popup (mở từ OWN-004)

**Route:** `/Owner/gardenView/{id}` (controller `Owner`, action `gardenView($id)`)

**Module:** Quản lý chủ sở hữu (Admin)

## Mô tả ngắn gọn

Trang chi tiết (chỉ đọc) của một lượt làm vườn (garden job) đã hoàn thành cho một villa, hiển thị dịch vụ, người thực hiện, thời gian bắt đầu/kết thúc và ngày dọn dẹp. Mở từ icon "View Details" trong tab Garden của màn hình OWN-004.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Villa | `villa.name` | Text (readonly) | — | Hiển thị ở tiêu đề trang |
| 2 | Dịch vụ vườn | `garden_service.name` | Text (readonly) | — | |
| 3 | Người thực hiện | `operators_name` | Text (readonly) | — | Ghép từ danh sách gardener |
| 4 | Giờ bắt đầu | `actual_start_time` | Text (readonly) | — | |
| 5 | Giờ kết thúc | `actual_end_time` | Text (readonly) | — | |
| 6 | Ngày dọn dẹp | `date` | Date (readonly) | — | Định dạng `d M y` |
| 7 | Đã lên kế hoạch | `is_planned` (hiển thị `planned`) | Text (Yes/No, readonly) | — | |

## Chức năng/nút thao tác

- Chỉ xem thông tin, không có nút chỉnh sửa.

## Điều hướng

- Mở từ: OWN-004 (tab Garden, icon con mắt "View Details" trên từng dòng dữ liệu).
- Không điều hướng tiếp tới màn hình con nào khác.
