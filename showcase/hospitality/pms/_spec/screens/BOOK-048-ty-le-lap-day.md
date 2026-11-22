# BOOK-048 — Công suất theo tài sản (Occupancy by Property)

**Loại:** Trang đầy đủ (có thể nhúng/chia sẻ cho đối tác — public widget theo `referer`/`bu`)
**Route:** Booking/occupancy/:string? (mặc định: `/booking/occupancy`)
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Trang thống kê tỷ lệ lấp đầy (occupancy) của villa theo tháng, lọc theo đơn vị kinh doanh hoặc quận (district), loại villa, hạng villa, hiển thị dạng bảng theo tháng kèm giá.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại lọc | `type` | Select | Không | "business" (theo đơn vị kinh doanh) / "district" (theo quận) |
| 2 | Hạng villa | `villa_category` | Select | Không | |
| 3 | Đơn vị kinh doanh | `business_unit` | Select | Không | |
| 4 | Vị trí/Địa chỉ | `location`/`address` | Select/Text | Không | |
| 5 | Đối tác (Referer) | `referer` | Query param | Không | Đổi logo thương hiệu hiển thị |

### Hiển thị
Bảng tỷ lệ lấp đầy theo tháng (`monthly_text`, `occupancy_text`) cho từng villa, kèm giá.

## Chức năng/nút thao tác
- Lọc theo loại (business/district), hạng villa, đơn vị kinh doanh
- Nút **Book** — chuyển sang luồng đặt phòng
- Nút **Download** — tải báo cáo tỷ lệ lấp đầy

## Điều hướng
- Mở từ: Menu module Đặt chỗ > Occupancy by Property, hoặc link chia sẻ trực tiếp cho đối tác
- Điều hướng tới: luồng đặt phòng khi bấm Book
