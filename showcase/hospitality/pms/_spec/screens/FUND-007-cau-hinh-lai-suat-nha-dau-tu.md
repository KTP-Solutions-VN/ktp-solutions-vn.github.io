# FUND-007 — Cấu hình lãi suất nhà đầu tư

**Loại:** Trang đầy đủ

**Route:** `FundController::rates($owner_id)` — `/fund/rates/:owner_id` (GET hiển thị, POST lưu toàn bộ bảng)

**Module:** FUND = Quỹ đầu tư

## Mô tả ngắn gọn
Cấu hình các bậc lãi suất (khoảng tháng đầu tư → % lãi suất áp dụng) cho một nhà đầu tư, chỉnh sửa trực tiếp (inline edit) trên bảng.

## Mô tả chi tiết

**Cột hiển thị (đồng thời là field chỉnh sửa inline):**

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Từ tháng | `data[from_month][]` | Text (number, readonly cho tới khi bấm Edit) | Có | Tự tính lại theo dòng liền trước khi Thêm/Xóa dòng |
| 2 | Đến tháng | `data[to_month][]` | Text (number, readonly cho tới khi bấm Edit) | Có | Dòng cuối cùng thường để 99 (không giới hạn) |
| 3 | Lãi suất % | `data[rates][]` | Text (number, readonly cho tới khi bấm Edit) | Có | |

Không có bộ lọc — bảng luôn hiển thị toàn bộ bậc lãi suất của `owner_id` đang xem.

## Chức năng/nút thao tác
- **Edit (bút)**: mở khóa ô nhập của dòng đó (đến tháng + lãi suất, hoặc chỉ lãi suất nếu là dòng cuối/không giới hạn) để sửa; hiện nút Save.
- **Add (dấu +)**: chèn thêm 1 dòng mới ngay sau dòng hiện tại, tự tính `from_month`/`to_month` kế tiếp; các dòng phía sau được dồn lại (xử lý phía client), submit toàn bảng khi bấm Save.
- **Delete (thùng rác)**: chỉ cho phép ở các dòng giữa (không phải dòng đầu/cuối); gọi AJAX `fund/delete-row` để xóa và nhận lại toàn bộ bảng bậc lãi suất mới từ server.
- **Save**: submit toàn bộ bảng, lưu mảng bậc lãi suất (serialize) vào `Fund.rates` của `owner_id`.

## Điều hướng
- Vào từ: FUND-001 (icon Rate € trên từng dòng nhà đầu tư).
- Quay lại FUND-001 qua breadcrumb "Investors".
