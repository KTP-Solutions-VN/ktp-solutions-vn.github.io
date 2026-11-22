# BOOK-055 — Kiểm tra đồng bộ listing (Listing Sync Check)

**Loại:** Trang đầy đủ (mở từ BOOK-054)
**Route:** Booking/otaListing (mặc định: `/booking/ota-listing`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Kiểm tra villa nào CHƯA được liên kết (link) với một kênh OTA cụ thể, dựa trên cấu hình liên kết OTA của villa (`VillaOtaManagement`). Dùng để phát hiện villa còn thiếu cấu hình đồng bộ với kênh bán phòng.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select2 | Không | |
| 2 | Kênh OTA | `ota` | Select (bắt buộc chọn) | Có | Danh sách Channel (Chanel) |

### Kết quả
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Property | Danh sách villa chưa liên kết với kênh OTA đã chọn |

## Chức năng/nút thao tác
- Chọn BU và kênh OTA rồi bấm **Check** để xem danh sách villa chưa liên kết

## Điều hướng
- Mở từ: BOOK-054 (Bộ công cụ kênh) > nút "Listing"
- Điều hướng tới: không (thao tác liên kết OTA thực hiện ở màn hình cấu hình villa, ngoài module Đặt chỗ)
