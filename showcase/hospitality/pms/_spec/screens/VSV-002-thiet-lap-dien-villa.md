# VSV-002 — Thiết lập đo điện (Metering Setup)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::propertySetup($tab = null)` — mặc định `/villa-services/property-setup/<tab>`; tab đọc thêm qua query string (`?tab=pricing|management&business_unit_id=...&villa_id=...`)

**Module:** Dịch vụ lưu trú — Đo điện

## Mô tả ngắn gọn
Màn hình thiết lập cấu hình điện cho từng villa: quản lý điện có/không, quy tắc giá (theo kWh / hạn mức miễn phí / giá cố định theo ngày), cấu hình giá theo từng kênh OTA, thông tin villa (loại, khu vực, chủ sở hữu). Có 2 tab chính: **Management** (bật/tắt quản lý điện cho villa) và **Pricing** (thiết lập giá điện theo villa/kênh đặt phòng).

## Mô tả chi tiết

Bộ lọc chung: Business Unit (`business_unit_id`, select, kèm option "All"), Property/Villa (`villa_id`, select).

**Tab Management** — bảng danh sách villa:

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property | `Villa.name` | |
| 2 | Trạng thái | `Villa.status` | |
| 3 | Loại villa | `villa_type_id` → tên (`VillaType`) | |
| 4 | Chủ sở hữu | `Owner.family_name` | |
| 5 | Khu vực | `VillaLocation.area_id` → tên (`Area`) | |
| 6 | Hành động | — | Bật/tắt quản lý điện cho villa (gọi lại chính action với `?request=1&villa_id=`, set `service_settings.electricity_management = no`) |

**Tab Pricing** — bảng theo villa × kênh đặt phòng (`BookingPlatform`), mỗi ô hiển thị kiểu thiết lập giá:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Payment Setting Type | `payment_setting_type` | Select: Collect-Fixed / Collect-Quota / Collect-kWh / Platform-Separate / Platform-Rental / Combined-Separate / Combined-Rental | Có | Quyết định các field nhập bên dưới |
| 2 | Amount (Collect-Fixed/Platform-*) | `data[...][amount]` | Số | Có (theo kiểu) | Đơn vị theo tiền tệ BU |
| 3 | Free Quota kWh (Collect-Quota) | `data[...][free_quota]` | Số | Có (theo kiểu) | |
| 4 | Cost above kWh quota | `data[...][cost_above_kwh_quota]` | Số | Có (theo kiểu) | |
| 5 | Cost per kWh (Collect-kWh) | `data[...][cost_per_kwh]` | Số | Có (theo kiểu) | |
| 6 | Included quota amount/kWh (Combined-*) | `data[...][included_quota_amount]`, `included_quota_kwh]` | Số | Có (theo kiểu) | |
| 7 | Bộ lọc "Pricing set" | `pricing_set` | Select: All/Full/Partial/No (bản không live) hoặc Yes/No (bản live) | — | Lọc villa đã/chưa cấu hình đủ giá cho tất cả kênh |
| 8 | Bộ lọc "Price type" | `price_type[]` | Checkbox nhiều chọn (`free_quota`, `price`, `fixed_daily`) | — | |

## Chức năng/nút thao tác
- **Bật/tắt Electricity management theo villa** (tab Management): lưu vào `VillaService.service_settings` (serialize PHP).
- **Lưu Pricing:** submit bảng giá cho nhiều villa/kênh cùng lúc (`request_data['request_data'][villa_id][platform_id]`); ghi/khoá bản ghi `VillaElectricityRate` hiện hành, tự đóng (`end_date`) bản ghi giá cũ trước khi tạo bản ghi mới (lưu lịch sử giá theo thời gian).
- Lọc theo Business Unit / Property / Pricing set / Price type (submit GET).

## Điều hướng
- Vào từ: VSV-001 (tile "Metering Setup").
- Điều hướng đến: không có màn hình con; lưu xong load lại chính trang này (`$this->redirect($this->referer())`).
