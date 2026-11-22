# ACC-058-P1 — Form mặt hàng (Goods Item Form)

**Loại:** Popup (mở từ ACC-058)

**Route:** `AccountController::addProduct($id)` — mặc định `/account/add-product/<id>`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Form thêm mới/sửa một Sản phẩm, dùng chung 1 action cho cả hai trường hợp (có `id` = sửa).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Name | `name` | Text | Có (`required`) | |
| 2 | Category | `product_category` | Select2 (`ProductCategory` loại product) | Có (`required`) | |
| 3 | Reference | `reference` | Text | Có (`required`) | |
| 4 | Barcode | `barcode_image` | Upload ảnh (tỉ lệ 1:1, tối đa 1 MB) | Không | Xem trước ảnh |
| 5 | Description | `description` | Textarea | Có (`required`) | |
| 6 | Photo | `image` / `cropped_image` | Upload ảnh (tỉ lệ 2:3, tối đa 1 MB, tự crop nếu lệch tỉ lệ) | Không | Xem trước ảnh |
| 7 | Pieces Per Package | `pieces_per_package` | Text | Có (`required`) | |
| 8 | Currency | `currency` | Select2 (`Currency`) | Có (`required`) | |
| 9 | Price | `price` | Text | Có (`required`) | |
| 10 | Status | `status` | Select: Active/Inactive | Có (`required`) | |
| 11 | Business Units | `business_units[]` | Checkbox nhiều lựa chọn | Có (`required`, validate JS) | |

## Chức năng/nút thao tác
- **Save/Update (nhãn đổi theo add/edit):** submit POST tới chính action `addProduct`; server lưu `Product` (`type=product`), xử lý upload/crop ảnh + barcode, ghi access log, redirect về ACC-058 (`products`).
- **Cancel:** quay lại ACC-058 (`products`).

## Điều hướng
- Vào từ: ACC-058 (Danh mục hàng hóa) — nút "Add new" hoặc nút Sửa trên từng dòng.
- Điều hướng đến: quay lại ACC-058 sau khi lưu hoặc hủy.
