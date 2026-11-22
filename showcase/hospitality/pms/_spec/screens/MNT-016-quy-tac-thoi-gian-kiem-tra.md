# MNT-016 — SLA kiểm tra (Inspection SLAs)

**Loại:** Trang đầy đủ
**Route:** maintenance/inspection
**Module:** MNT = Điều phối sửa chữa

## Mô tả ngắn gọn
Màn hình cấu hình số ngày trưởng thành (maturity days) cho quy trình kiểm tra villa (inspection) theo từng đơn vị kinh doanh — áp dụng cho 3 trạng thái vấn đề: New (mới phát hiện), Seen (đã xem), OK (đã xử lý xong). Mỗi đơn vị kinh doanh chỉ được cấu hình một bộ quy tắc.

## Mô tả chi tiết

### Danh sách
| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Đơn vị kinh doanh | `business_unit_id` → tên | |
| 3 | Quy tắc | — | Xem nhanh 3 mốc ngày (New/Seen/OK) |
| 4 | Người tạo | `CreatedUser.usage_name` | |
| 5 | Ngày cập nhật | `updated_at` | |
| 6 | Hành động | — | Sửa (MNT-016-P1), Xem (MNT-016-P2), Xóa |

### Form thêm mới (modal ngay trên trang)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_ids[]` | Checkbox nhiều lựa chọn | Có | Chỉ hiện các BU chưa có quy tắc (`_getBusinessUnit`) |
| 2 | New — số ngày trưởng thành | `data[0][meturity]` | Text số | Không (mặc định 0) | |
| 3 | Seen — số ngày trưởng thành | `data[1][meturity]` | Text số | Không (mặc định 0) | |
| 4 | OK — số ngày trưởng thành | `data[2][meturity]` | Text số | Không (mặc định 0) | |

## Chức năng/nút thao tác
- **Add New** (modal): tạo một bộ quy tắc `InspectionServices` cho mỗi BU được chọn (`action=add`).
- **Xóa**: xóa bộ quy tắc (`action=delete`, chỉ cần `id`).
- **Sửa** (icon): mở MNT-016-P1 — Sửa quy tắc.
- **Xem** (icon): mở MNT-016-P2 — Xem quy tắc.

## Điều hướng
- Vào từ: menu cài đặt Repair Desk trong sidebar.
- Đi tới: MNT-016-P1 (Sửa), MNT-016-P2 (Xem).
