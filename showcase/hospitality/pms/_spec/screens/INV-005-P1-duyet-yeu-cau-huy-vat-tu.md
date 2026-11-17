# INV-005-P1 — Duyệt yêu cầu hủy vật tư

**Loại:** Popup (mở từ INV-005)

**Route:** Submit POST tới `InventoryController::discard()` (`/inventory/discard`)

**Module:** INV = Kho vật tư

## Mô tả ngắn gọn
Modal xác nhận duyệt một yêu cầu hủy vật tư hỏng tại villa, trừ số lượng khỏi tồn kho của villa đó.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Số lượng | `quantity` | Text/number | Có | Mặc định = số lượng yêu cầu hủy; hiển thị thêm dòng "Tổng số lượng khả dụng là {available_stock}" |
| 2 | (ẩn) ID | `id` | Hidden | — | id `InventoryDiscardRequest` |

## Chức năng/nút thao tác
- **Approve (Save)**: trừ số lượng khỏi `VillaInventory.available_stock` tương ứng; cập nhật `InventoryDiscardRequest.status = Confirmed`; ghi Access Log và Inventory Item Log.
- **Cancel**: đóng modal, không lưu.

## Điều hướng
- Mở từ: INV-005 (nút Duyệt).
- Sau khi duyệt: tải lại INV-005.
