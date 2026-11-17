# INV-003 — Cập nhật kho vật tư

**Loại:** Trang đầy đủ

**Route:** `InventoryController::edit($id)` — `/inventory/edit/:id` (`id` được mã hóa base64 trên URL; POST để lưu)

**Module:** INV = Kho vật tư

## Mô tả ngắn gọn
Form chỉnh sửa một dòng tồn kho hiện có (`InventoryStock`): đổi đơn vị kinh doanh, đổi vật tư, hoặc điều chỉnh lại số lượng tồn kho ban đầu.

> Ghi chú: controller và view của màn hình này tồn tại đầy đủ, nhưng nút "Edit" trên INV-001 hiện đang bị comment trong giao diện (`plugins/VillaManagement/src/Template/Inventory/list.ctp` dòng ~96), nên màn hình chỉ truy cập được trực tiếp qua URL `/inventory/edit/{base64(id)}`.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `bussiness_unit` | Select2 | Có | Mặc định giá trị hiện tại |
| 2 | Vật tư | `inventory` | Select2 (danh sách `Item`) | Có | Mặc định giá trị hiện tại; kiểm tra trùng qua AJAX `inventory/check-inventory` |
| 3 | Số lượng tồn kho | `quantity` | Text/number | Có | Mặc định = `init_stock` hiện tại; giá trị mới phải ≥ số lượng đã dùng (`init_stock - available_stock`), nếu không sẽ báo lỗi và không lưu |

## Chức năng/nút thao tác
- **Save**: kiểm tra trùng cặp Đơn vị kinh doanh + Vật tư với bản ghi khác; cập nhật `InventoryStock` (điều chỉnh `available_stock` theo chênh lệch số lượng); ghi Access Log + Inventory Item Log; chuyển về INV-001.
- **Cancel**: quay về INV-001, không lưu.

## Điều hướng
- Vào từ: hiện chưa có liên kết trực tiếp trên giao diện INV-001 (xem ghi chú ở trên).
- Sau khi lưu/hủy: quay về INV-001.
