# OWN-016 — Lịch sử truy cập của chủ nhà (Owner Access History)

**Loại:** Trang đầy đủ

**Route:** `/Owner/loginLog` (controller `Owner`, action `loginLog()`)

**Module:** Quan hệ chủ nhà (Admin)

## Mô tả ngắn gọn

Màn hình theo dõi lịch sử đăng nhập của các chủ sở hữu vào Owner's Portal, phân theo villa/property. Dữ liệu bảng và số liệu tổng hợp được nạp bằng AJAX (`getOwnerAccessLog`, `getLoginLogData`, `countTotalOwner`, `countNeverLoginOwner`, `noLoginNintyDays`, `getLoginHistory`) sau khi trang tải xong.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | Không | Lọc theo business unit, mặc định theo BU của user đăng nhập |
| 2 | Tab lọc trạng thái | — | Tab (All Owners / Never Logged In / No Login 90+ Days) | — | Mỗi tab có badge đếm số lượng |
| 3 | Tìm kiếm | `searchInput` | Text | Không | Tìm theo property hoặc owner |
| 4 | Bảng: Property | `property` | Text | — | |
| 5 | Bảng: Owner | `owner` | Text | — | |
| 6 | Bảng: Last Login | `last_login` | Datetime | — | |
| 7 | Bảng: Total Logins | `total_logins` | Số | — | |
| 8 | Bảng: Credentials | `credentials` | Text | — | Thông tin tài khoản truy cập owner |
| 9 | Bảng: Login History | — | Nút mở drawer | — | Mở khung "Login History" (offcanvas) bên phải |

## Chức năng/nút thao tác

- **Lọc theo Business Unit**: thay đổi danh sách hiển thị theo BU chọn.
- **Chuyển tab** (All/Never Logged In/No Login 90+ Days): lọc danh sách theo trạng thái đăng nhập.
- **Tìm kiếm**: lọc theo tên property/owner.
- **Login History** (từng dòng): mở drawer (offcanvas) hiển thị chi tiết lịch sử đăng nhập của owner: email, tổng số lần đăng nhập, lần đăng nhập đầu tiên, lần đăng nhập gần nhất, danh sách lịch sử.

## Điều hướng

- Mở từ: OWN-001 (nút "Access History").
- Không điều hướng sang trang khác — chi tiết lịch sử đăng nhập được xem trực tiếp qua drawer trong cùng trang, không có URL riêng.
