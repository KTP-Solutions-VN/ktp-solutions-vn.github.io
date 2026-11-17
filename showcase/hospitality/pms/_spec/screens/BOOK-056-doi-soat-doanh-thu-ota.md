# BOOK-056 — Đối soát doanh thu/hoa hồng OTA (OTA Share)

**Loại:** Trang đầy đủ (mở từ BOOK-054)
**Route:** Booking/otaShare (mặc định: `/booking/ota-share`)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Báo cáo đối soát tỷ trọng đặt phòng, doanh thu ròng (net) và hoa hồng (commission) theo từng kênh OTA cho một villa trong khoảng thời gian chọn, có biểu đồ tròn (pie chart) và bảng so sánh kỳ hiện tại/kỳ trước.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select2 | Không | |
| 2 | Villa | `villa_id` | Select2 | Có | Villa cần đối soát |
| 3 | Khoảng ngày | `date_range` | Date range picker | Không | Lọc theo check-in/check-out |

### Hiển thị
| # | Cột/Thành phần | Ghi chú |
|---|---|---|
| 1 | Biểu đồ tròn | Tỷ trọng OTA theo commission |
| 2 | Bảng 1 | OTA, Commission |
| 3 | Bảng 2 | OTA, Kỳ hiện tại, Xếp hạng (Rank), Kỳ trước, Biến động (Variation) |

## Chức năng/nút thao tác
- Lọc theo BU/villa/khoảng ngày
- Điều hướng nhanh khoảng ngày theo tháng (nút mũi tên trái/phải)

## Điều hướng
- Mở từ: BOOK-054 (OTA) > nút "Share"
