# BU-008 — Tỷ giá ngoại tệ (FX Rates)

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::rates()` — mặc định `/business-unit/rates`

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Bảng tỷ giá quy đổi giữa tiền tệ tham chiếu (reference currency) và các tiền tệ khác theo từng kỳ (tháng), có hỗ trợ nhập tỷ giá dự báo (forecast) cho kỳ hiện tại.

## Mô tả chi tiết

Bảng tỷ giá (theo hàng = kỳ, cột = từng tiền tệ không phải tham chiếu):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Kỳ (Period) | `period` | Định dạng tháng/năm, sắp xếp giảm dần |
| 2..n | Từng tiền tệ | `rates[currency_id]` (JSON) | Giá trị quy đổi theo tiền tệ tham chiếu; click để sửa |

Thông tin bổ sung: dòng "Forecast" (dự báo tháng hiện tại) hiển thị riêng, cảnh báo `is_rate_set = false` nếu chưa nhập đủ tỷ giá cho tất cả tiền tệ trong năm hiện tại. Có liên kết tới website tham khảo tỷ giá (`forex_rates_website` — cấu hình tại Setting).

## Chức năng/nút thao tác
- **Click vào một ô tỷ giá / nút "Add rate":** mở popup BU-008-P1 để nhập hoặc cập nhật tỷ giá theo kỳ hoặc theo dự báo (forecast).
- Tỷ giá của tiền tệ tham chiếu luôn cố định = 1 (không sửa được).

## Điều hướng
- Vào từ: BU-007 (danh sách tiền tệ) — nút "Rates".
- Điều hướng đến: BU-008-P1 (popup nhập/cập nhật tỷ giá).
