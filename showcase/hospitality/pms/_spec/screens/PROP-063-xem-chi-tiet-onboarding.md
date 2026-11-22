# PROP-063 — Hồ sơ tiếp nhận (Intake Record)

**Loại:** Trang đầy đủ
**Route:** property/view-onboarding/:id, mở từ PROP-020 (Tiếp nhận tài sản)
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang xem (read-only) toàn bộ dữ liệu đã nhập của một bản ghi Villa Onboarding: từng field thông tin Property/Unit kèm giá trị, người nhập/ngày nhập, người xác thực/ngày xác thực.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Field | `data[<field>]` (tên field) | Text (readonly) | — | Ví dụ: Property Name, Short Name, Beds24 Name, Owner, Location, Unit Type, Unit... |
| 2 | Entry | `data[<field>][<field>]` | Text (readonly) | — | Giá trị đã nhập |
| 3 | Prepared by / On | `created_by`/`created_at` | Text (readonly) | — | |
| 4 | Validated by / On | `data[<field>][validated_by]`/`[validated_at]` | Text (readonly) | — | Rỗng nếu field chưa được xác thực |

## Chức năng/nút thao tác
- Chỉ xem thông tin (read-only), không có nút lưu.
- (Tùy quyền) có thể có nút "Request Re-validation" điều hướng sang PROP-062 hoặc gọi `reviewOnBoarding` để reset trạng thái xác thực và yêu cầu duyệt lại.

## Điều hướng
- Mở từ: PROP-020 (Tiếp nhận tài sản).
- Điều hướng tới: PROP-062 (Xác thực lại hồ sơ tiếp nhận), hoặc quay lại PROP-020 (Tiếp nhận tài sản).
- Popup con: Không có.
