# VSV-020 — Danh sách công việc vận hành (Garden Job List)

**Loại:** Trang đầy đủ

**Route:** `VillaServicesController::gardenJobList()` — mặc định `/villa-services/garden-job-list`

**Module:** Dịch vụ villa — Vườn

## Mô tả ngắn gọn
Màn hình ở dạng bản mẫu (mockup/wireframe) chưa hoàn thiện: action chỉ set tiêu đề trang (tiêu đề lấy nhầm từ `pool_text` — có thể là lỗi copy-paste chưa sửa), view chứa toàn bộ dữ liệu tĩnh (hard-code), không gắn với model/dữ liệu thật. Nội dung mô phỏng một màn hình "Pool Operator" cho nhân viên vận hành chọn villa và bắt đầu ca làm việc.

## Mô tả chi tiết
| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Property | `#sel1` | Select (tĩnh, option hard-code: "Villa Kari", "Villa Mika") | Không | Không có logic PHP đọc dữ liệu thật |
| 2 | Danh sách villa | — | Card tĩnh (ảnh + tên villa + nút bắt đầu) | — | Hard-code 2 villa mẫu |

Ngoài ra file view còn chứa (ở dạng comment HTML, không hiển thị) một bảng lịch trình cũ với cột Villa/Start/End/Status — cho thấy đây là bản nháp đang được thay thế dần.

## Chức năng/nút thao tác
- Nút "Start" trên từng villa mẫu — chưa gắn hành động thực (href rỗng).
- Không có tích hợp AJAX/submit nào trong action hiện tại.

## Điều hướng
- Vào từ: Menu chính (mục Garden — đường dẫn tồn tại nhưng chưa được liên kết từ UI chính thức nào khác trong module).
- Điều hướng đến: VSV-020-P1 (mockup trạng thái công việc, nhúng cùng trang).
