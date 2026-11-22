# CMS-014 — Điểm đến trang tổng hợp (Aggregator Destinations)

**Loại:** Trang đầy đủ

**Route:** `CmsController::destinationGlobal()` — mặc định `/cms/destination-global`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Danh sách toàn bộ điểm đến (`District`, kèm Country/Region) tương tự CMS-012, nhưng dùng để chỉnh nội dung điểm đến ở phạm vi "Guest Collection" (website tổng hợp, không gắn riêng theo villa) — dữ liệu chỉnh sửa lưu ở model `GuestCollectionDestination`. Không phân trang server-side.

## Mô tả chi tiết

Danh sách (bảng dữ liệu):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | (tính trên client) | |
| 2 | Quốc gia | `Country.name` | |
| 3 | Vùng/Region | `Region.name` | |
| 4 | Quận/Huyện (District) | `District.name` | |
| 5 | Ngày tạo | `District.created_at` | Định dạng `d M Y H:i` |
| 6 | Hành động | — | Nút Edit |

Sắp xếp mặc định: Quốc gia → Vùng → District (tăng dần). Không có filter/tìm kiếm server-side, không phân trang server-side.

## Chức năng/nút thao tác
- **Edit:** điều hướng đến CMS-015 (`/cms/destination-global-edit/:district_id`) để chỉnh nội dung/ảnh giới thiệu điểm đến trong Guest Collection.

## Điều hướng
- Vào từ: CMS-005 (Khối nội dung dùng chung, nút "Aggregator Destinations").
- Điều hướng đến: CMS-015 (sửa nội dung điểm đến — Guest Collection).
