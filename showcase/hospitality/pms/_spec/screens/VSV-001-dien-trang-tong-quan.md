# VSV-001 — Điện: Trang tổng quan (Hub)

**Loại:** Trang đầy đủ (hub điều hướng dạng tile)

**Route:** `VillaServicesController::list()` — mặc định `/villa-services/list`

**Module:** Dịch vụ villa — Điện

## Mô tả ngắn gọn
Trang hub của phân hệ Điện, gom các màn hình con theo 3 nhóm (Set-up, Charges, Controls) dưới dạng thẻ (tile) để điều hướng nhanh. Đây không phải trang thao tác dữ liệu, chỉ là điểm vào (entry point) của module Điện.

## Mô tả chi tiết
Không có bảng dữ liệu hay bộ lọc. Bố cục gồm 3 khối (section), mỗi khối có nhiều "tile" (icon + tiêu đề + mô tả ngắn):

| # | Khối | Tile | Trạng thái liên kết |
|---|---|---|---|
| 1 | 1. Set-up | Electricity Set-up | Có liên kết → VSV-002 (`propertySetup`) |
| 2 | 2. Charges | Long Stay Charges | `javascript:void(0)` — chưa gắn màn hình (placeholder) |
| 3 | 2. Charges | Payment to Providers | `javascript:void(0)` — chưa gắn màn hình (placeholder) |
| 4 | 2. Charges | Payments from Guests | `javascript:void(0)` — chưa gắn màn hình (placeholder) |
| 5 | 2. Charges | Balance | `javascript:void(0)` — chưa gắn màn hình (placeholder) |
| 6 | 3. Controls | Check-in | Có liên kết → VSV-011 (`electricityCheckInControl`) |
| 7 | 3. Controls | Check-out | Có liên kết → VSV-012 (`electricityCheckOutControl`) |
| 8 | 3. Controls | Stats | `javascript:void(0)` — chưa gắn màn hình (placeholder) |

## Chức năng/nút thao tác
- Click vào từng tile để điều hướng tới màn hình tương ứng; các tile ghi `javascript:void(0)` hiện chưa được kết nối (tính năng dự kiến bổ sung sau: Long Stay Charges, Payment to Providers, Payments from Guests, Balance, Stats).
- Không có nút thêm/sửa/xóa dữ liệu trên trang này.

## Điều hướng
- Vào từ: Menu chính (mục "Electricity"/Điện trong sidebar).
- Điều hướng đến: VSV-002 (Thiết lập điện villa), VSV-011 (Kiểm soát check-in điện), VSV-012 (Kiểm soát check-out điện).
