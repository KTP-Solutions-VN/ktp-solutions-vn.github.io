# PROP-036 — Thông tin xác nhận Property (Villa Confirmation)

**Loại:** Trang đầy đủ
**Route:** property/confirmation/:villa_id (villa_id truyền dạng base64), mở từ PROP-021 (icon "Villa Confirmation")
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Trang nhập/soạn nội dung thư xác nhận (confirmation) gửi khách khi đặt phòng thành công cho một Property: lời chào mừng (welcome message) theo từng ngôn ngữ, hướng dẫn đón khách (pick up) và hướng dẫn đỗ xe (parking). Dữ liệu lưu bảng `VillaConfirmation`, các field đa ngôn ngữ được serialize theo mã ngôn ngữ.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language`/`language_why_here` | Select (en/fr/zh) | Có (class `required`) | Đổi ngôn ngữ → JS load lại nội dung `welcome_message` theo ngôn ngữ đã lưu (nếu có) |
| 2 | Welcome Message | `welcome_message` | Textarea (đa ngôn ngữ) | Không | Lưu dạng mảng serialize theo `language_id` |
| 3 | Pick Up | `pick_up` | Textarea | Không | Không đa ngôn ngữ (dùng chung) |
| 4 | Parking | `parking` | Textarea | Không | Không đa ngôn ngữ (dùng chung) |

## Chức năng/nút thao tác
- Nút "Save" (`why_here_form_1`) — submit form, lưu vào bảng `VillaConfirmation` (insert nếu chưa có bản ghi theo `villa_id`, update nếu đã có), hiện Flash message thành công/lỗi rồi redirect lại chính trang.
- Đổi ngôn ngữ — cập nhật textarea Welcome Message theo nội dung đã lưu cho ngôn ngữ đó (JS, không reload trang).

## Điều hướng
- Mở từ: PROP-021 (Danh sách Property cần Onboarding thao tác) — icon "Villa Confirmation".
- Điều hướng tới: Không có (chỉ lưu tại chỗ và redirect về chính nó).
- Popup con: Không có.
