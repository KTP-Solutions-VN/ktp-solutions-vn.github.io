# BOOK-073 — Quản lý mùa giá

**Loại:** Trang đầy đủ (các popup thêm/sửa/xoá/copy nằm chung trong cùng 1 view, không tách file riêng)
**Route:** Booking/seasons (mặc định: `/booking/seasons`)
**Route đẹp:** không tìm thấy route riêng trong config/Routes.php (dùng route mặc định)
**Module:** Đặt phòng

## Mô tả ngắn gọn
Trang khai báo và quản lý các mùa giá (Season: Low/Mid/High/Peak...) theo từng vùng (Region) — mỗi vùng có một bộ mùa giá riêng dùng chung cho tất cả villa thuộc vùng đó. Hỗ trợ khai báo thủ công qua bảng, kéo-thả trực quan trên timeline, nhập nhanh bằng text ("Smart Season Input"), và sao chép bộ mùa giá từ vùng khác sang.

## Mô tả chi tiết

### Bộ lọc vùng
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Vùng (Region) | `regions` | Select | Có | Mặc định là vùng của đơn vị kinh doanh người dùng đang chọn; đổi vùng + bấm **Load** sẽ tải lại toàn bộ mùa giá của vùng đó (`seasons?region_id=...`) |

### Khối "Replicate from Another Region" (sao chép mùa giá từ vùng khác)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Copy from | `copy_form`/`copy_from` | Select | Có | Danh sách vùng đã có khai báo mùa giá (`copy_from`) |
| 2 | Copy to | `copy_to` | Select | Có | Danh sách vùng chưa có mùa giá nào (`copy_regions`) |

Nút **Preview** gọi ajax `getPreviewData` hiển thị trước nội dung sẽ được copy trong popup; nút **Apply Copy** gọi action `copySeasonData` (có popup "Copy Season" xác nhận trước khi thực hiện) để sao chép toàn bộ season của vùng nguồn sang vùng đích.

### Khối "Smart Season Input" (nhập nhanh bằng text)
Textarea cho phép dán/gõ nhanh danh sách mùa giá theo định dạng dạng `Tên mùa: ngày bắt đầu - ngày kết thúc` (mỗi dòng một mùa). Nút **Interpret & Auto-Fill Gaps** phân tích nội dung nhập, tự động lấp khoảng trống giữa các mùa liền kề (mở rộng mùa liền trước/liền sau, ngày lẻ ưu tiên mùa trước) và đổ dữ liệu ra bảng/timeline bên dưới; nút **Clear** xoá nội dung đã nhập.

### Khối "Visual Season Timeline" (kéo thả trực quan)
Hiển thị các mùa giá dưới dạng khối màu trên trục thời gian theo tháng, có thể kéo cạnh khối để chỉnh ngày bắt đầu/kết thúc mùa; nút **← Previous / Next →** để cuộn qua các tháng.

### Bảng danh sách mùa giá
| # | Cột | Ghi chú |
|---|---|---|
| 1 | Name | Tên mùa (Low/Mid/High/Peak...) |
| 2 | Start Date | Ngày bắt đầu |
| 3 | End Date | Ngày kết thúc |
| 4 | Duration | Số ngày của mùa |
| 5 | Auto-Fix | Ghi chú nếu mùa vừa được hệ thống tự mở rộng/dịch chuyển ngày do xoá mùa liền kề (ví dụ "Extended from ..."/"Moved from ...") |
| 6 | Actions | Icon Sửa (sửa inline trên dòng), icon Xoá (mở popup xử lý khoảng trống), icon Thêm (chèn dòng mùa mới ngay sau dòng hiện tại) |

### Popup xoá mùa giá (xử lý khoảng trống để lại)
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Cách xử lý | `extend_season_type` | Radio (Extend the previous season / Extend the next season / Fix cut off date) | Có | |
| 2 | Ngày cắt (Cut off date) | `cut_off_date` | Date picker | Có nếu chọn "Fix cut off date" | Mùa trước sẽ kết thúc và mùa sau sẽ bắt đầu tại ngày này |

## Chức năng/nút thao tác
- **Load** — tải lại bảng mùa giá theo vùng đã chọn
- **Preview** / **Apply Copy** — xem trước và thực hiện sao chép mùa giá từ vùng khác (action `copySeasonData`, có popup xác nhận "Copy Season")
- **Interpret & Auto-Fill Gaps** / **Clear** — xử lý nhập nhanh bằng text
- Kéo thả cạnh khối trên timeline để chỉnh ngày mùa giá
- Icon Thêm dòng — chèn mùa giá mới vào bảng
- Icon Sửa — chỉnh sửa tên/ngày mùa ngay trên dòng
- Icon Xoá — mở popup xác nhận, chọn cách xử lý khoảng trống, submit `action=delete`
- Nút **Save** (form chính `#rates_form`) — lưu toàn bộ thay đổi mùa giá của vùng (thêm mới/cập nhật hàng loạt); nếu phát hiện một mùa cũ bị một mùa mới bao trùm hoàn toàn, hệ thống tự xoá mùa cũ và cảnh báo qua flash message ("Fully covered season is ...")

## Điều hướng
- Mở từ: BOOK-066 (nút Seasons)
- Điều hướng tới: không điều hướng sang trang khác; mọi thao tác xử lý ngay tại trang này qua các popup/ajax (`copySeasonData`, `getPreviewData`, `saveSeasons`, `saveInputData`)
