# ACC-053-P2 — Popup sửa ngày lễ

**Loại:** Popup (mở từ ACC-053)

**Route:** `AccountController::editPublicHoliday($id)` — mặc định `/account/edit-public-holiday/<id>` (`id` truyền dạng base64 trên URL)

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Form chỉnh sửa một ngày lễ công đã tồn tại, dữ liệu được nạp sẵn từ `PublicHoliday` theo `id`; cùng bộ field và quy tắc validate như ACC-053-P1.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Country | `country_id` | Select2 (Thailand/France/Greece) | Có (`required`) | Nạp sẵn giá trị hiện tại |
| — | (id ẩn) | `id` | Hidden | — | `id` bản ghi đang sửa (dùng để loại trừ chính nó khi check trùng ngày) |
| 2 | Date | `date` | Text + datepicker (`dd MM, yyyy`), `startDate` = hôm nay | Có (`required`) | Validate remote AJAX `checkUniqueDate` (loại trừ chính bản ghi đang sửa) |
| 3 | Description | `description` | Textarea | Có (class `required`) | |
| 4 | Comment | `comment` | Textarea | Có (class `required`) | |
| 5 | Holiday Type | `holiday_type` | Select2 (Official/Observed/Special/Company) | Có (`required`) | Nhóm "HR Rule" |
| 6 | OT Multiplier | `ot_multiplier` | Select2 (3.0×/2.0×/1.5×/None) | Có (`required`) | Nhóm "HR Rule" |
| 7 | Paid Public Holiday | `paid_public_holiday` | Toggle switch (input ẩn `yes`/`no`) | Không | "Included in salary and leave calculations" |
| 8 | Demand Impact | `demand_impact` | Select2 (Peak/High/Medium/Low) | Có (`required`) | Nhóm "Pricing Impact" |
| 9 | Suggested Price Rule | `suggested_price_rule` | Select2 (+25%/+15%/Manual/No impact) | Có (`required`) | Nhóm "Pricing Impact" |
| 10 | Internal Note | `internal_note` | Textarea | Có (class `required`) | |

## Chức năng/nút thao tác
- **Save:** validate jQuery Validate (Date bắt buộc + remote check trùng ngày, loại trừ chính bản ghi) → submit POST tới chính action `editPublicHoliday`; cập nhật bản ghi `PublicHoliday` (kèm `updated_at`), hiện flash thành công/lỗi, sau đó redirect về trang trước đó (`referer`, thường là ACC-053).
- **Cancel:** quay lại ACC-053.
- **checkUniqueDate (AJAX nền):** POST `/account/checkUniqueDate` chạy khi đổi Country hoặc Date, có kèm `id` để không tự báo trùng với chính bản ghi đang sửa.

## Điều hướng
- Vào từ: ACC-053 (Ngày lễ) — icon Sửa trên từng dòng.
- Điều hướng đến: quay lại trang trước đó (thường là ACC-053) sau khi lưu; Cancel quay lại ACC-053.
