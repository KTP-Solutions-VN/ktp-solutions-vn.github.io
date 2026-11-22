# BOOK-084 — Chạy kiểm tra giá (Run Pricing Check)

**Loại:** Trang đầy đủ
**Route:** Booking/recommendationCheck
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php
**Module:** Đặt chỗ

## Mô tả ngắn gọn
Màn hình phân tích tỷ lệ lấp đầy (occupancy) của các villa theo một bộ tiêu chí (Criteria) đã cấu hình ở BOOK-080/081/082, giúp nhận diện villa cần đẩy giá/khuyến mãi (đỏ = lấp đầy thấp, xanh = lấp đầy cao) theo từng mốc thời gian Last Minute/Regular/Early Bird. Cho phép ghi log nhận xét cho từng villa.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit` | Select | Có | |
| 2 | Loại hình bất động sản | `property_type` | Select | Có | Danh mục villa (VillaCategory), có tuỳ chọn "All" |
| 3 | Tiêu chí | `criteria_id` | Select | Có | Danh sách các bộ tiêu chí đã tạo ở BOOK-080 |

### Bảng kết quả (tải qua AJAX sau khi bấm Check)
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Property | Tên villa (dòng đầu là "Average" — trung bình toàn bộ) |
| 2 | Last Minute | Dấu +/-/= thể hiện tỷ lệ lấp đầy so với ngưỡng (xanh/đỏ/trung tính) |
| 3 | Regular | Tương tự |
| 4 | Early Bird | Tương tự |
| 5 | Last Log | Ngày và nội dung ghi chú gần nhất cho villa đó |
| 6 | Actions | Icon sửa — mở modal thêm ghi chú |

## Chức năng/nút thao tác
- Nút **Check** — gọi AJAX `getRecommondationCheck` để tính toán và render bảng kết quả vào `#analysis_data`
- Icon **Sửa** trên từng dòng villa — mở modal "Add Log", nhập ghi chú (`comment`)
- Nút **Save** trong modal — gọi AJAX `saveRecommendationLog` để lưu ghi chú (nối vào lịch sử `log` của `RecommendationCheck`), sau đó tải lại bảng kết quả

## Điều hướng
- Mở từ: BOOK-083 (Tín hiệu điều chỉnh giá) — nút "Check"
- Điều hướng tới: không có trang con; thao tác ghi log qua modal trong cùng trang

**Ghi chú:** `getRecommondationCheck()` (~16505) và `saveRecommendationLog()` (~16638) là các action AJAX trả JSON hỗ trợ trực tiếp cho màn hình này, không có view riêng nên không tách file.
