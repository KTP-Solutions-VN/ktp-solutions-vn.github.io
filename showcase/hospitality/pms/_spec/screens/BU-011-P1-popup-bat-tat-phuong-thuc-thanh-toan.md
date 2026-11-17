# BU-011-P1 — Popup Bật/tắt phương thức thanh toán theo Đơn vị kinh doanh

**Loại:** Popup (mở từ BU-011)

**Route:** Modal Bootstrap (`#exampleModal`) tĩnh trong `business_unit_payment_method.ctp`; toggle qua AJAX tới `getBusinessPaymentMethod` (nạp trạng thái) và `setBusinessPaymentMethod` (lưu khi bấm).

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Popup liệt kê toàn bộ phương thức thanh toán hiện có, mỗi dòng có công tắc bật/tắt (toggle) để gán/gỡ phương thức đó cho Đơn vị kinh doanh đang chọn — lưu ngay khi bấm, không cần nút Save riêng.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh (ẩn) | `business_unit_id` | Hidden | Có | |
| 2 | Danh sách phương thức thanh toán | `pm` (theo từng dòng) | Toggle icon (bật/tắt) | — | Mỗi phương thức là một dòng độc lập, click để bật/tắt |

## Chức năng/nút thao tác
- **Toggle từng phương thức:** gọi AJAX `setBusinessPaymentMethod`, thêm/xóa bản ghi `BusinessUnitPaymentMethod`, cập nhật icon ngay lập tức (không reload).

## Điều hướng
- Mở từ: BU-011 (danh sách đơn vị kinh doanh) — nút icon tiền trên từng dòng.
- Không có điều hướng trang khác; đóng popup để quay lại BU-011.
