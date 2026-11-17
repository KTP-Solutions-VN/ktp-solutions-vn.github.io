# PROP-037 — Thông tin giao tiếp Property (Villa Communication)

**Loại:** Trang đầy đủ
**Route:** property/communication/:villa_id (villa_id truyền dạng base64), mở từ PROP-021 (icon "Villa Communication")
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Trang khai báo thông tin liên hệ nhóm chat với Chủ nhà (Owner Chat) và nhóm chat với Concierge (Concierge Chat) cho Property, cùng với yêu cầu đặc biệt (Requirement) và thông tin tài khoản ngân hàng hiển thị (Bank Account). Cho phép thêm nhiều liên hệ owner/concierge (dynamic rows qua JS). Dữ liệu lưu bảng `VillaCommunication`.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Owner Chat – Title | `o_title[]` | Text | Không | Có thể thêm nhiều dòng (nút "+") |
| 2 | Owner Chat – Name | `o_name[]` | Text | Không | |
| 3 | Owner Chat – Email | `o_email[]` | Text (email) | Không | |
| 4 | Owner Chat – Phone | `o_phone[]` | Text | Không | |
| 5 | Concierge Chat – Title | `c_title[]` | Text | Không | Có thể thêm nhiều dòng (nút "+") |
| 6 | Concierge Chat – Name | `c_name[]` | Text | Không | |
| 7 | Concierge Chat – Email | `c_email[]` | Text (email) | Không | |
| 8 | Concierge Chat – Phone | `c_phone[]` | Text | Không | |
| 9 | Requirement | `requirement` | Textarea | Không | |
| 10 | Bank Account | `bank_account` | Textarea | Không | |

## Chức năng/nút thao tác
- Nút "+" tại mỗi khối Owner Chat/Concierge Chat — thêm dòng liên hệ mới (JS render thêm input Title/Name/Email/Phone).
- Nút "Save" (`why_here_form_1`) — submit toàn bộ form, lưu vào bảng `VillaCommunication` (insert nếu chưa có, update nếu đã có theo `villa_id`), hiện Flash message rồi redirect lại chính trang.

## Điều hướng
- Mở từ: PROP-021 (Danh sách Property cần Onboarding thao tác) — icon "Villa Communication".
- Điều hướng tới: Không có (chỉ lưu tại chỗ và redirect về chính nó).
- Popup con: Không có.
