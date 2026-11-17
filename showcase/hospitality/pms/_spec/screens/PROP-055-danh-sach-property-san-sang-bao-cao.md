# PROP-055 — Danh sách Property sẵn sàng tạo Báo cáo (Report Ready)

**Loại:** Trang đầy đủ
**Route:** property/report-ready?business_unit=...
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Trang kiểm tra điều kiện để tạo báo cáo doanh thu chủ nhà (Owner Revenue Report) hàng tháng cho từng Property: dựa trên tình trạng đặt phòng (booking) trong tháng để xác định trạng thái "READY" (đủ điều kiện) hay "READY AND SECURED" (đủ điều kiện và đã qua thời gian an toàn không hủy đặt phòng), từ đó cho phép tạo báo cáo ngay trên trang.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | Có (class `required`) | Đổi giá trị → điều hướng `report-ready?business_unit=...`, lưu cookie |

### Cột hiển thị
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property Name | `villa.name` | |
| 2 | Owner | `villa.owner.family_name` | |
| 3 | Status | `report_status` | Icon màu: Xanh (READY AND SECURED, đã gửi/sẵn sàng), Cam (READY, chưa tới hạn an toàn), rỗng nếu chưa đủ điều kiện |
| 4 | Actions | — | Nút "Generate Report" (chỉ hiện khi báo cáo tháng đó chưa gửi) |

## Chức năng/nút thao tác
- Đổi Business Unit → điều hướng lại trang với query `business_unit` mới.
- Nút "Generate Report" (icon file) — submit form tới `controller=Owner, action=generateReports` với `villa_id`, `business_unit`, `owner_id`, `date_range` (tháng hiện tại) để tạo báo cáo doanh thu cho Property đó (action nằm ở OwnerController, ngoài phạm vi PROP).

## Điều hướng
- Mở từ: Menu Property/Reports (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: `Owner/generateReports` (action sinh báo cáo, ngoài phạm vi PropertyController); liên hệ dữ liệu với PROP-054 (Report Status), PROP-018 (Bản tin hàng tháng), PROP-053 (BU Reports).
- Popup con: Không có.
