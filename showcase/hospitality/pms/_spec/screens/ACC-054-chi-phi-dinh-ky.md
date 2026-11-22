# ACC-054 — Chi phí theo lịch (Scheduled Costs)

**Loại:** Trang đầy đủ

**Route:** `AccountController::recurring()` — mặc định `/account/recurring`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Cho phép người dùng chọn Business Unit, loại dịch vụ (Villa Service, ví dụ Pool/Garden) và nhà cung cấp (Provider), sau đó hiển thị danh sách Property đang áp dụng dịch vụ đó theo nhà cung cấp đã chọn để đánh dấu "đã đối soát" (reconcile) chi phí định kỳ của tháng hiện tại cho từng Property.

## Mô tả chi tiết

Bộ lọc (form GET):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (0 = All + danh sách BU theo quyền user) | Không | Đổi giá trị sẽ gọi AJAX `getProvidersList` để nạp lại danh sách Provider |
| 2 | Service Type | `service_type` | Select2 (danh sách Villa Service, ví dụ Pool/Garden) | Không | Mặc định = dịch vụ đầu tiên theo alphabet; đổi giá trị cũng gọi lại `getProvidersList` |
| 3 | Providers | `providers` | Select2 (danh sách `ServiceProvider` khớp Business Unit + Service Type đã chọn) | Có (`required`) | Nạp qua AJAX theo BU/Service Type |
| — | Search | nút bấm | Submit form GET, reload trang với query string | | |

Danh sách Property (bảng `#zero_config`, hiển thị khi đã Search):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property Name | `villa_name` | |
| 2 | Quality | `quality` | Giá trị cố định "1" |
| 3 | Amount | `amount` | Lấy từ `service_settings.price` của `VillaService` |
| 4 | Action | — | Link "Reconcile" nếu chưa đối soát tháng hiện tại (`VillaExpense.month != tháng hiện tại`), ngược lại hiện chữ "Reconciled" |

## Chức năng/nút thao tác
- **Search:** submit GET, lọc lại danh sách Property theo BU + Service Type + Provider, chỉ lấy Property có `VillaService.service_settings.provider` khớp Provider đã chọn (và loại trừ theo điều kiện `is_pool`/`is_garden`/`managed_by` tuỳ loại dịch vụ).
- **Reconcile (trên từng dòng):** gọi AJAX `saveRecouncile` (POST `villa_id`, `service_type`, `amount`, `provider_id`) để lưu/cập nhật bản ghi `VillaExpense` (`expense_type = recurring`, `month` = tháng hiện tại); thành công thì đổi chữ trên dòng thành "Reconciled" ngay tại chỗ, không reload trang.

## Điều hướng
- Vào từ: Sidebar > mục "Scheduled Costs" trong nhóm Finance & Admin / Spending.
- Điều hướng đến: không điều hướng sang trang khác — toàn bộ thao tác xử lý AJAX tại chỗ.
