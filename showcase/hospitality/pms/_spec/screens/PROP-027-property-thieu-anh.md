# PROP-027 — Danh sách Property thiếu ảnh (Properties Missing Photos)

**Loại:** Trang đầy đủ
**Route:** property/photography/missing-photos (route đẹp cấu hình riêng trong Routes.php, ứng với action `photographyMissingPhotos`)
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Màn hình liệt kê các Property chưa có bộ ảnh sử dụng được hoặc thiếu ảnh các khu vực chuẩn (bedroom, living room...), phân loại theo mức độ ưu tiên, hỗ trợ lập kế hoạch chụp bù nhanh.

## Mô tả chi tiết

### Filter
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `id` (query) | Select | Không | |
| 2 | Search | `q` | Text | Không | Tìm theo tên property/residence/unit |
| 3 | Nút Apply | — | Submit (GET) | — | |

### KPI tổng quan
| # | Tên field | Field code | Ghi chú |
|---|---|---|---|
| 1 | Properties with issues | `summary.missing_properties` | |
| 2 | High priority | `summary.high_priority` | |
| 3 | Partial photo sets | `summary.partial_sets` | |
| 4 | Outdated sets | `summary.outdated_sets` | |

### Bảng danh sách
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Property | `row.property`, `property_meta` | Text | Không | |
| 2 | Photo Set (trạng thái) | `row.status`, `status_key` | Icon + text | Không | |
| 3 | Missing / Issue | `row.issues[]` (label, class) | Danh sách tag | Không | Vd: thiếu ảnh phòng ngủ, ảnh ngoài chuẩn... |
| 4 | Priority | `row.priority`, `priority_key` | Badge (high/medium/low) | Không | |
| 5 | Next Action | `row.next_action` | Text | Không | Nhấn mạnh nếu priority = high |
| 6 | Actions | — | 3 icon-button | — | Plan shoot / Upload photos / View photo set |

Phân trang 25 dòng/trang (`pagination`).

## Chức năng/nút thao tác
- Nút "Plan Photo Shoot" (đầu trang) → chuyển tới PROP-026 (`Property::photography`).
- Icon "Plan shoot" trên từng dòng → `Property::photography?villa_id=...`.
- Icon "Upload photos" → `Photos::property/{villa_id}`.
- Icon "View photo set" → `Photos::detail/{villa_id}/{set_key}`.
- Nút "Apply" — lọc theo Business Unit/Search.
- Điều hướng phân trang Previous/Next.

## Điều hướng
- Mở từ: PROP-026 (Photography Planning) — breadcrumb/menu.
- Điều hướng tới: `Property::photography` (PROP-026), `Photos::property`, `Photos::detail` (ngoài phạm vi).
- Popup con: Không có.
