# TXT-001 — Kho mô tả (Description Bank)

**Loại:** Trang đầy đủ

**Route:** `TextsController::index()` — mặc định `/texts`

**Module:** TXT = Kho mô tả

## Mô tả ngắn gọn
Trung tâm quản lý toàn bộ nội dung văn bản (text) mô tả dùng cho OTA/listing của villa, tổ chức theo 6 tab: Properties (Villa), Units, Residences, Shared Texts (văn bản dùng chung), Profiles (hồ sơ tài khoản OTA) và Languages (ngôn ngữ). Dữ liệu bảng được tải động qua AJAX (`TextsController::data`), không reload trang khi đổi tab/filter.

## Mô tả chi tiết

Bộ lọc/toolbar áp dụng cho các tab Properties/Units/Residences/Shared/Profiles:

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Đơn vị kinh doanh | `business_unit_id` | Select | Không | "All Business Units" mặc định |
| 2 | Ngôn ngữ | `language_id` | Select + icon cờ | Không | Danh sách theo BU/quốc gia |
| 3 | Trạng thái | `status` | Select: All/Complete/Partially complete/Not started | Không | |
| 4 | OTA | `platform_id` | Select (danh sách Booking Platform) | Không | Lọc theo yêu cầu nội dung của từng kênh OTA |
| 5 | Tìm kiếm | `q` | Text search | Không | Tìm theo tên văn bản/địa điểm |

Cột hiển thị mỗi dòng dữ liệu (tab Property/Unit/Residence): tên property/unit/residence, các Content Element kèm nội dung theo ngôn ngữ đang chọn, trạng thái (ready/partial/none), người & thời gian cập nhật gần nhất, mức độ sẵn sàng theo từng OTA (OTA readiness).

Cột hiển thị tab Shared/Profiles (thư viện văn bản dùng lại): Tiêu đề, Content Element, Nhóm, Nội dung theo ngôn ngữ, Business Unit áp dụng, số nơi đang sử dụng (assignment usage), trạng thái.

Tab Languages: danh sách ngôn ngữ đã cấu hình cho từng quốc gia, số lượng listing/shared text/profile đang dùng, người & thời gian cập nhật, trạng thái đang dùng (in_use).

## Chức năng/nút thao tác
- **Chuyển tab:** Properties/Units/Residences/Shared Texts/Profiles/Languages — tải lại dữ liệu qua AJAX `data`.
- **New text:** mở popup TXT-001-P1 (Trình sửa mô tả) — chỉ hiện ở các tab dữ liệu (ẩn ở tab Languages).
- **Sửa một dòng/nội dung:** mở popup TXT-001-P1 ở chế độ sửa.
- **Xóa văn bản dùng lại (Shared/Profiles):** mở popup TXT-001-P3 xác nhận, gọi AJAX `deleteText`.
- **Add language (tab Languages):** mở popup TXT-001-P2.
- **Xóa ngôn ngữ (tab Languages):** mở popup TXT-001-P3 (dùng chung modal xác nhận), gọi AJAX `deleteLanguage`.
- **Copy nội dung:** sao chép nhanh nội dung văn bản vào clipboard (không có view riêng).
- **Phân trang:** điều hướng trang dữ liệu qua AJAX.

## Điều hướng
- Vào từ: menu Web & Media → Description Bank.
- Điều hướng đến: TXT-001-P1 (Trình sửa mô tả), TXT-001-P2 (Thêm ngôn ngữ), TXT-001-P3 (Xác nhận xóa).
