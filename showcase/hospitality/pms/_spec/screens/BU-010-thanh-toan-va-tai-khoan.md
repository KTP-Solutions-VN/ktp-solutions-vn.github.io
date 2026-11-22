# BU-010 — Thiết lập thanh toán (Payment Setup)

**Loại:** Trang đầy đủ (3 tab)

**Route:** `BusinessUnitController::paymentMethod($tab, $page_action, $id)` — mặc định `/business-unit/payment-method/{tab}`

**Module:** Đơn vị vận hành

## Mô tả ngắn gọn
Trang cấu hình trung tâm về phương thức thanh toán (Payment Means), tài khoản nhận/chi tiền (Accounts) và ma trận áp dụng theo từng Đơn vị kinh doanh, gồm 3 tab: "Phương thức thanh toán" (`main-list`), "Tài khoản" (`accounts`), "Danh sách đơn vị kinh doanh" (`business-unit-list`).

## Mô tả chi tiết

### Tab 1 — Phương thức thanh toán (`main-list`)
Danh sách có tìm kiếm/phân trang (`pm_search`, `pm_limit`, `pm_page`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Phương thức thanh toán | `name`, `image` | Icon + tên |
| 2 | Áp dụng trong (Đơn vị kinh doanh) | `business_unit_ids` (JSON) | Số lượng đơn vị đã chọn; click mở rộng dòng để bật/tắt từng đơn vị (chip) |
| 3 | Tài khoản liên kết | `account_ids` (JSON) | Tối đa 2 tài khoản hiển thị + số dư |
| 4 | Cập nhật lúc | `updated_at`/`created_at`, `updated_by` | |
| 5 | Hành động | — | Sửa, Xóa |

### Tab 2 — Tài khoản (`accounts`)
Danh sách có tìm kiếm/phân trang (`account_search`, `acc_limit`, `acc_page`):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Tên tài khoản | `name`, `account_type` | Cash Account / Bank Account |
| 2 | Chủ tài khoản | `owner` | |
| 3 | Số tài khoản | `number` | |
| 4 | Quốc gia | `country` | |
| 5 | Tiền tệ | `currency_id` → `currency.code` | |
| 6 | Đơn vị kinh doanh phục vụ | `business_unit_ids` (JSON) | Click mở rộng dòng để bật/tắt theo chip |
| 7 | Phương thức thanh toán chấp nhận | `payment_means_ids` (JSON) | Click mở rộng dòng để bật/tắt theo card |
| 8 | Hành động | — | Sửa (mở trang con Thêm/Sửa), Xóa, Mở sổ quỹ/Xem sổ quỹ |

### Tab 3 — Danh sách đơn vị kinh doanh (`business-unit-list`)
Bảng chỉ đọc, tổng hợp tuyến thanh toán theo từng Đơn vị kinh doanh:

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Đơn vị kinh doanh | `name` | |
| 2 | Phương thức thanh toán | — | Danh sách phương thức áp dụng cho đơn vị |
| 3 | Phương thức → Tài khoản | — | Click mở rộng xem chi tiết tuyến thanh toán, cảnh báo phương thức chưa có tài khoản hoặc tài khoản chưa gắn tuyến nào ("Unreachable accounts") |
| 4 | Trạng thái | `status` | |

## Chức năng/nút thao tác
- **Add new (tab Phương thức thanh toán):** mở popup BU-010-P1 ở chế độ Thêm mới.
- **Sửa phương thức thanh toán:** mở popup BU-010-P1 ở chế độ Sửa.
- **Xóa phương thức thanh toán:** mở popup BU-010-P2 xác nhận xóa.
- **Bật/tắt đơn vị kinh doanh hoặc tài khoản áp dụng** trực tiếp trên dòng (chip toggle) — lưu ngay qua AJAX, không cần submit form.
- **Add new / Sửa tài khoản (tab Tài khoản):** điều hướng sang trang con BU-010-P3 (Form tài khoản ngân hàng) — dùng route con `accounts/add` hoặc `accounts/edit/{id}`.
- **Xóa tài khoản:** mở popup BU-010-P4 xác nhận xóa.
- **Mở sổ quỹ / Xem sổ quỹ:** icon "Open Statement" mở popup BU-010-P5 nhập Ngày mở sổ + Số dư đầu kỳ (action `openStatement`); nếu đã mở, icon dẫn sang `Account::statements`.
- **Bật/tắt phương thức thanh toán chấp nhận theo tài khoản** trực tiếp trên dòng (card toggle) — lưu ngay qua AJAX.

## Điều hướng
- Vào từ: menu Settings; hoặc từ BU-011 (nút "Payment methods").
- Điều hướng đến: BU-010-P1, BU-010-P2, BU-010-P3, BU-010-P4, BU-010-P5, BU-011 (Phương thức thanh toán theo đơn vị).
