# PROP-056 — Nhật ký hoạt động Chụp ảnh (Photography Logs)

**Loại:** Trang đầy đủ
**Route:** property/logs
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Trang tra cứu nhật ký (log) các hoạt động chụp ảnh (Photography) đã hoàn thành, lọc theo Business Unit, Cấp độ (Property/Residence/Unit), Residence/Unit/Property cụ thể. Hiển thị loại hoạt động, tên, ngày, nhận xét.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 | Có (class `required`) | Đổi giá trị → cập nhật query, lưu cookie |
| 2 | Entry Level | `entry_level` | Select2 (Property/Residence/Unit) | Có | Điều khiển hiện field tương ứng |
| 3 | Residence | `residence_id` | Select2 | Có (khi Entry Level phù hợp) | |
| 4 | Unit | `unit_id` | Select2 | Có (khi Entry Level phù hợp) | |
| 5 | Property | `villa_id` | Select2 | Có (khi Entry Level = Property) | |

### Cột hiển thị
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Type | `type` | Loại hoạt động chụp ảnh |
| 3 | Name | `name` | |
| 4 | Date | `date` | |
| 5 | Comment | `comment` | |
| 6 | Actions | — | Icon xem chi tiết |

## Chức năng/nút thao tác
- Đổi bộ lọc (Business Unit/Entry Level/Residence/Unit/Property) → tải lại danh sách log tương ứng.
- Icon Actions trên từng dòng → xem chi tiết hoạt động chụp ảnh liên quan (liên hệ PROP-026 Kế hoạch chụp ảnh, PROP-028 Điểm chấm chất lượng ảnh).

## Điều hướng
- Mở từ: Menu Property/Photography (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: Không điều hướng sang trang khác trong phạm vi file (chỉ lọc dữ liệu tại chỗ); liên hệ dữ liệu với PROP-026, PROP-027, PROP-028.
- Popup con: Không có.
