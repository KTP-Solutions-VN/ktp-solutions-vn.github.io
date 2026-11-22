# PHO-004 — Khu vực chung theo khu căn hộ (Residence Shared Spaces)

**Loại:** Trang đầy đủ

**Route:** `PhotosController::residence($residenceId)` — route đẹp `/photos/residence/:id` (khai báo tường minh trong `config/Routes.php`)

**Module:** PHO = Thư viện ảnh

## Mô tả ngắn gọn
Trang chi tiết một residence: hiển thị các bộ ảnh khu vực chung hiện có (OTA/High Res/Extras/Raw-Temporary) và form upload thêm ảnh mới cho residence đó.

## Mô tả chi tiết

Form upload:
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Set type | `set_type` | Dropdown | Có | OTA / High Res / Extras / Raw-Temporary |
| 2 | Source | `source` | Hidden (mặc định Internal Team) | - | |
| 3 | Photos | `photos[]` | Upload nhiều file (kéo-thả hoặc chọn) | Có | Chỉ JPG, tối đa 1MB/ảnh, kích thước 2100x1400, đặt tên theo quy tắc chuẩn |

Khu vực hiển thị các bộ ảnh hiện có: card theo từng `set type` (OTA/High Res/Extras/Raw-Temporary), mỗi card hiển thị số lượng ảnh, nút mở chi tiết (sang PHO-005).

## Chức năng/nút thao tác
- **Upload ảnh mới**: chọn set type, kéo-thả/chọn file JPG, bấm Upload; nếu là request AJAX trả JSON, ngược lại redirect lại trang với Flash message.
- **Remove All** (trước khi upload): xoá các file đã chọn khỏi hàng đợi phía client.
- **Mở bộ ảnh cụ thể**: sang PHO-005 theo `set_type`.
- **Common Areas**: quay lại PHO-003.

## Điều hướng
- Vào từ: PHO-003 (click residence hoặc nút Upload).
- Điều hướng đến: PHO-005 (residenceDetail), PHO-003 (commonAreas).
