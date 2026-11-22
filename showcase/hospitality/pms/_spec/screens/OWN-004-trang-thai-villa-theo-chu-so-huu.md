# OWN-004 — Trạng thái tài sản của chủ nhà (Owner Property Status)

**Loại:** Trang đầy đủ

**Route:** `/Owner/status/{tab}` (controller `Owner`, action `status($tab)`)

**Module:** Quan hệ chủ nhà (Admin)

## Mô tả ngắn gọn

Màn hình tổng hợp trạng thái vận hành của một villa theo góc nhìn chủ sở hữu: tình trạng cho thuê theo ngày (rental), lịch sử làm vườn (garden), vệ sinh hồ bơi (pool), check-out, lịch sử thay đổi giá (rates-logs), lịch dọn dẹp (cleaning) và các khoản chi phí/hoá đơn (receipts) — hiển thị dưới dạng các tab dữ liệu tải qua AJAX theo villa và ngày được chọn.

## Mô tả chi tiết

### Bộ lọc chung

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | Không | Đổi sẽ load lại danh sách villa |
| 2 | Villa | `villa` | Select2 | Không | Villa thuộc business unit đã chọn |

### Các tab dữ liệu

| # | Tab | Field code | Nguồn dữ liệu (ajax) | Ghi chú |
|---|---|---|---|---|
| 1 | Rental | `rental` | `getVillaStatusAjax` | Tình trạng phòng/villa theo ngày trong tháng |
| 2 | Garden | `garden` | `getGardenCleanings` | Lịch sử làm vườn đã hoàn thành: ngày, người thực hiện, dịch vụ, giờ bắt đầu/kết thúc, tài liệu PDF |
| 3 | Pool | `pool` | `getPoolCleanings` | Lịch sử vệ sinh hồ bơi |
| 4 | Check-out | `check-out` | `getCheckOut` | Danh sách check-out |
| 5 | Rates-logs | `rates-logs` | `getRatesLogs` | Lịch sử thay đổi giá phòng/hoa hồng |
| 6 | Cleaning | `cleaning` | `getCleaningData` | Lịch dọn dẹp |
| 7 | Receipts | `receipts` | `getClaimExpenseData` | Danh sách khoản chi (claim expense) tính cho chủ sở hữu: người duyệt, số tiền, ngày, nhà cung cấp, mô tả, trạng thái, hoá đơn |

## Chức năng/nút thao tác

- **Lọc theo Business Unit/Villa**: tải lại dữ liệu tab đang active.
- **Đồng bộ đặt phòng** (nút Sync, tab Rental): gọi `GetBooking/index` để đồng bộ booking.
- **Xem bình luận** (icon, tab Rental): mở modal nhỏ trong trang hiển thị nội dung ghi chú (comment) của một ngày/villa.
- **Xem chi tiết dịch vụ vườn** (icon mắt, tab Garden): mở OWN-004-P1.
- **Tải PDF báo cáo vườn** (icon tải, tab Garden): tải file PDF (action `downloadFile`).
- **Xem chi tiết claim** (icon mắt, tab Receipts): mở OWN-004-P2 (mở ở tab trình duyệt mới).
- **Tải hoá đơn** (icon tải, tab Receipts): tải file hoá đơn đính kèm.

## Điều hướng

- Vào từ: menu chính (sidebar) mục liên quan tới Owner Property Status, hoặc điều hướng nội bộ có `bu_id`/`villa_id` trên query string.
- Đi tới:
  - OWN-004-P1 — Chi tiết lượt chăm vườn (tab Garden)
  - OWN-004-P2 — Chi tiết chi phí chủ nhà (tab Receipts)
