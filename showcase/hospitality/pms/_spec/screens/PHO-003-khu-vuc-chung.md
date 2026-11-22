# PHO-003 — Album khu vực chung (Shared Space Albums)

**Loại:** Trang đầy đủ

**Route:** `PhotosController::commonAreas()` — route đẹp `/photos/common-areas` (khai báo tường minh trong `config/Routes.php`)

**Module:** PHO = Thư viện ảnh

## Mô tả ngắn gọn
Danh sách các residence có bộ ảnh khu vực chung (common area — ảnh dùng chung cho nhiều villa/unit trong cùng khu residence), tương tự PHO-002 nhưng ở cấp Residence thay vì Villa.

## Mô tả chi tiết

KPI: Residences (tổng số residence có ảnh), OTA ready (số residence có bộ OTA).

Danh sách (dạng thẻ):
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Residence (thumbnail + tên + khu vực) | `residence.name`, `district` | Click mở PHO-004 |
| 2 | Available sets | `sets` | Nút mở nhanh từng bộ ảnh, trỏ PHO-005 (residenceDetail) |
| 3 | Quick actions | - | Open (PHO-004), Upload (PHO-004 kèm anchor) |

Filter: Business Unit/Zone (`id`), Quick filter (All residences/OTA ready), tìm kiếm `q` (tên residence/quận/mã), phân trang `page`/`per_page`.

Cảnh báo: nếu bảng lưu trữ common-area chưa migrate (`storageReady = false`) hiển thị banner cảnh báo, chặn upload.

## Chức năng/nút thao tác
- **Lọc/tìm kiếm/phân trang** như PHO-002.
- **Mở residence**: sang PHO-004.
- **Mở bộ ảnh cụ thể**: sang PHO-005.
- **Upload nhanh**: mở PHO-004 với neo tới khu upload.

## Điều hướng
- Vào từ: menu Photo Library (tab "Shared Spaces" trong thanh tab điều hướng nội bộ module, cùng cấp với PHO-002 "Photo Albums" và PHO-008 "Requirements").
- Điều hướng đến: PHO-004 (residence), PHO-005 (residenceDetail).
