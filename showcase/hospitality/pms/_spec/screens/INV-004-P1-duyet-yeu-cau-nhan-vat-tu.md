# INV-004-P1 — Duyệt nhập hàng (Approve Incoming Stock)

**Loại:** Popup (mở từ INV-004)

**Route:** Submit POST tới `InventoryController::itemRequest()` (`/inventory/item-request`)

**Module:** INV = Kiểm soát kho

## Mô tả ngắn gọn
Modal xác nhận duyệt một yêu cầu nhận vật tư của villa, thực hiện chuyển số lượng từ kho tổng của đơn vị kinh doanh xuống kho của villa.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Số lượng | `quantity` | Text/number | Có | Mặc định = số lượng yêu cầu; hiển thị thêm dòng "Tổng số lượng khả dụng là {available_stock}" |
| 2 | (ẩn) ID | `id` | Hidden | — | id `InventoryItemRequest` |

## Chức năng/nút thao tác
- **Approve (Save)**: cộng số lượng vào `VillaInventory.item_received` của villa; trừ `available_stock` khỏi `InventoryStock` của đơn vị kinh doanh tương ứng; ghi lịch sử chuyển kho vào `InventoryItemMovement`; cập nhật `InventoryItemRequest.status = Confirmed`; ghi Access Log và Inventory Item Log.
- **Cancel**: đóng modal, không lưu.

## Điều hướng
- Mở từ: INV-004 (nút Duyệt).
- Sau khi duyệt: tải lại INV-004.
