# OTA-001 — Nội dung Listing của một kênh OTA (Listing Content)

**Loại:** Trang đầy đủ

**Route:** `OtaContentController::listing($platformId)` — mặc định `/ota-content/listing/:platformId`

**Module:** OTA = Nội dung OTA

## Mô tả ngắn gọn
Quản lý các "Content Element" (đoạn nội dung mô tả chuẩn hóa) được gán vào phần listing của một kênh OTA (Booking Platform) cụ thể, nhóm theo phạm vi (scope): Property, Unit, Residence, Shared, Account. Chỉ Superadmin được truy cập.

## Mô tả chi tiết

Danh sách (theo từng khối scope):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Thứ tự | `order_number` (kéo-thả) | Kéo-thả để sắp xếp lại trong cùng scope, lưu qua AJAX `reorderListing` |
| 2 | Content Element | `name` | Tên phần tử nội dung |
| 3 | Nhóm (Group) | `group_key` | description/guest/policies/location/account |
| 4 | Độ dài | `max_length` | "Maximum {n} characters" hoặc "No limit" |
| 5 | Thao tác | — | Xóa khỏi listing (mở popup OTA-001-P2) |

Không có filter tìm kiếm; dữ liệu chia theo 5 khối scope cố định.

## Chức năng/nút thao tác
- **Back to platforms:** quay lại tab Platforms của màn hình Channels (`BusinessUnit::channels`, ngoài phạm vi module CMS).
- **Select Content Elements:** mở popup OTA-001-P1 để chọn/bỏ chọn các Content Element khả dụng cho OTA này.
- **Kéo-thả sắp xếp:** gọi AJAX `reorderListing/:platformId` (JSON, không có view riêng).
- **Xóa 1 phần tử khỏi listing:** mở popup OTA-001-P2 xác nhận, gọi AJAX `removeAssignment` (JSON).

## Điều hướng
- Vào từ: tab "Platforms" trên màn hình Channels (`BusinessUnit::channels`) — ngoài phạm vi module được giao.
- Điều hướng đến: OTA-001-P1 (Chọn Content Element), OTA-001-P2 (Xác nhận xóa).
