# ACC-053-P1 — Popup thêm ngày lễ

**Loại:** Popup (mở từ ACC-053)

**Route:** `AccountController::addPublicHoliday()` — mặc định `/account/add-public-holiday`

**Module:** Tài khoản & Nhân sự

## Mô tả ngắn gọn
Form thêm mới một ngày lễ công cho một quốc gia cụ thể: khai báo mô tả, thiết lập quy tắc HR (loại ngày lễ, hệ số OT, có tính vào lương/nghỉ phép hay không) và tác động định giá theo nhu cầu.

## Mô tả chi tiết

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Country | `country_id` | Select2 (Thailand/France/Greece) | Có (`required`) | |
| 2 | Date | `date` | Text + datepicker (`dd MM, yyyy`), `startDate` = hôm nay | Có (`required`) | Validate remote AJAX `checkUniqueDate` — không cho trùng ngày với ngày lễ khác cùng quốc gia |
| 3 | Description | `description` | Textarea | Có (class `required`) | |
| 4 | Comment | `comment` | Textarea | Có (class `required`) | |
| 5 | Holiday Type | `holiday_type` | Select2 (Official/Observed/Special/Company) | Có (`required`) | Nhóm "HR Rule" |
| 6 | OT Multiplier | `ot_multiplier` | Select2 (3.0×/2.0×/1.5×/None) | Có (`required`) | Nhóm "HR Rule" |
| 7 | Paid Public Holiday | `paid_public_holiday` | Toggle switch (input ẩn `yes`/`no`) | Không, mặc định "no" | "Included in salary and leave calculations" |
| 8 | Demand Impact | `demand_impact` | Select2 (Peak/High/Medium/Low) | Có (`required`) | Nhóm "Pricing Impact" |
| 9 | Suggested Price Rule | `suggested_price_rule` | Select2 (+25%/+15%/Manual/No impact) | Có (`required`) | Nhóm "Pricing Impact" |
| 10 | Internal Note | `internal_note` | Textarea | Có (class `required`) | |

## Chức năng/nút thao tác
- **Save:** validate jQuery Validate (Date bắt buộc + remote check trùng ngày qua `checkUniqueDate`) → submit POST tới chính action `addPublicHoliday`; lưu bản ghi mới vào bảng `PublicHoliday`, hiện flash thành công/lỗi, redirect về ACC-053 (`publicHolidays`).
- **Cancel:** quay lại ACC-053.
- **checkUniqueDate (AJAX nền, không phải nút):** POST `/account/checkUniqueDate` chạy khi đổi Country hoặc Date để kiểm tra ngày đã tồn tại cho quốc gia đó chưa (action `checkUniqueDate`, không có view riêng, trả về `true`/`false`).

## Điều hướng
- Vào từ: ACC-053 (Ngày lễ) — nút "Add new".
- Điều hướng đến: quay lại ACC-053 sau khi lưu hoặc hủy.
