# PROP-058 — Hàng đợi làm mới listing (Listing Refresh Queue)

**Loại:** Trang đầy đủ
**Route:** property/listing-redone
**Module:** PROP = Hồ sơ tài sản

## Mô tả ngắn gọn
Trang tổng hợp toàn bộ yêu cầu làm lại (redo) listing OTA của các Property trong Business Unit, chia thành 2 nhóm: đang chờ xử lý (pending, sắp theo ngày yêu cầu) và đã hoàn thành (done, sắp theo ngày hoàn thành gần nhất). Cho phép đánh dấu hoàn thành hoặc hủy yêu cầu ngay trên danh sách.

## Mô tả chi tiết

### Bộ lọc
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (có option "All", hỗ trợ Zone) | Có (class `required`) | Đổi giá trị → reload, lưu cookie |

### Cột hiển thị
| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Property | `villa.name` | |
| 2 | Channel | `chanel.name` | Qua contain Chanel |
| 3 | Requested By | `requested_by` | |
| 4 | Requested On | `requested_date` | |
| 5 | Done By | `done_by` | Chỉ có khi đã hoàn thành |
| 6 | Done On | `done_date` | Chỉ có khi đã hoàn thành |

## Chức năng/nút thao tác
- Đổi Business Unit → reload danh sách.
- Nút "Done" trên dòng đang pending → gọi AJAX `redoAction` với `action=done`, đánh dấu yêu cầu hoàn thành.
- Nút "Cancel" trên dòng đang pending → gọi AJAX `redoAction` với `action=cancel`, hủy yêu cầu redo.
- Icon xem log (nếu có) → mở PROP-057 (Lịch sử làm mới listing) theo `villa_id`/`channel_id`.

## Điều hướng
- Mở từ: Menu Listing Quality (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: PROP-057 (Lịch sử làm mới listing).
- Popup con: Không có (thao tác Done/Cancel xử lý AJAX tại chỗ).
