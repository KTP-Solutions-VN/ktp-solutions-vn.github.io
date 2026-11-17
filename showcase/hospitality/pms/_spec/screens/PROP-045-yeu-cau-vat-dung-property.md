# PROP-045 — Yêu cầu vật dụng (Inventory Request) của Property

**Loại:** Trang đầy đủ
**Route:** property/inventory-request/:villa_id
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Trang liệt kê toàn bộ yêu cầu cấp/bổ sung vật dụng (Inventory Item Request) đã gửi cho một Property, cho phép xóa yêu cầu (nếu chưa xác nhận/hoàn trả) hoặc xác nhận trả vật dụng về kho Azura (Return), tự động cập nhật lại tồn kho liên quan.

## Mô tả chi tiết

### Cột hiển thị (bảng `#zero_config`)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | STT | — | Text | — | |
| 2 | Villa Name | `villa.name` | Text | — | Qua contain Villa |
| 3 | Item Name | `item.name` | Text | — | Qua contain Item |
| 4 | Quantity Requested | `quantity` | Text | — | |
| 5 | Status | `status` | Text | — | Pending/Confirmed/Returned |
| 6 | Requested Date | `created_at` (hoặc tương đương) | Text | — | |
| 7 | Action | — | Icon-button | — | Icon Delete (chỉ hiện khi status khác Confirmed/Returned), icon Return (chỉ hiện khi status = Confirmed) |

## Chức năng/nút thao tác
- Icon Xóa (`delete_inventory`) → mở modal xác nhận, submit `action=delete`: xóa bản ghi `InventoryItemRequest`, ghi Activity Log/Inventory Log.
- Icon Trả về kho (`return_inventory`, `fa-reply`) → mở modal nhập số lượng trả, submit `action=return`: giảm `item_received` trong `VillaInventory`, tăng `available_stock` trong `InventoryStock`, tạo bản ghi `InventoryItemMovement` (từ villa về kho), cập nhật trạng thái yêu cầu thành "Returned", ghi log.

## Điều hướng
- Mở từ: PROP-044 (Quản lý vật dụng Property) — nút "All Request".
- Điều hướng tới: Không điều hướng sang trang khác (redirect lại chính trang sau khi xử lý).
- Popup con: Modal Delete/Return (không tách mã riêng vì là thao tác phụ trợ tại chỗ).
