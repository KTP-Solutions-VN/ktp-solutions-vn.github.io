# INV-001-P1 — Điều chỉnh / xóa tồn kho

**Loại:** Popup (mở từ INV-001)

**Route:** Submit POST tới `InventoryController::list()` (`/inventory/list`, field `action` = `add-more` | `sub-more` | `delete`). Dùng chung một modal cho cả 3 thao tác.

**Module:** INV = Kho vật tư

## Mô tả ngắn gọn
Modal điều chỉnh tăng/giảm số lượng tồn kho hoặc xóa hẳn một dòng tồn kho (`InventoryStock`), mở từ các nút (+)/(-)/Xóa trên INV-001.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Lý do | `reason` | Select | Có (chỉ ở +/-, ẩn ở Xóa) | "Cộng thêm": Buy / Maintenance Return; "Giảm": Maintenance / Broken-Damaged |
| 2 | Số lượng | `quantity` | Number | Có (chỉ ở +/-, ẩn ở Xóa) | Ở "Giảm" giới hạn `max` = `available_stock` hiện tại; ở "Maintenance Return" giới hạn `max` = `in_maintenance` |
| 3 | (ẩn) ID | `id` | Hidden | — | id `InventoryStock` |
| 4 | (ẩn) Hành động | `action` | Hidden | — | `add-more` / `sub-more` / `delete` |

## Chức năng/nút thao tác
- **Cộng thêm + lý do Buy**: cộng số lượng vào cả `init_stock` và `available_stock`.
- **Cộng thêm + lý do Maintenance Return**: cộng vào `available_stock`, trừ khỏi `in_maintenance`.
- **Giảm + lý do Damaged**: trừ khỏi cả `init_stock` và `available_stock` (loại bỏ vĩnh viễn).
- **Giảm + lý do Maintenance**: trừ khỏi `available_stock`, cộng vào `in_maintenance`.
- **Xóa**: xóa hẳn bản ghi `InventoryStock`.
- Mỗi thao tác đều ghi Access Log và thêm dòng vào Inventory Item Log (INV-006).

## Điều hướng
- Mở từ: INV-001 (nút +, -, Xóa trên từng dòng tồn kho).
- Sau khi lưu: tải lại INV-001.
