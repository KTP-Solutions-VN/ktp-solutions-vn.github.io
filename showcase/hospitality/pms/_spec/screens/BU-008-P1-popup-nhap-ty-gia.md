# BU-008-P1 — Popup Nhập/Cập nhật tỷ giá

**Loại:** Popup (mở từ BU-008)

**Route:** Modal Bootstrap (`#exampleModal`) tĩnh trong `rates.ctp`; submit POST cùng action `BusinessUnitController::rates()`.

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup nhập giá trị quy đổi của một tiền tệ so với tiền tệ tham chiếu, cho kỳ (tháng) cụ thể hoặc cho dự báo (forecast) của tháng hiện tại.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại kỳ | `period_forecast_option` | Radio (`Period` / `Forecast`) | Có | Chọn Forecast sẽ ẩn ô chọn tháng |
| 2 | Kỳ (tháng) | `period` | Datepicker (chọn tháng/năm) | Có (khi Period) | Không cho chọn quá tháng hiện tại |
| 3 | Tiền tệ | `currency_id` | Select | Có | Danh sách tiền tệ không phải tham chiếu; AJAX kiểm tra `checkEuroSelection`/`getRate` để nạp sẵn giá trị đã có |
| 4 | Tỷ giá | `rate` | Number | Có | Nếu chọn đúng tiền tệ tham chiếu, khóa cứng = 1 |
| 5 | Hành động (ẩn) | `action` | Hidden | — | |
| 6 | ID (ẩn) | `id` | Hidden | — | ID bản ghi `Rate` của kỳ đang sửa (nếu có) |

## Chức năng/nút thao tác
- **Save:** lưu tỷ giá vào bản ghi `Rate` của kỳ tương ứng (cập nhật JSON `rates`), ghi log hoạt động.
- **Cancel:** đóng modal, không lưu.
- Khi đổi tiền tệ hoặc tháng, hệ thống tự động gọi AJAX `getRate` để nạp tỷ giá đã lưu trước đó (nếu có).

## Điều hướng
- Mở từ: BU-008 (bảng tỷ giá) — click vào ô tỷ giá hoặc nút thêm.
- Sau khi submit: redirect quay lại BU-008 (`referer()`).
