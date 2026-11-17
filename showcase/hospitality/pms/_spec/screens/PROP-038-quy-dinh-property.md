# PROP-038 — Quy định Property (Villa Rules)

**Loại:** Popup (mở từ PROP-021)
**Route:** property/villa-rules/:villa_id (villa_id truyền dạng base64)
**Module:** PROP = Bất động sản

## Mô tả ngắn gọn
Modal/trang khai báo các quy định (rules) áp dụng cho Property: nội quy nhà (house rules), tiền đặt cọc (deposit), phụ phí điện và phụ phí khác (electricity & other charges, đa ngôn ngữ), quy định dọn dẹp (cleaning), hút thuốc (smoking), tiệc/sự kiện (parties & events). Dữ liệu lưu bảng `VillaRule`.

## Mô tả chi tiết
| # | Tên field (label) | Field code (name/id) | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language`/`language_why_here` | Select (en/fr/zh) | Có (class `required`) | Chỉ áp dụng cho field Electricity & Other Charges |
| 2 | Electricity & Other Charges | `electricity_other_charges` | Textarea (đa ngôn ngữ) | Không | Lưu dạng mảng serialize theo `language_id` |
| 3 | House Rules | `house_rules` | Textarea | Không | Không đa ngôn ngữ |
| 4 | Deposit | `deposit` | Textarea | Không | Không đa ngôn ngữ |
| 5 | Cleaning | `cleaning` | Textarea | Không | Không đa ngôn ngữ |
| 6 | Smoking | `smoking` | Textarea | Không | Không đa ngôn ngữ |
| 7 | Parties/Events | `parties_events` | Textarea | Không | Không đa ngôn ngữ |

## Chức năng/nút thao tác
- Nút "Save" (`why_here_form_1`) — submit form, lưu vào bảng `VillaRule` (insert nếu chưa có bản ghi theo `villa_id`, update nếu đã có), hiện Flash message thành công/lỗi rồi redirect lại chính trang.
- Đổi ngôn ngữ — cập nhật nội dung Electricity & Other Charges theo ngôn ngữ đã lưu (JS).

## Điều hướng
- Mở từ: PROP-021 (Danh sách Property cần Onboarding thao tác) — icon "Villa Rules" (mở dạng modal qua data attribute).
- Điều hướng tới: Không có (chỉ lưu tại chỗ và redirect về chính nó).
- Popup con: Không có.
