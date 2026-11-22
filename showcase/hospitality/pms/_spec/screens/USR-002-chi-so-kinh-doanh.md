# USR-002 — Bảng điểm doanh thu (Revenue Scorecard)

**Loại:** Trang đầy đủ

**Route:** `UserController::indicators()` — mặc định `user/indicators`

**Module:** Đăng nhập & Đội ngũ

## Mô tả ngắn gọn
Màn hình báo cáo/biểu đồ doanh thu (quá khứ và tương lai) theo business unit, kênh bán, loại doanh thu và khoảng thời gian, dành cho Superadmin/Admin/Business Unit Manager theo dõi hiệu quả kinh doanh của villa. Dữ liệu được tổng hợp từ booking, quy đổi theo tiền tệ tham chiếu.

## Mô tả chi tiết

| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Từ ngày | `from` | Text (date picker) | Có | Mặc định 01/01 năm hiện tại |
| 2 | Đến ngày | `to` | Text (date picker) | Có | Mặc định 31/12 năm hiện tại |
| 3 | Loại sở hữu | `owner_ship_type` | Select | Không | Nguồn: `Azura Stays`, `Partner`, `All` |
| 4 | Tiền tệ | `currency` | Select2 | Có | Nguồn: bảng `Currency`; mặc định tiền tệ tham chiếu (`is_reference_currency=1`) |
| 5 | Business Unit / Khu vực | `business_unit[]` | Select2 multiple | Không | Nguồn: business unit theo quyền của user + zone (`BusinessUnitZone`) |
| 6 | Kênh bán (Channel) | `chanel[]` | Select2 multiple | Không | Nguồn: bảng `Chanel` + "Direct Booking", "All" |
| 7 | Loại doanh thu | `revenue_type` | Select2 | Có | Gross revenue / Net revenue / Gross margin / Owner revenue |

Kết quả hiển thị dạng biểu đồ/bảng theo tháng: doanh thu quá khứ (`past_amount`), doanh thu tương lai (`future_amount`), tổng cộng.

## Chức năng/nút thao tác
- **Lọc/Xem báo cáo (submit form POST):** tính lại số liệu theo điều kiện đã chọn.
- Không có chức năng thêm/sửa/xoá — đây là màn hình chỉ xem (read-only report).

## Điều hướng
- Vào từ: menu chính (mục Revenue Scorecard), sau khi đăng nhập.
- Điều hướng đến: không có điều hướng con.
