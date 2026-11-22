# COMP-001 — Cơ cấu công ty (Company Structure)

**Loại:** Trang đầy đủ
**Route:** company/list (route CakePHP mặc định dạng dashed: `/company/list`, có tham số phụ `:tab` — vd `/company/list/subsidiaries-list`)
**Module:** COMP = Pháp nhân

## Mô tả ngắn gọn
Màn hình quản lý dữ liệu chủ về Công ty (legal entity) và Đơn vị pháp nhân trực thuộc (Subsidiary) của hệ thống, hiển thị dưới dạng 2 tab trong cùng một trang. Cho phép thêm mới, sửa, xóa công ty và subsidiary thông qua một popup dùng chung. Đây là dữ liệu gốc dùng để liên kết với Đơn vị kinh doanh (Business Unit) và Bất động sản (Property).

## Mô tả chi tiết

### Tab 1: Danh sách Công ty (company-list) — cột hiển thị
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | STT | (số thứ tự, không có field) | Số | Không | Sinh tự động theo vòng lặp |
| 2 | Legal Entity (Tên công ty) | `name` | Text | Không (chỉ hiển thị) | Lấy từ bảng `Company` |
| 3 | Short Name | `short_name` | Text | Không (chỉ hiển thị) | |
| 4 | Created On | `created_at` | Datetime (format `d M y`) | Không (chỉ hiển thị) | |
| 5 | Actions | — | Nút Edit/Delete | — | Mở popup COMP-001-P1 |

Không có ô tìm kiếm/lọc riêng ở tab này (DataTable client-side, `bSort:false`).

### Tab 2: Danh sách Đơn vị pháp nhân (subsidiaries-list) — filter + cột hiển thị
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Legal Entity (filter) | `legal_entity_id` | Select2 (dropdown Company, có option "All") | Không | Khi đổi giá trị, redirect tới `/VM/company/list/subsidiaries-list?legal_entity_id=...` để lọc danh sách theo công ty cha |
| 2 | STT | — | Số | Không | |
| 3 | Logo | `logo` | Hình ảnh (link mở file gốc) | Không | Ảnh mặc định `1ratio1-img.png` nếu chưa có logo |
| 4 | Legal Entity | `company.name` | Text | Không | Tên công ty cha (qua contain Company) |
| 5 | Subsidiary | `name` | Text | Không | |
| 6 | Short Name | `short_name` | Text | Không | |
| 7 | Country | `country.name` | Text | Không | Qua contain Country |
| 8 | Business Units | `business_units` (tổng hợp) | Text (nối chuỗi) | Không | Danh sách short_name các Business Unit thuộc subsidiary, nối bằng dấu phẩy |
| 9 | Created On | `created_at` | Datetime (`d M y`) | Không | |
| 10 | By (người tạo) | `user.usage_name` / `user.first_name + family_name` | Text | Không | Qua contain User |
| 11 | Actions | — | Nút Edit/Delete | — | Mở popup COMP-001-P1 |

## Chức năng/nút thao tác
- Chuyển tab Company / Subsidiaries (URL cập nhật theo tab qua `history.replaceState`).
- Nút "Add new" (`.add_country`, `data-button_name=company` hoặc `company_subsidiary`) → mở popup COMP-001-P1 ở chế độ Thêm mới.
- Nút Edit (icon bút, `.edit_country`) trên từng dòng → mở popup COMP-001-P1 ở chế độ Sửa, dữ liệu được đổ vào form qua `data-*` attributes.
- Nút Delete (icon thùng rác, `.delete_country`) trên từng dòng → mở popup COMP-001-P1 ở chế độ Xác nhận xóa.
- Dropdown lọc theo Legal Entity ở tab Subsidiaries → reload trang với query string `legal_entity_id`.
- Submit form popup gọi action `list` với `POST` (`action=add|edit|delete`), controller `CompanyController::list()` xử lý lưu/xóa cho cả `Company` và `CompanySubsidiary`, ghi Activity Log, hiển thị Flash message, sau đó redirect về trang trước (`referer()`).

## Điều hướng
- Mở từ: Menu Portfolio Setup (menu "Company Structure").
- Điều hướng tới: không điều hướng sang trang khác (thao tác CRUD tại chỗ qua popup + reload).
- Popup con: COMP-001-P1 (Form công ty / pháp nhân chi nhánh).
