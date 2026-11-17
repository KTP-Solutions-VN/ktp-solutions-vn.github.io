# ACC-053 — Ngày lễ (Public Holidays)

**Loại:** Trang đầy đủ

**Route:** `AccountController::publicHolidays()` — mặc định `/account/public-holidays`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Quản lý danh sách ngày lễ công (`PublicHoliday`) theo quốc gia và năm — dữ liệu này dùng để tính hệ số lương làm thêm giờ (OT) và tác động định giá theo nhu cầu (demand-based pricing). Có lịch xem trước theo tháng với mã màu theo mức độ ảnh hưởng nhu cầu.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config`), sắp xếp theo `date` tăng dần, mặc định lọc theo tháng/năm hiện tại và quốc gia theo Business Unit của user (mặc định Thailand `id=18`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | — | Số thứ tự runtime |
| 2 | Date | `date` | Hiện dạng thẻ tháng/ngày |
| 3 | Description | `description` | Cắt còn 50 ký tự + "..." nếu dài hơn |
| 4 | Country | `country.name` | Chỉ hiện khi đang xem "tất cả quốc gia" (`is_selected_country = yes`, tức chưa lọc theo 1 quốc gia cụ thể qua filter) |
| 5 | Type | `holiday_type` (Official/Observed/Special/Company) | Mã màu theo loại |
| 6 | OT | `ot_multiplier` (3.0×/2.0×/1.5×/None) | |
| 7 | Demand | `demand_impact` (Peak/High/Medium/Low) | Mã màu theo mức |
| 8 | Actions | — | Edit, Delete |

Filter:
- **Country** (`country_id`): Thailand/France/Greece, mặc định theo BU của user.
- **Year** (`year`): năm hiện tại tới +2 năm.
- **Nature** (`nature` → `holiday_type`): Official/Observed/Special/Company, mặc định "All".
- **Salary** (`salary` → `ot_multiplier`): 3.0×/2.0×/1.5×/None, mặc định "All".
- **Demand Impact** (`demand_impact`): Peak/High/Medium/Low, mặc định "All".

Lịch xem trước (`vm-preview-calendar`): hiển thị theo `calendar_month`/`calendar_year` riêng (có thể khác filter danh sách), tô màu từng ngày theo `demand_impact` của ngày lễ (đỏ = Peak, cam = High, xanh dương = Medium, nâu = Low) kèm chú thích màu bên dưới lịch.

## Chức năng/nút thao tác
- **Add new:** mở ACC-053-P1 (`addPublicHoliday`).
- **Sửa (icon bút):** mở ACC-053-P2 (`editPublicHoliday/<id base64>`).
- **Xóa (icon thùng rác):** mở modal xác nhận `#exampleModal`, khi xác nhận thì submit POST về chính action `publicHolidays` với `action = delete`, `id`; xóa bản ghi `PublicHoliday` (`_deleteData`).
- **Copy &lt;năm trước&gt;:** gọi `copyPublicHoliday($country_id)` (không có view riêng, redirect referer) để sao chép toàn bộ ngày lễ của năm trước (giữ nguyên ngày/tháng, đổi sang năm hiện tại) cho quốc gia đang lọc; nếu ngày đã tồn tại ở năm hiện tại thì ghi đè. Nếu dữ liệu năm hiện tại đã có, hiện modal cảnh báo "sẽ được thêm và hiển thị cùng bản ghi hiện có" trước khi xác nhận; nếu năm trước không có dữ liệu, hiện modal thông báo "No public holidays are available."
- **Chuyển tháng lịch preview (nút &lt; &gt;):** đổi `calendar_month`/`calendar_year`, submit lại form filter.
- **Search:** submit toàn bộ filter (Country/Year/Nature/Salary/Demand Impact).
- **Đổi Country (select2 change):** tự động submit form ngay khi chọn.

## Điều hướng
- Vào từ: Sidebar > Account & HR > Public Holidays (`active_menu = acc-public-holidays`).
- Điều hướng đến: ACC-053-P1 (Thêm ngày lễ), ACC-053-P2 (Sửa ngày lễ), thao tác Xóa (cùng trang, không có view riêng), thao tác Copy Public Holiday (action `copyPublicHoliday`, không có view riêng, redirect referer).
