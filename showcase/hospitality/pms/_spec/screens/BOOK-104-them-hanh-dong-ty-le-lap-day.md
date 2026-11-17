# BOOK-104 — Thêm hành động theo tỷ lệ lấp đầy (Add Action)

**Loại:** Trang đầy đủ (mở từ BOOK-103)

**Route:** Booking/addAction (mặc định: `/booking/add-action`)

**Route đẹp:** không tìm thấy route riêng trong config/Routes.php

**Module:** Đặt phòng

## Mô tả ngắn gọn

Màn hình phân tích tỷ lệ lấp đầy (occupancy) của các villa theo đơn vị kinh doanh, loại hình villa và khoảng thời gian, sau đó cho phép nhập ghi chú "hành động" (action) cần thực hiện cho từng villa dựa trên tỷ lệ lấp đầy cao/thấp, rồi lưu thành một bản ghi Villa Action mới.

## Mô tả chi tiết

**Bước 1 — Bộ lọc phân tích:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | business_unit | Select | Có | Mặc định theo BU của user; option "All" = 0 |
| 2 | Khoảng ngày | date_range | Text (date range picker) | Có | Định dạng `DD-MM-YYYY/DD-MM-YYYY` |
| 3 | Loại villa | property_type | Select | Có | "All" = 0, danh sách Villa Category |

Nút "Analyse" gọi AJAX `getAnalysisAction` trả về: số ngày, số lượng villa, % lấp đầy trung bình, ngưỡng thấp/cao (lo_percent/hi_percent = occupancy/2 và 50+lo_percent), số villa dưới ngưỡng thấp, số villa trên ngưỡng cao, và biểu đồ đường tỷ lệ lấp đầy theo ngày (Google Charts).

**Bước 2 — Điều chỉnh ngưỡng và kiểm tra hành động:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 4 | Ngưỡng cao | high_percent | Text (input trong bảng màu) | Có | Mặc định = hi_percent từ bước phân tích |
| 5 | Ngưỡng thấp | low_percent | Text (input trong bảng màu) | Có | Mặc định = lo_percent |

Nút "Check Actions" gọi AJAX `updateHighLowOccupancy`, trả về danh sách villa kèm % lấp đầy (tô màu xanh/vàng/đỏ theo ngưỡng) và ô nhập "Action" (ghi chú hành động) cho từng villa.

**Bước 3 — Lưu:**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 6 | Ghi chú hành động theo villa | data[action][] | Text (input theo từng dòng villa) | Không | |

## Chức năng/nút thao tác

- "Analyse": chạy phân tích tỷ lệ lấp đầy (AJAX `getAnalysisAction`), vẽ biểu đồ.
- "Check Actions": tính lại danh sách villa theo ngưỡng cao/thấp đã chỉnh (AJAX `updateHighLowOccupancy`), hiện bảng villa + ô nhập hành động.
- "Save" (nút đổi id động từ "Check Actions" → "Save" sau khi bảng villa hiện ra): lưu toàn bộ dữ liệu qua AJAX `saveActionData` (tạo bản ghi `VillaAction` mới), sau đó chuyển hướng về BOOK-103.

## Điều hướng

- Mở từ BOOK-103 (nút "+ Action").
- Sau khi lưu thành công → quay về BOOK-103.
