# PROP-028 — Đánh giá chất lượng ảnh (Image Quality Review)

**Loại:** Trang đầy đủ
**Route:** property/photography/scores (route đẹp cấu hình riêng trong Routes.php, ứng với action `photographyScores`)
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Bảng chấm điểm chất lượng từng bộ ảnh (photo set) theo 3 tiêu chí Angles/Colours/Composition (thang 1-3 sao), cho phép chấm điểm trực tiếp tại chỗ (AJAX) và xem điểm trung bình, sắp xếp theo điểm thấp/cao nhất.

## Mô tả chi tiết

### Filter
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `id` (query) | Select | Không | |
| 2 | Search | `q` | Text | Không | Tìm theo property/residence/unit |
| 3 | Sort | `sort` | Select (Lowest score first / Highest score first) | Không | Mặc định `lowest` |
| 4 | Nút Apply | — | Submit (GET) | — | |

### KPI tổng quan
| # | Tên field | Field code | Ghi chú |
|---|---|---|---|
| 1 | Average score | `summary.average_score` | |
| 2 | Scored photo sets | `summary.scored_sets` | |
| 3 | Need attention | `summary.need_attention` | Điểm < 2 |
| 4 | Strong packs | `summary.strong_packs` | Điểm ≥ 2.5 |

### Bảng "Photo Pack Score Overview"
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Property | `row.property`, `property_meta` | Text | Không | |
| 2 | Photographer | `row.photographer` | Text (link tới PROP-025 lọc theo photographer) | Không | |
| 3 | Angles/Colours/Composition | `row.angles_score`, `colours_score`, `composition_score` | Sao bấm được (1-3), AJAX cập nhật ngay | Không | POST `Photos::updateQualityScore` |
| 4 | Average | `row.average_score` | Text (x.x / 3) | Không | Tự cập nhật khi chấm sao |
| 5 | Assessed | `row.assessed_at`, `assessed_by` | Text | Không | |
| 6 | Actions | — | Icon "View photo set" | — | `Photos::detail/{villa_id}/{set_key}` |

Phân trang 25 dòng/trang.

## Chức năng/nút thao tác
- Bấm vào sao (1-3) trong cột Angles/Colours/Composition → gửi AJAX POST `Photos::updateQualityScore` (fields: `photo_set_id`, `criterion`, `score`), cập nhật giao diện tại chỗ (sao, điểm trung bình, KPI tổng) không cần reload trang.
- Nút "Apply" — lọc theo Business Unit/Search/Sort.
- Icon "View photo set" → xem chi tiết bộ ảnh.
- Điều hướng phân trang Previous/Next.

## Điều hướng
- Mở từ: PROP-026 (Shoot Scheduler) — breadcrumb/menu.
- Điều hướng tới: PROP-025 (link tên nhiếp ảnh gia), `Photos::detail` (ngoài phạm vi).
- Popup con: Không có.
