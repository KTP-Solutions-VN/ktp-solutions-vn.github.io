# PROP-021 — Điểm chặn trước khi mở bán (Go-Live Blockers)

**Loại:** Trang đầy đủ
**Route:** property/onboarding
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Màn hình liệt kê các Property đang mở (status = Open), lọc theo Business Unit, cho phép truy cập nhanh 4 thao tác Onboarding phụ trợ cho từng Property: Villa Confirmation, Villa Communication, Villa Rules, Villa Extra. Có modal xác nhận xóa và modal Duplicate Property.

## Mô tả chi tiết

### Filter
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 (có option "All") | Không | Đổi giá trị → redirect `onboarding?id=...`, lưu cookie |

### Cột hiển thị (bảng `#zero_config`)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Property Type | `villa_type_id` | Text (map sang tên VillaType) | Không | |
| 2 | Area | `area_id` | Text (map sang tên Area, qua VillaLocation) | Không | |
| 3 | Name | `name` | Text | Không | |
| 4 | Owner | `owner.family_name` | Text | Không | Qua contain Owner |
| 5 | Status | `status` | Text | Không | |
| 6 | Action | — | 4 icon-button | — | Chỉ hiện khi user không phải Team Leader/Employee |

Danh sách sắp xếp theo `villa_type_id`, `area_id`, `name` (multisort).

## Chức năng/nút thao tác
- Icon "Villa Confirmation" (dấu tích) → link tới action `confirmation/{base64(villa_id)}`.
- Icon "Villa Communication" (bong bóng chat) → link tới action `communication/{base64(villa_id)}`.
- Icon "Villa Rules" (danh sách) → mở modal (data-whatever) liên kết action `villa-rules/{base64(villa_id)}`.
- Icon "Villa Extra" (dấu cộng) → link tới action `villa-extras/{base64(villa_id)}`.
- Modal xác nhận xóa Property (`#exampleModal`) — nút Delete gọi `property/delete/{base64(id)}`.
- Modal "Duplicate Property" (`#exampleModal1`) — chọn Property nguồn (`villa_id`) và nhập tên Property mới (`name`, validate trùng tên qua AJAX `checkVillaName`), submit AJAX `duplicateProperty`, tự reload trang sau 5 giây nếu thành công.
- Đổi Business Unit → redirect `onboarding?id=...`.

## Điều hướng
- Mở từ: Menu Hồ sơ tài sản (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: `confirmation`, `communication`, `villa-rules`, `villa-extras`, `property/delete`, `duplicateProperty` (các action ngoài phạm vi PROP-017..031).
- Popup con: Modal xác nhận xóa và Modal Duplicate Property (không tách mã riêng vì thuộc phạm vi phụ trợ nhỏ, không phải trọng tâm PROP-021).
