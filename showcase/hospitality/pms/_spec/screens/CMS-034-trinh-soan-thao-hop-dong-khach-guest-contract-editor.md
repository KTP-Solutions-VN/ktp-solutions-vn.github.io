# CMS-034 — Trình soạn thảo nội dung hợp đồng khách (Guest Contract Editor)

**Loại:** Trang đầy đủ

**Route:** `CmsController::contracts()` — mặc định `/cms/contracts` (GET có thể kèm query `country_id`, `language_code`, `tab`, `section_key`, `payment_setting_type`, `general_version_id`; cùng route cũng nhận AJAX GET `?ajax_action=load` và AJAX/POST submit form)

**Module:** CMS = Nội dung trang chủ

## Mô tả ngắn gọn
Màn hình quản trị soạn thảo **nội dung/điều khoản hợp đồng khách (Guest Contract)** dùng chung cho toàn hệ thống, được cấu hình theo từng cặp **Country (quốc gia)** và **Language (ngôn ngữ)**. Nội dung soạn ở đây là các đoạn văn bản mẫu (rich text, có thể chèn biến động `{property.xxx}`, `{booking.xxx}`) sẽ được ghép vào hợp đồng khách thực tế của villa khi phát hành. Màn hình có **3 khối nội dung chính (tab)**: General (nội dung chung theo từng "phiên bản"/property type), Section (các đoạn điều khoản: check-in/checkout, deposit, pool cleaning), và Electricity (điều khoản tiền điện theo từng kiểu thanh toán). Truy cập được kiểm soát bởi permission key `Cms-contracts`; nếu không đủ quyền, hệ thống hiển thị Flash cảnh báo và redirect về trang trước (hoặc trả JSON lỗi nếu gọi qua AJAX).

Toàn bộ thao tác trong trang (đổi Country/Language, đổi tab, chọn version/section/electricity type, lưu, xoá) đều xử lý bằng AJAX tại chỗ (load lại panel nội dung qua `ajax_action=load`, lưu qua POST AJAX) — không có tab điều hướng bằng iframe/modal, nhưng link tab vẫn có `href` dạng full-page (fallback khi JS tắt/khi có thay đổi chưa lưu sẽ tự lưu trước khi chuyển trang qua `navigateWithPendingSave`).

## Mô tả chi tiết

### Bộ lọc chung (áp dụng cho toàn trang)

| Filter | Field code | Loại input | Ảnh hưởng dữ liệu |
|---|---|---|---|
| Quốc gia (Country) | `country_id` | Dropdown (`<select>`, id `guest-contract-country`) | Là khoá chính để tải toàn bộ dữ liệu General Version, Section Template, Electricity Template, Status Summary, Preview Values theo quốc gia đã chọn. Mặc định lấy quốc gia đầu tiên trong danh sách (sắp theo tên A–Z) nếu không truyền `country_id`. Đổi Country sẽ điều hướng lại (`navigateWithPendingSave`) sang URL mới, giữ nguyên chưa có `language_code`/`tab` (reset về mặc định) |
| Ngôn ngữ (Language) | `language_code` | Nút bấm dạng tab ngôn ngữ (không phải dropdown) — hiển thị trong từng tab nội dung (`.gc-lang` / `.gc-version-lang`) | Chỉ giới hạn trong 5 ngôn ngữ được hỗ trợ soạn hợp đồng: `en` (English), `fr` (French), `cn` (Chinese), `ru` (Russian), `ar` (Arabic) — lấy tên hiển thị thực tế từ bảng `Language` nếu có, nếu không dùng tên mặc định. Mặc định là `en` nếu hợp lệ, ngược lại lấy ngôn ngữ đầu tiên trong danh sách hỗ trợ. Đổi ngôn ngữ sẽ tải lại nội dung General/Section/Electricity Template tương ứng với Country + Language đang chọn (tab General: chuyển ngôn ngữ chỉ đổi nội dung soạn thảo tại chỗ trong bộ nhớ trình duyệt, không gọi AJAX, cho tới khi Lưu mới ghi từng ngôn ngữ) |
| Tab | `tab` | Link dạng tab | Nhận 1 trong 3 giá trị: `general`, `section`, `electricity`. Mặc định `general`. Giá trị không hợp lệ tự về `general` |
| Section key (chỉ khi tab = section) | `section_key` | Nút bấm lựa chọn section | Nhận 1 trong 4 giá trị: `checkin_checkout`, `deposit_no_deposit` (No deposit), `deposit` (Deposit), `pool_cleaning`. Mặc định `checkin_checkout` nếu rỗng/không hợp lệ |
| Payment setting type (chỉ khi tab = electricity) | `payment_setting_type` | Nút bấm lựa chọn kiểu tính tiền điện | Nhận 1 trong 6 giá trị hiển thị: `included`, `collect_fixed`, `collect_quota`, `collect_kwh`, `platform_separate`, `combined_separate` (2 loại `platform_rental`, `combined_rental` có định nghĩa nhãn trong code nhưng KHÔNG xuất hiện trong danh sách hiển thị `_guestContractVisibleElectricityTypes()`/UI). Mặc định `included` nếu rỗng/không hợp lệ |
| General version ID (chỉ khi tab = general) | `general_version_id` | Chọn từ danh sách "Version Library" bên trái | Xác định phiên bản nội dung chung (General Content Version) đang xem/sửa. Nếu rỗng, mặc định lấy version đầu tiên (sắp theo `property_type` → `name` tăng dần) của Country đang chọn |

**Lưu ý về giao diện tab:** UI hiển thị **5 mục điều hướng** (không phải 3), vì tab `section` được tách hiển thị thành 3 mục theo `section_key`: **General content** (tab=general), **Check-in/Checkout** (tab=section, section_key=checkin_checkout), **Deposit** (tab=section, section_key=deposit hoặc deposit_no_deposit — bấm vào mở section_key đầu tiên trong nhóm deposit), **Electricity** (tab=electricity), **Pool cleaning** (tab=section, section_key=pool_cleaning). Mỗi mục có badge trạng thái (xem "Tóm tắt trạng thái" bên dưới).

**Tóm tắt trạng thái (status summary) hiển thị trên từng tab:**
Với mỗi khối nội dung (`general`, `checkin_checkout`, `deposit`, `electricity`, `pool_cleaning`), hệ thống kiểm tra: đã có nội dung (body không rỗng sau khi `strip_tags`) cho **đủ cả 5 ngôn ngữ** hỗ trợ hay chưa, theo Country đang chọn.
- Trạng thái **"Complete"** (tone `ok`, xanh): đủ nội dung cho tất cả ngôn ngữ.
- Trạng thái **"Not configured"** (tone `bad`, đỏ): chưa có bản ghi nào (áp dụng riêng cho `general` khi chưa có version nào).
- Trạng thái **"<Mã ngôn ngữ còn thiếu> Missing"** (tone `warn`, vàng): liệt kê các mã ngôn ngữ (viết hoa, cách nhau dấu phẩy) chưa có nội dung.
- Riêng khối `general`: coi là thiếu ngôn ngữ nếu **bất kỳ version nào** trong Country đó chưa có nội dung ngôn ngữ đó (tính gộp trên tất cả version).
- Riêng khối `deposit`: coi là "Complete" chỉ khi **cả 2** section (`deposit_no_deposit` và `deposit`) đều có đủ nội dung cho ngôn ngữ đó.
- Riêng khối `electricity`: coi là "Complete" chỉ khi **cả 6** loại payment_setting_type hiển thị đều có nội dung cho ngôn ngữ đó.

**Biến động (`{property.xxx}`, `{booking.xxx}`) và khối "Preview":**
Mỗi section/electricity type có một danh sách biến cho phép chèn (hiển thị dạng tag bấm để chèn vào editor tại vị trí con trỏ). Khối "Preview" bên phải hiển thị nội dung đã thay biến bằng giá trị mẫu (`previewValues`, lấy từ 1 villa mẫu đầu tiên thuộc Country đang chọn — check-in/out time, deposit, pool cleaning time, electricity rate — hoặc giá trị mặc định cứng nếu villa không có dữ liệu). Đây chỉ là dữ liệu xem trước minh hoạ, không phải dữ liệu thật của từng villa cụ thể.

Bảng biến theo từng section/electricity type:

| Section/Type | Field code | Biến động khả dụng |
|---|---|---|
| Check-in/Checkout | `checkin_checkout` | `{property.check_in_time}`, `{property.check_out_time}` |
| No deposit | `deposit_no_deposit` | (không có biến) |
| Deposit | `deposit` | `{property.deposit_amount}` |
| Pool cleaning | `pool_cleaning` | `{property.pool_cleaning_time}`, `{property.pool_cleaning_frequency}` |
| Included (điện đã bao gồm) | `included` | (không có biến) |
| Collect fixed (thu cố định) | `collect_fixed` | `{property.electricity_daily_amount}` |
| Collect quota (thu theo hạn mức) | `collect_quota` | `{property.electricity_quota_kwh}`, `{property.electricity_extra_kwh_rate}` |
| Collect kWh (thu theo kWh) | `collect_kwh` | `{property.electricity_kwh_rate}` |
| Platform separate | `platform_separate` | (không có biến) |
| Combined separate | `combined_separate` | `{property.electricity_quota_kwh}`, `{property.electricity_extra_kwh_rate}` |

---

### Tab: General (Nội dung chung)

Bố cục 3 cột: **(1) Version Library** (danh sách các "phiên bản" nội dung chung, bên trái) → **(2) Form soạn thảo** (giữa) → **(3) Preview** (phải).

Mỗi "General Content Version" (bảng `GuestContractGeneralVersion`) đại diện cho 1 bộ nội dung chung dùng cho 1 loại hình bất động sản (Flat/House/Resort), có thể có nhiều bản dịch (bảng `GuestContractGeneralVersionContent`, 1 bản ghi/ngôn ngữ). Người dùng chọn version ở Version Library, sau đó soạn nội dung cho từng ngôn ngữ (chuyển đổi bằng nút ngôn ngữ, nội dung từng ngôn ngữ được giữ tạm trong bộ nhớ trình duyệt cho tới khi bấm Lưu — Lưu sẽ ghi đồng thời tất cả ngôn ngữ đã soạn trong phiên làm việc).

**Version Library (danh sách bên trái):**

| # | Thành phần | Field code | Ghi chú |
|---|---|---|---|
| 1 | Tên version | `name` | Hiển thị đậm |
| 2 | Ghi chú nội bộ | `internal_note` | Hiển thị nhỏ dưới tên |
| 3 | Tag loại hình | `property_type` | Viết hoa chữ cái đầu (Flat/House/Resort) |
| 4 | Tag ngôn ngữ đã có nội dung | (tính toán) | Danh sách mã ngôn ngữ viết hoa đã có `body` không rỗng, cách nhau khoảng trắng |
| 5 | Icon Sửa (bút chì) | — | Click card để chọn version vào sửa |
| 6 | Icon Xoá (×) | — | Mở modal xác nhận xoá |

**Form soạn thảo (fields):**

| # | Tên field | Field code | Loại input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại lưu (ẩn) | `save_type` | Hidden | — | Luôn = `general` |
| 2 | Tab (ẩn) | `tab` | Hidden | — | Luôn = `general` |
| 3 | Country (ẩn) | `country_id` | Hidden | — | Đồng bộ theo Country đang chọn ở đầu trang |
| 4 | Language code (ẩn) | `language_code` | Hidden (`.js-language-code`) | — | Đổi theo nút ngôn ngữ đang active |
| 5 | General Version ID (ẩn) | `general_version_id` | Hidden (`.js-general-version-id`) | — | Rỗng khi tạo version mới |
| 6 | Tên phiên bản (Version name) | `name` | Text input | **Bắt buộc** | Validate cả client (JS) lẫn server; trống → lỗi "Version name is required" (field `name`) |
| 7 | Ghi chú nội bộ (Internal note) | `internal_note` | Text input | Không bắt buộc | Ghi chú riêng cho quản trị viên, không hiển thị cho khách |
| 8 | Loại hình bất động sản (Property type) | `property_type` | Radio group dạng nút chọn (3 lựa chọn) | **Bắt buộc** | Giá trị: `flat` (Flat), `house` (House), `resort` (Resort); trống → lỗi "Property type is required"; giá trị không thuộc 3 loại trên → lỗi "Invalid property type" |
| 9 | Nội dung hợp đồng (Body) | `body` (gửi kèm `body_by_language[<lang>]` cho từng ngôn ngữ đã soạn khi Lưu) | Rich text editor (TinyMCE, textarea `.gc-rich-text-editor`) | Không bắt buộc | Nội dung HTML/text tự do, có thể chèn biến `{property.xxx}`/`{booking.xxx}` thủ công (tab General không hiển thị sẵn danh sách tag biến để chèn — không có khối "Automatic fields" ở tab này) |

**Preview (bên phải):** hiển thị nội dung `body` hiện tại (đã escape HTML/xuống dòng) theo thời gian thực khi soạn thảo.

### Tab: Section (Check-in/Checkout, Deposit, Pool cleaning)

Bố cục 2 cột: **Form soạn thảo** (trái) + **Preview** (phải). Phía trên có dải nút chọn ngôn ngữ; nếu `section_key` đang thuộc nhóm Deposit (`deposit_no_deposit` hoặc `deposit`) thì hiển thị thêm dải nút phụ để chuyển đổi giữa "No deposit" và "Deposit".

Model dữ liệu: `GuestContractSectionTemplate` — 1 bản ghi ứng với (Country, Section key, Language).

| # | Tên field | Field code | Loại input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại lưu (ẩn) | `save_type` | Hidden | — | Luôn = `section` |
| 2 | Tab (ẩn) | `tab` | Hidden | — | Luôn = `section` |
| 3 | Country (ẩn) | `country_id` | Hidden | — | |
| 4 | Language code (ẩn) | `language_code` | Hidden (`.js-language-code`) | — | |
| 5 | Section key (ẩn) | `section_key` | Hidden | — | Một trong: `checkin_checkout`, `deposit_no_deposit`, `deposit`, `pool_cleaning`; server validate phải thuộc danh sách hợp lệ, sai → lỗi "Invalid contract section" |
| 6 | Chọn section con (chỉ nhóm Deposit) | (nút `.js-section-option`, set `section_key`) | Nút bấm 2 lựa chọn: "No deposit" / "Deposit" | — | Chỉ hiển thị khi đang ở nhóm Deposit |
| 7 | Nội dung điều khoản (Body) | `body` | Rich text editor (TinyMCE, textarea `.gc-rich-text-editor`) | Không bắt buộc | Có khối "Automatic fields" hiển thị các biến khả dụng theo `section_key` hiện tại (xem bảng biến ở trên) để chèn nhanh vào editor |

**Preview (bên phải):** nội dung `body` với biến đã thay bằng giá trị mẫu (`previewValues`).

### Tab: Electricity

Bố cục 2 cột: **Form soạn thảo** (trái, có dải nút chọn 1-trong-6 kiểu thanh toán điện phía trên) + **Preview** (phải). Phía trên còn có dải nút chọn ngôn ngữ.

Model dữ liệu: `GuestContractElectricityTemplate` — 1 bản ghi ứng với (Country, Payment setting type, Language).

| # | Tên field | Field code | Loại input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Loại lưu (ẩn) | `save_type` | Hidden | — | Luôn = `electricity` |
| 2 | Tab (ẩn) | `tab` | Hidden | — | Luôn = `electricity` |
| 3 | Country (ẩn) | `country_id` | Hidden | — | |
| 4 | Language code (ẩn) | `language_code` | Hidden (`.js-language-code`) | — | |
| 5 | Payment setting type (ẩn) | `payment_setting_type` | Hidden (`.js-payment-setting-type`) | — | |
| 6 | Chọn kiểu thanh toán điện | (nút `.js-electricity-option`, set `payment_setting_type`) | Nút bấm, 6 lựa chọn hiển thị: 1. Included, 2 Collect fixed, 3 Collect quota, 4 Collect kWh, 5 Platform separate, 6 Combined separate | **Bắt buộc** | Server validate giá trị phải thuộc `_guestContractVisibleElectricityTypes()`, sai → lỗi "Invalid electricity configuration" |
| 7 | Ghi chú cấu hình đang chọn | (readonly, tính toán) | Text hiển thị (không phải input) | — | Hiển thị label + ghi chú hướng dẫn tương ứng với kiểu đang chọn (ví dụ nhắc "Write electricity rule") |
| 8 | Nội dung điều khoản (Body) | `body` | Rich text editor (TinyMCE, textarea `.gc-rich-text-editor`) | Không bắt buộc | Có khối "Automatic fields for case" hiển thị biến khả dụng theo kiểu thanh toán hiện tại (xem bảng biến ở trên); ẩn khối này nếu kiểu đó không có biến nào |

**Preview (bên phải):** nội dung `body` với biến đã thay bằng giá trị mẫu (`previewValues`).

## Chức năng/nút thao tác
- **Đổi Country (dropdown):** tải lại toàn bộ trang/dữ liệu theo quốc gia mới; nếu form hiện tại đang có thay đổi chưa lưu (chỉ áp dụng cho tab Section/Electricity — tab General không tự lưu khi chuyển trang) thì tự động Lưu trước rồi mới điều hướng.
- **Chuyển tab / chuyển mục (General, Check-in/Checkout, Deposit, Electricity, Pool cleaning):** điều hướng qua link (có `href` full-page) nhưng được bắt sự kiện click để nạp dữ liệu bằng AJAX tại chỗ; nếu có thay đổi chưa lưu, tự lưu trước.
- **Đổi ngôn ngữ (nút mã ngôn ngữ):** với tab General — chỉ hoán đổi nội dung soạn thảo trong bộ nhớ (không gọi AJAX); với tab Section/Electricity — nạp lại `body` tương ứng ngôn ngữ mới bằng AJAX (tự lưu trước nếu đang có thay đổi chưa lưu).
- **"+ New version" (chỉ tab General):** reset form soạn thảo về trạng thái tạo version mới (xoá `general_version_id`, xoá tên/ghi chú, đặt property_type mặc định = `flat`, xoá nội dung).
- **Chọn version trong Version Library (chỉ tab General):** nạp dữ liệu version đó bằng AJAX (tên, ghi chú, loại hình, nội dung theo ngôn ngữ đang chọn).
- **Icon Sửa trên card version:** không có hành vi riêng ngoài việc click card (mở version đó để sửa).
- **Icon Xoá (×) trên card version (chỉ tab General):** mở modal xác nhận xoá; xác nhận sẽ gọi AJAX POST `save_type=delete_general` — xoá toàn bộ nội dung dịch (`GuestContractGeneralVersionContent`) rồi xoá version (`GuestContractGeneralVersion`); lỗi nếu không tìm thấy version hoặc xoá thất bại.
- **Chọn section con (No deposit / Deposit, chỉ khi ở nhóm Deposit):** nạp lại nội dung section tương ứng bằng AJAX.
- **Chọn kiểu thanh toán điện (6 nút, chỉ tab Electricity):** nạp lại nội dung electricity template tương ứng bằng AJAX.
- **Chèn biến động (tag `{property.xxx}`/`{booking.xxx}`, tab Section/Electricity):** chèn chuỗi biến vào vị trí con trỏ trong rich text editor, đồng thời cập nhật Preview.
- **Lưu (Save, nút submit — tab General và ngầm định cho tab Section/Electricity qua submit form):**
  - Validate client: Country bắt buộc; nếu là tab General thì Tên version và Loại hình bắt buộc.
  - Validate server tương ứng theo `save_type` (`general`/`section`/`electricity`) như mô tả ở từng tab.
  - Tab General: lưu/tạo `GuestContractGeneralVersion`, sau đó lưu/tạo từng `GuestContractGeneralVersionContent` cho **tất cả ngôn ngữ đã soạn trong phiên** (gửi `body_by_language[<lang>]`), không chỉ ngôn ngữ đang active.
  - Tab Section: lưu/tạo 1 bản ghi `GuestContractSectionTemplate` theo (Country, Section key, Language) đang chọn.
  - Tab Electricity: lưu/tạo 1 bản ghi `GuestContractElectricityTemplate` theo (Country, Payment setting type, Language) đang chọn.
  - Thành công: hiển thị thông báo (banner xanh, tự ẩn sau 3 giây với dạng AJAX), cập nhật lại Version Library/Status Summary/Preview tại chỗ; POST không phải AJAX thì Flash message + redirect lại `contracts` với query giữ nguyên ngữ cảnh.
  - Thất bại: hiển thị lỗi tại field liên quan (nếu có `field` trả về) + banner đỏ.
- **Cancel (chỉ tab General):** nạp lại dữ liệu hiện tại bằng AJAX, huỷ các thay đổi chưa lưu trên form.
- **Modal xác nhận xoá version:** nút "Cancel" đóng modal; nút "Delete" xác nhận xoá (xem mục Icon Xoá ở trên).

## Model/bảng dữ liệu liên quan
- `GuestContractGeneralVersion` — phiên bản nội dung chung theo Country + loại hình BĐS (`property_type`: flat/house/resort), có `name`, `internal_note`, `created_by`, `created_at`, `updated_at`.
- `GuestContractGeneralVersionContent` — bản dịch nội dung (`body`) của 1 `GuestContractGeneralVersion` theo `language_code` (quan hệ 1-nhiều: 1 version có nhiều bản dịch, mỗi ngôn ngữ 1 bản ghi).
- `GuestContractSectionTemplate` — nội dung điều khoản theo (`country_id`, `section_key`, `language_code`), có `body`.
- `GuestContractElectricityTemplate` — nội dung điều khoản điện theo (`country_id`, `payment_setting_type`, `language_code`), có `body`.
- Tham chiếu chỉ đọc: `Country`, `Language` (danh sách dropdown/ngôn ngữ hỗ trợ), `Villa`, `VillaLocation`, `VillaRule`, `PoolCleaning`, `VillaElectricityRate` (chỉ dùng để tính dữ liệu mẫu cho Preview, không bị chỉnh sửa từ màn hình này).

**Cơ chế đa ngôn ngữ:** lưu trữ theo dạng **1 bản ghi riêng cho mỗi cặp (đối tượng nội dung, ngôn ngữ)** — không serialize gộp nhiều ngôn ngữ trong 1 cột. Cụ thể: General → mỗi (version, language_code) là 1 dòng trong `GuestContractGeneralVersionContent`; Section → mỗi (country_id, section_key, language_code) là 1 dòng trong `GuestContractSectionTemplate`; Electricity → mỗi (country_id, payment_setting_type, language_code) là 1 dòng trong `GuestContractElectricityTemplate`. Toàn bộ nội dung luôn gắn với 1 `country_id` cụ thể — không có khái niệm nội dung "toàn cầu" dùng chung nhiều quốc gia.

## Điều hướng
- Vào từ: menu chính (Settings/CMS, `active_menu = 184`), yêu cầu permission key `Cms-contracts`.
- Điều hướng đến: không có (đây là action độc lập, tự quản lý toàn bộ 3 tab bằng AJAX tại chỗ; không mở popup hay điều hướng sang action con nào khác trong `CmsController`).
