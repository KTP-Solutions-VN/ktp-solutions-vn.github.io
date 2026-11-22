# PROP-025 — Xếp hạng nhiếp ảnh gia (Photographer Ratings)

**Loại:** Trang đầy đủ
**Route:** property/photography/photographer-evaluation (route đẹp cấu hình riêng trong Routes.php, ứng với action `photographerEvaluation`)
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Bảng tổng hợp hiệu suất chụp ảnh theo từng nhiếp ảnh gia (photographer), tổng hợp điểm số các bộ ảnh (photo sets) đã chấm theo tiêu chí Angles/Colours/Composition, so sánh với điểm benchmark khu vực trong một khoảng thời gian (period) và khu vực (region) được chọn.

## Mô tả chi tiết

### Filter
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Region | `region` (query string) | Select (danh sách khu vực + "all") | Không | Mặc định `all` |
| 2 | Period | `period` (query string) | Select (danh sách khoảng thời gian định sẵn) | Không | Mặc định `last_90_days` |
| 3 | Photographer | `photographer` (query string) | Select (danh sách nhiếp ảnh gia + "all") | Không | Mặc định `all`, phụ thuộc region/period |
| 4 | Nút Apply | — | Submit (GET) | — | |

### KPI tổng quan
| # | Tên field | Field code | Ghi chú |
|---|---|---|---|
| 1 | Regional average | `summary.regional_average` | Điểm trung bình khu vực |
| 2 | Photo sets scored | `summary.scored_sets` | Số bộ ảnh đã chấm |
| 3 | Best performer | `summary.best_performer` | Nhiếp ảnh gia điểm cao nhất |
| 4 | Below benchmark | `summary.below_benchmark` | Số lượng dưới chuẩn |

### Bảng "Performance by Photographer"
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Rank | `row.rank` | Số | Không (hiển thị) | Badge đặc biệt cho hạng 1 |
| 2 | Photographer | `row.photographer`, `photographer_initials` | Text + avatar chữ cái đầu | Không | |
| 3 | Sets | `row.sets` | Số | Không | |
| 4 | Angles/Colours/Composition | `row.angles_average`, `colours_average`, `composition_average` | Sao (1-3 sao) | Không | |
| 5 | Average | `row.average_score` | Text (x.x / 3) | Không | Màu theo mức (high/mid/low) |
| 6 | Benchmark Comparison | `row.comparison_percent`, `comparison_width` | Thanh so sánh % trên/dưới benchmark | Không | |

### Khối "Regional Benchmark" (sidebar)
Hiển thị: Regional average, Best criterion (+điểm), Weakest criterion (+điểm) theo `benchmark`.

## Chức năng/nút thao tác
- Nút "Apply" — lọc lại dữ liệu theo Region/Period/Photographer (GET request, cập nhật URL).
- Không có thao tác ghi dữ liệu trên màn hình này (chỉ xem báo cáo).
- Nếu storage ảnh (`photoStorageReady()`) chưa sẵn sàng, hiển thị cảnh báo "Photo storage pending review".

## Điều hướng
- Mở từ: PROP-026 (Shoot Scheduler) — breadcrumb; PROP-028 (Image Quality Review) — link tên nhiếp ảnh gia trên từng dòng điểm.
- Điều hướng tới: `Property::photography` (breadcrumb "Shoot Scheduler" — PROP-026).
- Popup con: Không có.
