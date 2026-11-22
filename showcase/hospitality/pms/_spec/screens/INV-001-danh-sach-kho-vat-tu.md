# INV-001 — Mức tồn kho (Stock Levels)

**Loại:** Trang đầy đủ

**Route:** `InventoryController::list()` — `/inventory/list`

**Module:** INV = Kiểm soát kho

## Mô tả ngắn gọn
Danh sách tồn kho vật tư (`InventoryStock`) theo từng đơn vị kinh doanh, cho phép nhập thêm, xuất giảm hoặc xóa một dòng tồn kho.

## Mô tả chi tiết

**Cột hiển thị:**

| # | Cột | Nguồn dữ liệu | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tên vật tư | `Item.name` | |
| 3 | Đơn vị kinh doanh | `BusinessUnit.name` | |
| 4 | Tồn kho ban đầu | `InventoryStock.init_stock` | |
| 5 | Tồn kho khả dụng | `InventoryStock.available_stock` | |
| 6 | Đang bảo trì | `InventoryStock.in_maintenance` | |
| 7 | Ngày tạo | `InventoryStock.created_at` | |
| 8 | Hành động | — | Nút (+), (-), Xóa |

Không có bộ lọc riêng — hiển thị toàn bộ tồn kho.

## Chức năng/nút thao tác
- **Add New**: chuyển sang INV-002 (Thêm mặt hàng).
- **(+) Cộng thêm tồn kho**: mở popup INV-001-P1 ở chế độ "Cộng thêm" (add-more).
- **(-) Giảm tồn kho**: mở popup INV-001-P1 ở chế độ "Giảm" (sub-more).
- **Xóa**: mở popup INV-001-P1 ở chế độ "Xóa" (delete).
- Mọi thao tác đều ghi Access Log và Inventory Item Log (xem tại INV-006).

## Điều hướng
- Vào từ: menu Kiểm soát kho (`active_menu = 151`).
- Điều hướng đến: INV-002, popup INV-001-P1.
