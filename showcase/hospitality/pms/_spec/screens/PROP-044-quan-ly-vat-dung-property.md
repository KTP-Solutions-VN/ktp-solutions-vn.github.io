# PROP-044 — Vật tư tại chỗ (On-site Stock)

**Loại:** Trang đầy đủ
**Route:** property/inventories/:villa_id
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang liệt kê vật dụng/vật tư (inventory) hiện có tại một Property: tồn kho ban đầu, tồn kho khả dụng, số lượng đã nhận. Cho phép báo hư hỏng/thất thoát (tạo yêu cầu loại bỏ vật tư gửi admin) hoặc xóa vật dụng khỏi Property.

## Mô tả chi tiết

### Cột hiển thị (bảng `#zero_config`)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | STT | — | Text | — | |
| 2 | Name | `item.name` | Text | — | Tên vật dụng (qua contain Item) |
| 3 | Initial Stock | `initial_stock`/`quantity` | Text | — | |
| 4 | Available Stock | `available_stock` | Text | — | |
| 5 | Received Item | `item_received` | Text | — | |
| 6 | Action | — | Icon-button | — | Icon "Damaged/Remove" (mở modal), Icon "Delete" (mở modal xóa) |

### Modal thao tác vật dụng (`#exampleModal`)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Remark | `remark` | Select | Không | Lý do (danh sách `$remark_array`) |
| 2 | Stock Quantity | `quantity` | Text | Có (class `required`) | Số lượng báo hư hỏng/loại bỏ |
| 3 | Action (ẩn) | `action` | Hidden | — | Giá trị `delete` hoặc `damaged` tùy nút bấm |
| 4 | Id (ẩn) | `id` | Hidden | — | Id bản ghi VillaInventory |

## Chức năng/nút thao tác
- Nút "All Request" → điều hướng tới PROP-045 (Yêu cầu vật tư) tại `inventory-request/:villa_id`.
- Icon Xóa (`delete_inventory`) → mở modal xác nhận, submit `action=delete`: xóa bản ghi `VillaInventory`, ghi Activity Log và Inventory Log.
- Icon Báo hư hỏng (`damaged`) → mở modal nhập số lượng + lý do, submit `action=damaged`: tạo bản ghi `InventoryDiscardRequest` gửi yêu cầu loại bỏ tới admin, ghi log.

## Điều hướng
- Mở từ: PROP-035 (Hồ sơ tài sản) hoặc menu On-site Stock.
- Điều hướng tới: PROP-045 (Yêu cầu vật tư — All Request).
- Popup con: Modal thao tác vật dụng (Delete/Damaged) — không tách mã riêng vì là thao tác phụ trợ tại chỗ.
