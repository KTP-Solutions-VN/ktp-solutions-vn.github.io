# BOOK-074 — Nhật ký giá theo mùa

**Loại:** Trang đầy đủ (có 2 chế độ hiển thị trên cùng 1 view)
**Route:** Booking/seasonPriceLogs (mặc định: `/booking/season-price-logs`)
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Trang đối chiếu giá bán villa trên hệ thống nội bộ (VM/PMS) với giá đang niêm yết trên kênh OTA (Beds24) theo từng mùa giá, phát hiện chênh lệch/thiếu đồng bộ; đồng thời cho phép xem chi tiết doanh thu/biến động giá của một mùa giá cụ thể (chế độ "Season Revenue").

## Mô tả chi tiết

### Bộ lọc
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select | Không | |
| 2 | Villa | `villa_id` | Select | Không | Mặc định là villa đầu tiên trong phạm vi phân quyền |

### Chế độ 1 — Bảng đối chiếu giá theo mùa (mặc định, khi chưa chọn xem chi tiết 1 mùa)
Có 2 dạng bảng tuỳ tình trạng dữ liệu:

**a) Khi giá VM và Beds24 khớp nhau ở tất cả các mùa (không phát hiện chênh lệch):** hiển thị bảng lịch sử log giá theo ngày, cột là các mùa giá (season) + cột "LM" (Last Minute) khi phát hiện nhiều mức giá trong cùng mùa gần nhất:
| # | Cột | Ghi chú |
|---|---|---|
| 1 | (Ngày) | Ngày ghi nhận giá, dòng "Today" là dòng có thể sửa giá trực tiếp |
| 2..n | Từng mùa giá | Giá áp dụng; dòng hiện tại hiển thị icon "Season Revenue" (mắt) mở chế độ 2 cho mùa tương ứng; các dòng quá khứ hiển thị dấu tăng/giảm/bằng (↑/↓/=) kèm % thay đổi so với dòng liền trước |

Bên cạnh bảng có icon **Validation** (dấu tích, xác nhận giá) và icon **Comment** (mở popup ghi chú). Nút **Show Logs** hiện/ẩn bảng log các ghi chú (comment) đã lưu.

**b) Khi phát hiện chênh lệch/giá thiếu giữa VM và Beds24:** hiển thị bảng so sánh 2 dòng cố định:
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Nguồn | "VM" (giá hệ thống nội bộ) hoặc "Beds24" (giá OTA) |
| 2..n | Từng mùa giá (tô màu theo tên mùa: low/mid/high/peak) | Giá tương ứng; có thể hiển thị "N/A", "Missing", "Part. missing" (thiếu một phần dữ liệu Beds24), hoặc "Mixed-up <khoảng giá>" nếu phát hiện nhiều mức giá khác nhau trong cùng một mùa trên Beds24 |

### Chế độ 2 — Chi tiết doanh thu theo mùa ("Season Revenue", hiển thị khi có `season_id` trên query string)
- Thanh tiêu đề mùa giá kèm mũi tên điều hướng sang mùa liền trước/liền sau (ajax `getPriceLogDataAjax`)
- 4 nhóm thẻ KPI (mỗi nhóm 3 thẻ: Last year / Current / Future): **Occupancy** (%), **Price** (giá mới, ฿), **Revenue** (% biến động), **Advance** (số ngày còn lại đến hết mùa)
- Biểu đồ **Occupancy theo thời gian** (canvas, có mũi tên trái/phải để xem giai đoạn khác)
- Biểu đồ **Lịch sử thay đổi giá** trong mùa (theo ngày)
- Biểu đồ **Giá trung bình theo năm** của mùa này (so sánh từ năm 2022 tới hiện tại)

## Chức năng/nút thao tác
- Lọc theo Đơn vị kinh doanh / Villa
- Icon **Season Revenue** (mắt) trên ô giá ngày hiện tại — mở Chế độ 2 cho mùa tương ứng
- Icon **Validation** — xác nhận/ghi nhận giá hiện tại
- Icon **Comment** — mở popup thêm ghi chú (`rates_comment`) cho log giá
- Nút **Show Logs** — hiện/ẩn bảng log ghi chú
- Mũi tên trái/phải trên thanh tiêu đề mùa (Chế độ 2) — chuyển sang mùa liền kề, tải lại dữ liệu qua ajax

## Điều hướng
- Mở từ: BOOK-066 (nút Season Logs)
- Điều hướng tới: không điều hướng sang trang khác; chuyển đổi giữa 2 chế độ hiển thị ngay trên trang qua query string `season_id`/`villa_id`
