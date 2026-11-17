# BU-006 — Liên kết Villa theo kênh

**Loại:** Trang đầy đủ

**Route:** `BusinessUnitController::channelVilla($channel_id)` — mặc định `/business-unit/channel-villa/{channel_id}`

**Module:** Đơn vị kinh doanh

## Mô tả ngắn gọn
Trang hiển thị dạng lưới (card) danh sách villa của một đơn vị kinh doanh, kèm liên kết OTA (ota_link) tương ứng với kênh đang chọn — dùng để đối chiếu nhanh liên kết villa trên kênh OTA. Mở ở tab mới từ BU-005/BU-007.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Bộ lọc Đơn vị kinh doanh | `business_unit` | Select (select2) | Không | Đổi giá trị sẽ tự động submit form GET để load lại danh sách villa |

Danh sách hiển thị dạng card, mỗi card gồm:

| # | Nội dung | Field code | Ghi chú |
|---|---|---|---|
| 1 | Ảnh thumbnail villa | `image` | |
| 2 | Tên villa (link) | `name` / `ota_link` | Click mở liên kết OTA ở tab mới; nếu chưa có `ota_link` hiển thị màu cam và không có liên kết |

## Chức năng/nút thao tác
- **Chọn đơn vị kinh doanh:** lọc lại danh sách villa hiển thị theo đơn vị kinh doanh đã chọn.
- **Click tên villa:** mở liên kết OTA của villa đó (nếu có) ở tab mới.

## Điều hướng
- Mở từ: BU-005 (icon Link trên từng dòng kênh), BU-007 (tab Accounts).
- Điều hướng đến: không có (trang độc lập, mở tab mới).
