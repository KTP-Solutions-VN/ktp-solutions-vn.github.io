# BU-011 — Phương thức thanh toán theo đơn vị (Payment Methods per Unit)

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::businessUnitPaymentMethod()` — mặc định `/business-unit/business-unit-payment-method`

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Danh sách tất cả Đơn vị kinh doanh, cho phép mở popup bật/tắt nhanh (toggle) từng phương thức thanh toán áp dụng cho từng đơn vị. Đây là phiên bản rút gọn/khác của việc gán phương thức thanh toán so với tab "Phương thức thanh toán" tại BU-010.

## Mô tả chi tiết

Danh sách (DataTable):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tên đơn vị kinh doanh | `name` | |
| 3 | Ngày tạo | `created_at` | |
| 4 | Hành động | — | Nút mở popup gán phương thức thanh toán |

## Chức năng/nút thao tác
- **Payment methods** (nút icon tiền): mở popup BU-011-P1 để bật/tắt phương thức thanh toán áp dụng cho đơn vị kinh doanh tương ứng.
- Nút "Payment methods" ở đầu trang: điều hướng sang BU-010 (Thiết lập thanh toán).

## Điều hướng
- Vào từ: menu Settings; hoặc từ BU-010.
- Điều hướng đến: BU-010, BU-011-P1 (popup bật/tắt phương thức thanh toán).
