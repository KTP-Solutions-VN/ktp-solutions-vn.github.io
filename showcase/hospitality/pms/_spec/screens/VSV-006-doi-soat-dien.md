# VSV-006 — Đối soát điện (Reconcile)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::reconcile()` — mặc định `/villa-services/reconcile`

**Module:** Dịch vụ villa — Điện

## Mô tả ngắn gọn
Đối soát các phiếu điện (`ElectricalBill`) đã kết thúc (end_date) trong 3 tháng gần nhất, tách thành 2 nhóm: đã đối soát xong (có end meter) và còn treo (chưa có end meter/chưa hoàn tất).

## Mô tả chi tiết

Bộ lọc: Business Unit (`business_unit`, select có "All").

Hai bảng dữ liệu:

| # | Tên cột (chung 2 bảng) | Field code | Ghi chú |
|---|---|---|---|
| 1 | Villa | `villa.name` | |
| 2 | Ngày bắt đầu / kết thúc | `start_date` / `end_date` | |
| 3 | Chỉ số đầu/cuối | `start_meter` / `end_meter` | |
| 4 | Số tiền phải thu | `bill` | |
| 5 | Số tiền đã thu | `recieved` | |
| 6 | Người thanh toán | `paid_by` → tên (`PAYMERCHANT`) | |
| 7 | Trạng thái | `meter_status` | Bảng "reconcile": có `end_meter`; bảng "outstanding": chưa có `end_meter` |

Điều kiện lấy dữ liệu: `ElectricalBill.end_date` trong khoảng `[hôm nay - 3 tháng, hôm nay)`; loại các villa có `electricity_management = no` (không quản lý điện) hoặc `inclusion = yes` (điện đã bao gồm trong giá phòng).

## Chức năng/nút thao tác
- **Lọc theo Business Unit.**
- **Đánh dấu đã đối soát** (per dòng, AJAX `updateMeterStatus`): set `meter_status = Cleared` cho phiếu điện, không có view riêng.
- Không có thao tác thêm/sửa/xóa trực tiếp trên trang này (chỉ xem và xác nhận trạng thái).

## Điều hướng
- Vào từ: Menu chính (mục Reconcile/Đối soát điện).
- Điều hướng đến: không có trang con; có liên kết ngầm tới dữ liệu tại VSV-004-P1/VSV-005-P1 (không điều hướng trực tiếp).
