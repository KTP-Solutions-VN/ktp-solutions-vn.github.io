# VSV-023 — Hồ bơi (Pool)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::pool()` — mặc định `/villa-services/pool`; upload/duyệt báo giá qua route đẹp `/villa-services/pool/upload-quotation`, `/villa-services/pool/update-quotation-status/:id/:status`, `/villa-services/pool/delete-quotation/:id` (đều AJAX, không có view riêng)

**Module:** Dịch vụ villa — Hồ bơi

## Mô tả ngắn gọn
Danh sách các lượt vệ sinh/kiểm tra hồ bơi, cho phép theo dõi trạng thái (đã dọn/có sự cố), kiểm tra GPS người thực hiện có đúng vị trí villa không, xem chi tiết báo cáo, tải biên bản PDF, và xử lý quy trình báo giá sửa chữa khi hồ bơi gặp sự cố cần khắc phục (đơn vị ngoài gửi báo giá, nội bộ duyệt/từ chối).

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Units | `business_unit_id` | Select (select2) | Không | |
| 2 | Pool Company | `pools_company_id` | Select (select2) | Không | Chỉ hiện với user nội bộ (Internal); lọc theo nhà cung cấp dịch vụ hồ bơi |

### Danh sách
| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Date | `created_at` | |
| 2 | Villa | `villa.name` | |
| 3 | Company | `company_name` | Chỉ hiện với user Internal |
| 4 | Staff | `selected_pool_workers` | |
| 5 | Start / End | `start_time`/`end_time` | |
| 6 | GPS | `gps` (OK/NOK) | So khớp vị trí bắt đầu với tọa độ villa (lệch > 200m → NOK) |
| 7 | Status | `status`, `quotation_status` | Pending/Cleaned/Problem, hoặc trạng thái báo giá: Quotation Sent/Approved/Rejected |
| 8 | Action | — | View, Download PDF biên bản, Delete, Unlock/Lock cho chủ nhà, Upload/Download/Duyệt/Từ chối báo giá (khi có sự cố cần sửa) |

## Chức năng/nút thao tác
- **Xem GPS** (badge OK/NOK): xem khoảng cách vị trí bắt đầu/kết thúc so với villa.
- **Status button**: mở modal "Cleaning record" xem chi tiết lượt vệ sinh.
- **View** (icon mắt): xem chi tiết đầy đủ bản ghi.
- **Download** (khi có `document`): tải biên bản PDF.
- **Delete**: xóa bản ghi vệ sinh hồ bơi.
- **Unlock/Lock cho chủ nhà** (Internal): bật/tắt quyền chủ nhà xem báo cáo.
- **Upload Quotation** (External, khi sự cố cần "further_action" và chưa có báo giá hoặc bị từ chối): tải lên báo giá sửa chữa — AJAX `uploadQuotation`, route đẹp `/villa-services/pool/upload-quotation`.
- **Delete Quotation** (External, khi báo giá đã gửi/bị từ chối): xóa báo giá — route đẹp `/villa-services/pool/delete-quotation/:id`.
- **Duyệt/Từ chối báo giá** (Internal, khi báo giá đã gửi): route đẹp `/villa-services/pool/update-quotation-status/:id/:status` (`repair_approved`/`quotation_rejected`).

## Điều hướng
- Vào từ: Menu chính (mục Pool).
- Điều hướng đến: không có trang con dạng route riêng (thao tác qua modal/AJAX tại chỗ).
