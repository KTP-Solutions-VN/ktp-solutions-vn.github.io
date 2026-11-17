# OWP-021 — Bản tin hàng tháng

**Loại:** Trang đầy đủ

**Route:** `ExternalUserController::MonthlyNewsletter()` — không có route đẹp riêng (mặc định `/external-user/monthly-newsletter`)

**Module:** Cổng thông tin Chủ sở hữu

## Mô tả ngắn gọn

Danh sách các bản tin hàng tháng (Monthly Newsletter) do đơn vị quản lý phát hành, gửi tới Chủ sở hữu theo ngôn ngữ và đơn vị kinh doanh, cho phép xem nhanh hoặc tải PDF.

## Mô tả chi tiết

Danh sách — cột hiển thị:

| # | Cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Ngày/Tên bản tin | name | |
| 2 | Nội dung | text | Hiển thị rút gọn/HTML |
| 3 | Thao tác | — | Icon mắt (xem nhanh trong popup), icon tải xuống (PDF) |

## Chức năng/nút thao tác

- Xem nhanh nội dung bản tin (icon mắt → mở popup hiển thị nội dung, không có view riêng — dùng chung layout trang)
- Tải PDF bản tin (icon download → gọi `downloadNewletterPdf($news_id)`)

## Điều hướng

- Truy cập từ menu chính (Monthly Newsletter)
- Không có điều hướng tiếp — icon mắt mở popup tại chỗ, icon tải mở/tải file PDF
