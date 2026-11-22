# INV-006 — Biến động kho (Stock Movements)

**Loại:** Trang đầy đủ

**Route:** `InventoryController::logs()` — `/inventory/logs`

**Module:** INV = Kiểm soát kho

## Mô tả ngắn gọn
Nhật ký toàn bộ hoạt động liên quan tới kho vật tư (thêm/sửa/xóa tồn kho, duyệt yêu cầu nhận, duyệt yêu cầu hủy...), lấy từ bảng `InventoryItemLog`, sắp xếp mới nhất trước.

## Mô tả chi tiết

**Cột hiển thị:**

| # | Cột | Nguồn dữ liệu | Ghi chú |
|---|---|---|---|
| 1 | STT | — | |
| 2 | Nội dung log | `InventoryItemLog.comment` | Mô tả hoạt động dạng câu văn (ai, làm gì, với vật tư/villa/đơn vị kinh doanh nào) |

Không có bộ lọc riêng.

## Chức năng/nút thao tác
- Chỉ xem, không có thao tác chỉnh sửa hay tạo mới.

## Điều hướng
- Vào từ: menu Kiểm soát kho (`active_menu = 154`).
- Không điều hướng tiếp đến màn hình khác (màn hình cuối trong luồng).
