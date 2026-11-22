# PROP-051 — Mức sẵn sàng hợp đồng (Contract Readiness)

**Loại:** Trang đầy đủ
**Route:** property/guest-contract-bu-recap
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang tổng hợp trạng thái gán hợp đồng cổng thông tin khách (Guest Contract) cho toàn bộ Property trong một Business Unit: đã sẵn sàng ký (Ready), chưa gán hợp đồng (No Contract), thiếu thông tin bắt buộc (Missing Info). Hỗ trợ lọc nhanh, tìm kiếm, phân trang, xem trước (preview) hợp đồng và xuất Excel. Nội dung này cũng được nhúng làm tab "Portal Contract" trong PROP-048 (Nhập dịch vụ hàng loạt).

## Mô tả chi tiết

### Bộ lọc
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `bu` | Select (query string) | Có | Đổi giá trị → reload |
| 2 | Quick Filter | `filter` | Chip link (All/Ready/No Contract/Missing Info...) | Không | |
| 3 | Tìm kiếm | `q` | Text (tên/ID Property) | Không | |
| 4 | Trang | `page` | Số trang (phân trang 25 dòng/trang) | Không | |

### KPI tổng quan
| # | Chỉ số | Field code | Ghi chú |
|---|---|---|---|
| 1 | Total Properties | `kpis.total` | |
| 2 | Ready for Signature | `kpis.ready` | |
| 3 | No Contract Assigned | `kpis.no_contract` | |
| 4 | Missing Required Information | `kpis.missing_info` | |

### Cột hiển thị (bảng recap)
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property | `villa_id`/tên Property | |
| 2 | Assigned Contract | `general_version_id` | Phiên bản hợp đồng mẫu đã gán |
| 3 | Languages | `contract_language` | |
| 4 | Missing Information | — | Danh sách trường còn thiếu (nếu có) |
| 5 | Action | — | Nút "Preview" (nếu đã có hợp đồng), nút "Assign"/"Open" |

## Chức năng/nút thao tác
- Đổi Business Unit/Filter/Search → reload danh sách theo điều kiện.
- Nút "Refresh" → tải lại dữ liệu với điều kiện lọc hiện tại.
- Nút "Export Excel" → xuất file Excel theo điều kiện lọc (`?export=1`).
- Nút "Preview" (chip `gcb-preview-button`) → mở modal/tab xem trước nội dung hợp đồng (liên kết PROP-052 — Guest Contract Assignment PDF).
- Nút "Assign"/"Open" → điều hướng tới `property/villa/portal contract/:villa_id` (tab Portal Contract của PROP-050) để gán/xem hợp đồng, mở ở tab mới.
- Phân trang Previous/Next.

## Điều hướng
- Mở từ: Menu báo cáo chủ nhà, hoặc từ PROP-048 (Nhập dịch vụ hàng loạt — tab Contract Readiness, nút "Export Excel").
- Điều hướng tới: PROP-050 (tab Portal Contract, mở tab mới), PROP-052 (In hợp đồng khách — preview).
- Popup con: Modal Preview hợp đồng (không tách mã riêng, dùng chung nội dung PROP-052).
