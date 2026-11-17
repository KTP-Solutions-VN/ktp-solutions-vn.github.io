# ACC-023-P2 — Sửa chi tiết tài khoản kế toán

**Loại:** Popup/Trang chỉnh sửa (mở từ ACC-023)

**Route:** `AccountController::editChartAccount($id)` — mặc định `/account/edit-chart-account/<id>` (`id` truyền dạng base64)

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Sửa toàn bộ danh sách dòng chi tiết (`ChartAccountDetails`) của một Chart of Account: thêm dòng mới động, xóa dòng, sửa các trường rank/nature/category/sub_category/details/allocation, rồi lưu hàng loạt.

## Mô tả chi tiết

Tiêu đề trang hiển thị: `<tên Chart of Account> - <danh sách tên Business Unit áp dụng>`.

Bảng chi tiết dạng form động (mỗi dòng là 1 bản ghi `ChartAccountDetails`, field theo mảng `data[<index>][...]`):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Rank | `data[i][rank]` (→ `account_rank`) | Input number, min=1 | Có (`required`) | |
| 2 | Nature | `data[i][nature]` (→ `nature`) | Select2 (danh sách `$natures` từ `_getNature()`) | Có (`required`) | |
| 3 | Category | `data[i][category]` (→ `category`) | Select2 (danh sách `$categories` từ `_getCategory()`) | Có (`required`) | |
| 4 | Sub Category | `data[i][sub_category]` (→ `sub_category`) | Text | Có (`required`) | |
| 5 | Details | `data[i][detail]` (→ `details`) | Textarea | Không | |
| 6 | Allocation | `data[i][allocation]` (→ `allocation_type`) | Select2: "----Select----" / Property / Business Unit | Không | Nếu chọn "----Select----" thì lưu rỗng |
| — | Chart Account Detail Id | `data[i][chart_account_detail_id]` (hidden) | Hidden | — | Rỗng nếu dòng mới thêm |
| — | Id (Chart Account) | `id` (hidden) | Hidden | — | |
| — | Row Count | `row_count` (hidden) | Hidden, đếm số dòng | — | Cập nhật động khi thêm/xóa dòng |

## Chức năng/nút thao tác
- **Add new (thêm dòng):** JS chèn thêm 1 dòng mới vào bảng (không gọi server), tự tăng `row_count`.
- **Xóa dòng (icon thùng rác trên từng dòng):** JS xóa dòng khỏi bảng ngay tại client, giảm `row_count`; dòng đã xóa sẽ không được gửi lên khi Save.
- **Save:** submit POST toàn bộ mảng `data[]` về chính action `editChartAccount`. Server: xóa các `ChartAccountDetails` cũ không còn xuất hiện trong `data[]` gửi lên (hàm `deleteSeletedRow`), sau đó `_saveData('ChartAccountDetails', ...)` cho từng dòng còn lại (update nếu có `chart_account_detail_id`, insert nếu không); ghi nhận thành công/thất bại và redirect về trang gọi (`referer()`).

## Điều hướng
- Vào từ: ACC-023 (Sơ đồ tài khoản kế toán) — icon file (Edit Content) trên từng dòng.
- Điều hướng đến: không điều hướng sang trang khác — lưu xong quay lại trang trước đó (`referer()`), thường là ACC-023.
