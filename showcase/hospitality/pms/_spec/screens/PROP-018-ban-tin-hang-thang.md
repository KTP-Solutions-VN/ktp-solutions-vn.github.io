# PROP-018 — Bản tin hàng tháng cho chủ nhà (Monthly Newsletter)

**Loại:** Trang đầy đủ
**Route:** property/monthly-report
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Màn hình quản lý các bản tin (newsletter) hàng tháng gửi cho các Business Unit, theo tháng/năm và ngôn ngữ. Cho phép thêm mới, sao chép (copy), sửa, xóa bản tin; một bản tin có thể gán cho nhiều Business Unit cùng lúc (mỗi Business Unit chỉ được dùng 1 bản tin cho cùng kỳ + ngôn ngữ).

## Mô tả chi tiết

### Bộ lọc / thanh công cụ
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Kỳ (Period: tháng+năm) | `month`, `year` (hidden, set qua UI chọn tháng dạng lịch) | Custom dropdown chọn tháng/năm | Không | Không cho chọn tháng tương lai; lưu cookie `monthly_newsletter_month`/`monthly_newsletter_year` |
| 2 | Ngôn ngữ | `language` | Select (danh sách `Language`) | Không | Lưu cookie `monthly_newsletter_lang` |
| 3 | Business Unit | `business_unit` | Select (có empty "All Business Units") | Không | Lưu cookie `property_business_unit_id`; đổi giá trị tự động submit search |

### Danh sách bản tin (thẻ `mm-entry`)
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | STT | — | Số | Không | |
| 2 | Tên bản tin | `name` | Text | Không (hiển thị) | |
| 3 | Cập nhật lúc/bởi | `formatted_date`, `updated_by_name` | Text | Không | |
| 4 | Ngôn ngữ | `language` | Text (badge) | Không | |
| 5 | Business Unit áp dụng | `business_unit_ids` (map buId→rowId) | Danh sách pill | Không | Mỗi bản tin có thể áp dụng nhiều BU (mỗi BU 1 record riêng trong DB `MonthlyNewsLetter`, gộp theo nội dung giống nhau) |
| 6 | Nội dung bản tin | `text` | Textarea nội dung (rút gọn, có nút "Read full newsletter") | Không | |

## Chức năng/nút thao tác
- Nút "Add Newsletter" → mở modal `#exampleModal1` (Thêm bản tin mới): field Period, Language, Name, danh sách checkbox Business Unit (`business_unit_ids[]`, disable BU đã có bản tin trùng kỳ+ngôn ngữ), Text (nội dung, đếm số từ).
- Nút "Edit" (icon bút) trên từng bản tin → mở modal `#exampleModal3` (Sửa): tương tự Add nhưng có `original_bu_map` để so sánh BU thêm/bớt.
- Nút "Copy" (icon copy) → tạo bản sao mới cùng nội dung (tên thêm hậu tố "-Copy") qua AJAX POST tới chính action `monthlyReport`, submit `save`.
- Nút "Delete" (icon thùng rác) → mở modal `#exampleModal` xác nhận xóa (xóa toàn bộ các bản ghi theo `business_unit_ids` liên quan).
- Submit Add (`save`): lưu 1 record `MonthlyNewsLetter` cho mỗi Business Unit được chọn.
- Submit Edit (`edit`): cập nhật/thêm/xóa record theo danh sách BU được chọn so với `original_bu_map`.
- Submit Delete (`delete`): xóa các record theo `all_ids`.

## Điều hướng
- Mở từ: Menu Property (không thuộc phạm vi mã hiện tại).
- Điều hướng tới: không điều hướng — toàn bộ thao tác CRUD tại chỗ, redirect lại `monthlyReport` sau khi lưu.
- Popup con: Modal Add (`#exampleModal1`), Modal Edit (`#exampleModal3`), Modal Delete confirm (`#exampleModal`) — đều là modal dùng chung trong cùng file, không tách mã riêng theo yêu cầu phạm vi (chỉ PROP-030 có popup con tách mã).
