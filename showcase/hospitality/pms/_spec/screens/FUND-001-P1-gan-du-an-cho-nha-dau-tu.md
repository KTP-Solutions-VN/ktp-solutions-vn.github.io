# FUND-001-P1 — Gắn nhà đầu tư vào dự án (Link Investor to Project)

**Loại:** Popup (mở từ FUND-001)

**Route:** Submit POST tới `FundController::investors()` (`/fund/investors`, field ẩn `action = project`). Dữ liệu danh sách dự án nạp qua AJAX `fund/check-project` (POST).

**Module:** FUND = Vốn nhà đầu tư

## Mô tả ngắn gọn
Modal cho phép gán một hoặc nhiều dự án (đang mở, `ProjectFund.status = open`) vào một nhà đầu tư, được mở từ icon "Project" trên danh sách nhà đầu tư (FUND-001).

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Dự án | `project_id` | Select2 multiple | Có | Danh sách nạp động qua AJAX `fund/check-project`, loại trừ các dự án đã có trong `Fund.project_id` của nhà đầu tư này |
| 2 | (ẩn) Fund ID | `id` | Hidden | — | id bản ghi `Fund` của nhà đầu tư |
| 3 | (ẩn) Hành động | `action` | Hidden = `project` | — | Đánh dấu cho controller biết đây là thao tác gán dự án |

## Chức năng/nút thao tác
- **Save**: gộp danh sách dự án mới chọn với danh sách dự án đã gán trước đó (không trùng lặp), lưu vào `Fund.project_id` (dạng serialize), hiện thông báo thành công/thất bại.
- **Cancel**: đóng modal, không lưu.

## Điều hướng
- Mở từ: FUND-001 (icon Project trên từng dòng nhà đầu tư).
- Sau khi lưu (thành công hoặc lỗi): tải lại FUND-001.
