# INV-004 — Yêu cầu nhập hàng (Incoming Stock Requests)

**Loại:** Trang đầy đủ

**Route:** `InventoryController::itemRequest()` — `/inventory/item-request`

**Module:** INV = Kiểm soát kho

## Mô tả ngắn gọn
Danh sách các yêu cầu nhận vật tư từ Villa (`InventoryItemRequest`), cho phép duyệt để chuyển vật tư từ kho tổng của đơn vị kinh doanh xuống villa.

## Mô tả chi tiết

**Cột hiển thị:**

| # | Cột | Nguồn dữ liệu | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Tên Villa | `Villa.name` | |
| 3 | Tên vật tư | `Item.name` | |
| 4 | Số lượng yêu cầu | `InventoryItemRequest.quantity` | |
| 5 | Ngày tạo | `InventoryItemRequest.created_at` | |
| 6 | Trạng thái | `InventoryItemRequest.status` | |
| 7 | Hành động | — | Nút Duyệt — chỉ hiện khi trạng thái khác `Confirmed`/`Returned` |

Không có bộ lọc riêng.

## Chức năng/nút thao tác
- **Duyệt (dấu tick)**: mở popup INV-004-P1 để xác nhận số lượng và duyệt chuyển kho.

## Điều hướng
- Vào từ: menu Kiểm soát kho (`active_menu = 152`).
- Điều hướng đến: popup INV-004-P1.
