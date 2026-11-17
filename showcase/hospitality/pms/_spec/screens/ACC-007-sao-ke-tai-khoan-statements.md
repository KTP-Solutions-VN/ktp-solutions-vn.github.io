# ACC-007 — Sao kê tài khoản (Statements)

**Loại:** Trang đầy đủ

**Route:** `AccountController::statements($account_id)` — mặc định `/account/statements/<account_id>` (`account_id` truyền dạng base64 trên URL)

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Xem sổ sao kê (statement) của một tài khoản (Account) cụ thể: liệt kê toàn bộ bút toán credit/debit đã phát sinh, tính số dư lũy kế (balance) theo thứ tự nhập liệu. Mỗi tài khoản đang "mở sao kê" xuất hiện như một mục riêng trong menu Statements.

## Mô tả chi tiết

Danh sách (DataTable `#zero_config_2`, không phân trang phía server, sắp xếp mặc định theo `AccountStatement.id` ASC rồi đảo ngược để hiện bút toán mới nhất trước):

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | Ngày | `date` | Định dạng `d M y` |
| 2 | Ref | `ref` | Mã tham chiếu bút toán, dạng `<tên account>-00001` tăng dần |
| 3 | Business Unit | `business_unit.name` / `business_unit_name` | Nếu bút toán phát sinh từ Claim Expense thì lấy tên BU từ villa của claim, gộp bằng dấu phẩy nếu nhiều |
| 4 | Category | `account_category.name` (→ `account_category_name`) | "Unassigned" nếu chưa gán |
| 5 | Description | `description` | |
| 6 | Property | `villa.name` (→ `villa_name`) | "Unassigned" nếu `villa_id` rỗng; nếu từ Claim Expense thì gộp tên nhiều villa |
| 7 | Payee | `payee_user_name` | Chỉ có khi bút toán gắn với Claim Expense (tên người tạo claim); mặc định "N/A" |
| 8 | In (theo mã tiền tệ account) | `amount` khi `payment_type = credit` | Định dạng số 2 chữ số thập phân |
| 9 | Out (theo mã tiền tệ account) | `amount` khi `payment_type = debit` | |
| 10 | Balance (theo mã tiền tệ account) | tính runtime: cộng dồn nếu credit, trừ dồn nếu debit | |
| 11 | Ngày tạo | `created_at` | Định dạng `d M y H:i:s` |
| 12 | Hành động | — | Sửa (nếu không phải opening statement), Xóa |

Chỉ lấy các bút toán `AccountStatement.account_id = <account_id>` và `is_deleted = 0`, contain thêm `BusinessUnit`, `Villa`, `AccountCategory`, `ClaimExpense` (kèm `Villa.BusinessUnit`, `CreatedByUser`).

## Chức năng/nút thao tác
- **Add new:** mở trang ACC-007-P1 (`addStatement`) để thêm bút toán mới cho account đang xem.
- **Sửa (icon bút, chỉ hiện khi `is_opening_statement = 0`):** mở trang ACC-007-P2 (`editStatement`).
- **Xóa (icon thùng rác):** mở modal xác nhận `#deleteModal`, khi xác nhận thì điều hướng tới `account/delete-statement/<id base64>` — thực chất gọi action `deleteStatement` (soft delete `is_deleted = 1`, không có view riêng), sau đó quay lại trang statements.
- Không có bộ lọc trên trang; mỗi account là một trang riêng qua tham số `account_id`.

## Điều hướng
- Vào từ: Sidebar > nhóm "Statements" > mục theo tên từng account đang mở sao kê (`filterSidebar($user, 'Account-statements')`, danh sách `$open_statements`).
- Điều hướng đến: ACC-007-P1 (Thêm bút toán sao kê), ACC-007-P2 (Sửa bút toán sao kê), thao tác Xóa (action `deleteStatement`, không có view riêng).
