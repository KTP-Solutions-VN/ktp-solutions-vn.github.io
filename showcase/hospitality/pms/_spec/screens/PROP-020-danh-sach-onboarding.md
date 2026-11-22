# PROP-020 — Tiếp nhận tài sản (Property Intake)

**Loại:** Trang đầy đủ
**Route:** property/on-boardings
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Màn hình danh sách các tiến trình Onboarding (thêm Property mới vào hệ thống qua wizard nhiều bước, lưu ở bảng `VillaOnboarding` dạng JSON), hiển thị trạng thái (pending/in_progress/completed/aborted) và cho phép xem/sửa/review theo trạng thái.

## Mô tả chi tiết

### Filter
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 (có option "All") | Không | Lưu cookie business unit qua `_setBusinessUnitCookie` |

### Cột hiển thị (bảng `#zero_config`)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Property | `property_name` (giải mã từ JSON field `data`) | Text | Không (hiển thị) | |
| 2 | Status | `status` | Text (pending/in_progress/completed/aborted) | Không | |
| 3 | Created On | `created_at` | Datetime (`d M y`) | Không | |
| 4 | By | `created_by.usage_name` | Text | Không | Qua contain `CreatedBy` |
| 5 | Last Updated | `updated_at` | Datetime (`d M y`) | Không | |
| 6 | By | `modify_by.usage_name` | Text | Không | Qua contain `ModifyBy` |
| 7 | Action | — | Nút Xem/Sửa/Review | — | Tùy theo status |

## Chức năng/nút thao tác
- Nút "Add new" — link tới `Property::addOnboarding` (wizard tạo mới, ngoài phạm vi mã hiện tại).
- Nút "View" (icon mắt) — hiển thị khi status = pending/in_progress/completed → link `Property::viewOnboarding/{id}`.
- Nút "Edit" (icon bút) — hiển thị khi status = pending/in_progress → link `Property::editOnBoarding/{id}`.
- Nút "Review" (icon bút, màu vàng) — hiển thị khi status = aborted → link `Property::reviewOnBoarding/{id}`.
- Đổi Business Unit → (JS hiện chỉ set biến, không tự reload trang trong bản hiện tại).

## Điều hướng
- Mở từ: Menu Hồ sơ tài sản Intake (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: `addOnboarding`, `viewOnboarding`, `editOnBoarding`, `reviewOnBoarding` (các action wizard onboarding, ngoài phạm vi PROP-017..031).
- Popup con: Không có.
