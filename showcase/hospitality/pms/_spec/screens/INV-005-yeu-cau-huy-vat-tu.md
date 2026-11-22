# INV-005 — Yêu cầu xóa sổ hàng (Write-off Requests)

**Loại:** Trang đầy đủ

**Route:** `InventoryController::discard()` — `/inventory/discard`

**Module:** INV = Kiểm soát kho

## Mô tả ngắn gọn
Danh sách các yêu cầu hủy/loại bỏ vật tư do hỏng (`InventoryDiscardRequest`) phát sinh tại villa, cho phép duyệt để trừ khỏi tồn kho villa.

## Mô tả chi tiết

**Cột hiển thị:**

| # | Cột | Nguồn dữ liệu | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tên Villa | `VillaInventory.Villa.name` | |
| 3 | Tên vật tư | `VillaInventory.Item.name` | |
| 4 | Số lượng yêu cầu | `InventoryDiscardRequest.quantity` | |
| 5 | Ngày tạo | `InventoryDiscardRequest.created_at` | |
| 6 | Trạng thái | `InventoryDiscardRequest.status` | |
| 7 | Hành động | — | Nút Duyệt — chỉ hiện khi trạng thái khác `Confirmed`/`Returned` |

Không có bộ lọc riêng.

## Chức năng/nút thao tác
- **Duyệt (dấu tick)**: mở popup INV-005-P1 để xác nhận số lượng và duyệt hủy vật tư.

## Điều hướng
- Vào từ: menu Kiểm soát kho (`active_menu = 153`).
- Điều hướng đến: popup INV-005-P1.
