# VCS-002 — Bậc giá (Rate Tiers)

**Loại:** Trang đầy đủ
**Route:** villa-common-setting/price-categories (dashed mặc định: `/villa-common-setting/price-categories`)
**Module:** VCS = Thuộc tính tài sản

## Mô tả ngắn gọn
Màn hình quản lý dữ liệu chủ "Hạng mục giá" (Price Category) dùng để phân loại các mức giá dịch vụ/villa trong hệ thống. Hiển thị dạng bảng danh sách, cho phép Thêm/Sửa/Xóa qua 1 popup dùng chung.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | No (STT) | — | Số | Không | Sinh tự động theo vòng lặp |
| 2 | Name (Tên hạng mục giá) | `name` | Text | Không (chỉ hiển thị) | |
| 3 | Description (Mô tả) | `description` | Text | Không (chỉ hiển thị) | |
| 4 | Created (Ngày tạo) | `created_at` | Datetime (`d M Y H:i`) | Không (chỉ hiển thị) | |
| 5 | Action | — | Nút Edit/Delete | — | Mở popup VCS-002-P1 |

Danh sách được sắp xếp theo `description asc` (server-side), không có ô tìm kiếm/lọc riêng.

## Chức năng/nút thao tác
- Nút "Add new" (`.add_inventory`) → mở popup VCS-002-P1 ở chế độ Thêm mới.
- Nút Edit (icon bút, `.edit_inventory`) trên từng dòng → mở popup VCS-002-P1 ở chế độ Sửa.
- Nút Delete (icon thùng rác, `.delete_inventory`) trên từng dòng → mở popup VCS-002-P1 ở chế độ Xác nhận xóa.
- Submit form popup gửi `POST` về chính action `priceCategories`; controller lưu/xóa bảng `PriceCategory`, ghi Activity Log, hiển thị Flash message, sau đó redirect về trang trước (`referer()`).

## Điều hướng
- Mở từ: Menu Portfolio Setup > "Property Attributes" (Thuộc tính tài sản) > submenu "Rate Tiers".
- Điều hướng tới: không điều hướng sang trang khác.
- Popup con: VCS-002-P1 (Form bậc giá).
