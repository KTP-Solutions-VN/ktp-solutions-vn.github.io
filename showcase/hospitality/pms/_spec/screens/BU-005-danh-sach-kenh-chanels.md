# BU-005 — Kênh bán hàng (Sales Channels)

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::chanels()` — mặc định `/business-unit/chanels`

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Danh sách kênh bán/kênh thanh toán (Chanel) gắn với các đơn vị kinh doanh — dùng để cấu hình đối tác nhận/trả tiền (manager, tài khoản nhận thanh toán, kiểu thanh toán). Đây là màn hình quản lý kênh phiên bản cũ; phiên bản mới hơn có gộp thêm Booking Platform và OTA Content Elements ở BU-007.

## Mô tả chi tiết

Danh sách (DataTable):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tên kênh | `name` | |
| 3 | Ownership | `ownership` | `Azura Stays` / `Partner` |
| 4 | Ngày tạo | `created_at` | |
| 5 | Hành động | — | Sửa, Xóa |

## Chức năng/nút thao tác
- **Add new:** mở popup BU-005-P1 ở chế độ Thêm mới.
- **Sửa (icon bút):** mở popup BU-005-P1 ở chế độ Sửa, nạp sẵn dữ liệu.
- **Xóa (icon thùng rác):** mở popup BU-005-P2 xác nhận xóa.
- Ghi log hoạt động cho cả 3 thao tác thêm/sửa/xóa.

## Điều hướng
- Vào từ: menu Đơn vị vận hành > Kênh bán hàng (Sales Channels).
- Điều hướng đến: BU-005-P1 (popup thêm/sửa kênh), BU-005-P2 (popup xác nhận xóa).
