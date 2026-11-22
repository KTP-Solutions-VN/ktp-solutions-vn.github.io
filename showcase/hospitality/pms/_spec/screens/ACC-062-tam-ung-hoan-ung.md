# ACC-062 — Tạm ứng tiền mặt (Cash Advances)

**Loại:** Trang đầy đủ

**Route:** `AccountController::pettyCash($tab, $sub_tab)` — mặc định `/account/petty-cash/<tab>/<sub_tab>`

**Module:** Tài chính & Hành chính

## Mô tả ngắn gọn
Trang quản lý toàn bộ vòng đời "Claim Expense" (đề nghị hoàn ứng chi phí của nhân viên): xác thực/từ chối claim mới, tổng hợp claim đã duyệt chờ thanh toán, và tra cứu lịch sử claim đã thanh toán/bị từ chối — xem theo góc nhìn "Tất cả" (Latest Claim) hoặc lọc theo từng nhân viên (By User Claim).

## Mô tả chi tiết

Bộ lọc chung: **Business Unit** (`business_unit`, Select2, 0 = All theo quyền user); riêng tab **By User Claim** có thêm **User** (`user_id`, danh sách nhân viên nội bộ thuộc BU đã chọn, có claim từng tạo).

2 Tab chính:
- **Latest Claim** (`tab=latest-claim`, mặc định): tổng hợp claim của TẤT CẢ nhân viên thuộc quyền quản lý (trừ chính người xem).
- **By User Claim** (`tab=by-user-claim`): tổng hợp claim của MỘT nhân viên được chọn ở filter User.

Mỗi tab chính có 4 sub-tab (`sub_tab`):

| Sub-tab | Mã | Nội dung |
|---|---|---|
| New Claims | `new-claim` | Claim đang `status=pending`, chờ xác thực/từ chối |
| To Pay | `to-pay` | Claim đã `status=verified`, gom nhóm theo Company, chờ duyệt chi (Approve) |
| Paid | `paid` | Claim đã `status=approved, payment_status=complete`, đã thanh toán |
| Rejected | `rejected` | Claim đã bị từ chối (`status=rejected`) |

Cột dữ liệu chính trên bảng claim (tuỳ sub-tab): User, Property, Company, Supplier, Amount, Date, Status, Details (mô tả/ảnh hoá đơn đính kèm), Payee, Actions (checkbox chọn hàng loạt). Cột riêng tab Paid: Claims (số lượng), Payee.

## Chức năng/nút thao tác
- **New Claims — Verify:** nhập Comment, đổi `status` thành `verified` (`verify_claim_status=not-ok`), ghi access log.
- **New Claims — Reject:** nhập Comment, đổi `status` thành `rejected`.
- **To Pay — chọn hàng loạt (checkbox) rồi Approve:** với các claim đã tick, hệ thống nhóm theo người tạo, sinh `payment_batch_id` ngẫu nhiên cho mỗi nhóm, đổi `status=approved`, gán `approved_by`/`approved_date`.
- **Download PDF / Download Excel (trên nhóm claim đã chọn):** gọi `downloadClaimPdf`/`downloadClaimExcel` để xuất phiếu chi.
- Tự động lưu lựa chọn checkbox qua cookie `selected_claim_expenses` để giữ trạng thái khi chuyển trang.
- Chuyển Tab/Sub-tab, đổi Business Unit/User cập nhật lại URL và query string tương ứng (`/account/petty-cash/<tab>/<sub_tab>?business_unit=...&user_id=...`).

## Điều hướng
- Vào từ: Sidebar > mục "Cash Advances" trong nhóm Finance & Admin / Spending.
- Điều hướng đến: ACC-063 (Quyết toán chi phí) là bước tiếp theo sau khi claim được duyệt (`approved`, chờ thanh toán thực tế); không có điều hướng trực tiếp bằng link giữa 2 trang, chỉ liên quan qua dữ liệu `ClaimExpense`.
