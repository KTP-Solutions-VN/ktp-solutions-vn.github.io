# BOOK-027 — Tài sản chưa có giá (Unpriced Properties)
**Loại:** Trang đầy đủ
**Route:** booking/missingRates (query `?id=<business_unit_id>`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Liệt kê các villa chưa được thiết lập giá thuê hàng ngày (villa daily price) từ ngày hiện tại đến "ngày mốc" đã cấu hình ở BOOK-027-P1, để người quản lý biết villa nào cần bổ sung giá trước khi khách có thể đặt/hiển thị trên kênh OTA.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (dropdown) | Không | Đổi giá trị sẽ điều hướng lại trang với query `?id=` tương ứng; mặc định "All" |

**Cột hiển thị danh sách:**
- Tên villa (Property) — chỉ những villa còn thiếu giá ở bất kỳ ngày nào trong khoảng [hôm nay, ngày mốc] mới xuất hiện trong danh sách.

Tiêu đề trang còn hiển thị "ngày mốc" hiện tại đang áp dụng để so sánh (lấy từ cấu hình ở BOOK-027-P1).

## Chức năng/nút thao tác
- Lọc theo Business Unit.
- Xem danh sách villa thiếu giá (không có thao tác sửa trực tiếp trên trang này — cần vào màn hình quản lý giá villa/mùa giá tương ứng để bổ sung).

## Điều hướng
- Mở từ: Menu Cài đặt (Settings) → Tài sản chưa có giá.
- Điều hướng tới: các màn hình cấu hình giá villa (BOOK-023 Trung tâm giá, BOOK-028 Lịch mùa, BOOK-030 Cập nhật giá phòng từ kênh OTA) để bổ sung giá còn thiếu.
- Popup con: BOOK-027-P1 (Cấu hình cảnh báo thiếu giá).
