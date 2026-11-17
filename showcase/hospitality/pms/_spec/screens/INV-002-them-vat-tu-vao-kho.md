# INV-002 — Thêm vật tư vào kho

**Loại:** Trang đầy đủ

**Route:** `InventoryController::add()` — `/inventory/add` (POST)

**Module:** INV = Kho vật tư

## Mô tả ngắn gọn
Form khởi tạo một dòng tồn kho mới (`InventoryStock`) cho một cặp (Đơn vị kinh doanh, Vật tư) chưa tồn tại trong kho.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `bussiness_unit` | Select2 | Có | Danh sách giới hạn theo `selected_business` của user nếu có |
| 2 | Vật tư | `inventory` | Select2 (danh sách `Item`) | Có | Kiểm tra trùng qua AJAX `inventory/check-inventory` |
| 3 | Số lượng tồn kho | `quantity` | Text/number | Có | Gán vào cả `init_stock` và `available_stock` khi tạo mới |

## Chức năng/nút thao tác
- **Save**: kiểm tra trùng cặp Đơn vị kinh doanh + Vật tư trước khi lưu; nếu trùng báo lỗi ("Item already exists"); nếu hợp lệ lưu `InventoryStock`, ghi Access Log + Inventory Item Log, chuyển về INV-001.
- **Cancel**: quay về INV-001, không lưu.

## Điều hướng
- Vào từ: INV-001 (nút "Add New").
- Sau khi lưu/hủy: quay về INV-001.
