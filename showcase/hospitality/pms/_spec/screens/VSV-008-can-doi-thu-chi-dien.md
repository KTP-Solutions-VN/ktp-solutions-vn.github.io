# VSV-008 — Cân đối thu/chi điện (Monthly Balance)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::monthlyBalance()` — mặc định `/villa-services/monthly-balance` (POST cùng action để tìm kiếm)

**Module:** Dịch vụ villa — Điện

## Mô tả ngắn gọn
Trang đối chiếu số tiền điện thu được từ khách (lúc check-out) so với số tiền điện phải trả nhà cung cấp/hóa đơn hàng tháng, trong một khoảng thời gian, theo villa hoặc theo toàn bộ danh sách villa.

## Mô tả chi tiết

### Bộ lọc tìm kiếm
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Start Date | `start_date` | Text (datepicker) | Có | Mặc định ngày hiện tại |
| 2 | End Date | `end_date` | Text (datepicker) | Có | Mặc định ngày hiện tại |
| 3 | Business Unit | `business_unit` | Select | Có | Theo phân quyền BU/zone |
| 4 | Villa | `villa` | Select (select2) | Có | Khi chọn villa → xem chi tiết theo ngày (tab "villa"); khi để trống → xem tổng hợp theo villa (tab "date") |

### Bảng dữ liệu — chế độ tổng hợp theo villa (không chọn villa cụ thể)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Property | Tên villa |
| 2 | Received | Tổng tiền điện thu từ khách trong khoảng ngày lọc |
| 3 | Paid | Tổng tiền điện đã trả nhà cung cấp (hóa đơn) trong khoảng ngày lọc |
| 4 | Profit | Received − Paid |
| 5 | Warning | Cảnh báo số lượt thiếu thông tin thanh toán ("n payment missing") |

### Bảng dữ liệu — chế độ chi tiết theo villa cụ thể
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Date | Ngày phát sinh (check-out hoặc ngày lập hóa đơn) |
| 2 | Action | "Check out" (thu từ khách) hoặc "Bill" (hóa đơn nhà cung cấp) |
| 3 | Received | Số tiền thu (nếu Action = Check out) |
| 4 | Paid | Số tiền trả (nếu Action = Bill) |
| 5 | Net | Số dư lũy kế sau dòng đó |

## Chức năng/nút thao tác
- **Search**: submit tìm kiếm theo khoảng ngày + BU + villa (POST).
- Không có nút thêm/sửa/xóa — đây là màn hình báo cáo/đối chiếu chỉ đọc.

## Điều hướng
- Vào từ: Menu chính (mục Electricity/Monthly Balance).
- Điều hướng đến: không có trang con.
