# CMS-023 — Nội dung trang chủ đề (Themed Site Content)

**Loại:** Trang đầy đủ

**Route:** `CmsController::collectionTabs($tab, $id)` — mặc định `/cms/collection-tabs/:tab/:id`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Màn hình quản lý toàn bộ nội dung chi tiết của **một** "collection website" (website tổng hợp nhiều villa theo khu vực, dùng để giới thiệu bộ sưu tập villa cho khách). Giao diện dạng tab, gồm 5 tab con: **I Wish**, **Properties**, **Insights**, **Id Card**, **Footer**. `$id` là id của bản ghi `GuestCollectionWebsite` (được chọn từ CMS-021); `$tab` xác định tab đang active trên URL (mặc định `i-wish` khi rỗng). Khi chưa có `$id` (chưa chọn/tạo website), 4 tab Properties/Insights/Id Card/Footer bị khoá (class `disabled`), chỉ tab I Wish thao tác được.

Chuyển tab thực hiện bằng JS (thay đổi URL qua `history.replaceState`, không phải AJAX load nội dung) — riêng khi chuyển sang tab **Properties** trang sẽ `location.reload()` để tải lại dữ liệu; các tab khác chỉ đổi trạng thái `active` của `.tab-pane` đã render sẵn trong DOM (mọi tab đều được render cùng lúc trong 1 lần load trang, không phải lazy-load).

## Mô tả chi tiết

### Tab: Wishlist (`tab=i-wish`, mặc định)
Danh sách toàn bộ hạng mục "I Wish" (nhu cầu/sở thích khách, ví dụ: Beach, Golf, Spa...) lấy từ danh mục dùng chung `GuestCollectionIwish`, cho phép bật/tắt (toggle on/off) hạng mục nào áp dụng cho collection website hiện tại.

| # | Tên cột | Field code | Ghi chú |
|---|---|---|---|
| 1 | STT | | |
| 2 | Tiêu đề | `GuestCollectionIwish.title` | Danh mục I Wish dùng chung toàn hệ thống, sort A-Z |
| 3 | Bật/tắt | icon toggle on/off | Trạng thái "on" nếu tồn tại bản ghi `GuestIwish` với `guest_collection_iwish_id` + `guest_collection_website_id` tương ứng |

Model liên quan: `GuestCollectionIwish` (danh mục master, đọc-only ở đây), `GuestIwish` (bảng liên kết N-N giữa website và I Wish, lưu trạng thái bật).

### Tab: Properties (`tab=properties`, chỉ dùng được khi đã có `$id`)
Ma trận gán villa vào từng hạng mục I Wish đã bật, theo Quốc gia → Khu vực (District) → Villa. Dùng để xác định villa nào thuộc hạng mục I Wish nào trên website collection.

| # | Tên field | Field code | Loại | Ghi chú |
|---|---|---|---|---|
| 1 | Cột theo từng I Wish đang bật | `i_wish[]` (value = `"<district>-<iwish_id>"`) | Checkbox | 1 cột/hạng mục I Wish có status "on"; đại diện flag "khu vực này có áp dụng hạng mục I Wish này" |
| 2 | Chọn tất cả villa trong khu vực | `.select-all` (không submit trực tiếp) | Checkbox | Check/uncheck toàn bộ checkbox villa cùng khu vực (client-side) |
| 3 | Villa trong khu vực (mở rộng) | `<TênKhuVực>[]` = id villa | Checkbox | Danh sách villa thuộc khu vực đó, ẩn/hiện qua icon mũi tên; villa tick chọn nghĩa là villa được liệt kê dưới hạng mục I Wish tương ứng |

Dữ liệu lưu vào `GuestProperty.data` (serialize PHP), cấu trúc `data[guest_collection_iwish_id][district_name] = [villa_id, villa_id, ...]`.

Model liên quan: `GuestProperty` (guest_collection_website_id, data), `District` (contain `Country`), `Villa` (contain `Owner`, `VillaLocation`), `GuestCollectionIwish`/`GuestIwish` (để biết I Wish nào đang "on" cho website này — dùng lại kết quả từ tab I Wish).

### Tab: Journal (`tab=insights`, chỉ dùng được khi đã có `$id`)
Danh sách các "Insight" (bài viết/thông tin gợi ý cho khách) gắn với collection website, mỗi dòng có thể gán vào 1 loại Insight thuộc danh mục dùng chung.

| # | Tên cột | Field code | Loại | Ghi chú |
|---|---|---|---|---|
| 1 | STT | | | |
| 2 | Tiêu đề | `GuestInsight.title` | Text (hiển thị) | Nhập khi thêm mới, không sửa trực tiếp trên danh sách |
| 3 | Insight | `guest_collection_insight_id` | Dropdown (`GuestCollectionInsight`) | Đổi giá trị lưu ngay lập tức qua AJAX `updateInsightAjax`, không cần bấm Save |
| 4 | Xoá | nút thùng rác | Action | Mở popup xác nhận, xoá qua submit `collection_insight_delete=delete` |

Popup "Add New Insight" (modal `#exampleModal`, KHÔNG phải trang riêng — vẫn cùng 1 trang collectionTabs):

| # | Tên field | Field code | Loại | Bắt buộc |
|---|---|---|---|---|
| 1 | Title | `title` | Text | Có |
| 2 | Insight | `guest_collection_insight_id` | Dropdown (`GuestCollectionInsight`) | Có |

Model liên quan: `GuestInsight` (id, title, guest_collection_insight_id, guest_collection_website_id), `GuestCollectionInsight` (danh mục Insight dùng chung, tương tự CMS-026 — do đồng nghiệp phụ trách).

### Tab: Id Card (`tab=id-card`, chỉ dùng được khi đã có `$id`)
Form quản lý "thẻ giới thiệu" (business/ID card) của collection website: ngôn ngữ hỗ trợ, thông tin liên hệ, 2 ảnh minh hoạ.

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ngôn ngữ | `language[]` | Checkbox multi-select (`Language`) | Không | Mặc định `en` luôn được check sẵn |
| 2 | Contact | `contact` | Text | Có | |
| 3 | Email | `email` | Text | Có | |
| 4 | Logo | `logo` (file) / `cropped_logo` (base64 nếu crop) | Upload ảnh | Không | Tỉ lệ bắt buộc 3:2, < 1MB; nếu ảnh chọn sai tỉ lệ sẽ tự động crop client-side (canvas) trước khi gửi |
| 5 | Ảnh mặt trước (Image 2) | `front_image` (file) / `cropped_image` (base64 nếu crop) | Upload ảnh | Không | Tỉ lệ bắt buộc 21:9, < 5MB; tự động crop tương tự |

Model liên quan: `GuestIdCard` (id, guest_collection_website_id, language — serialize mảng mã ngôn ngữ, contact, email, logo, front_image). Ảnh lưu thư mục `files/villas/`.

### Tab: Footer (`tab=footer`, chỉ dùng được khi đã có `$id`)
Quản lý nội dung footer của website, gồm 2 form độc lập lưu riêng.

**Form 1 — Danh sách link mạng xã hội/website ngoài** (`footer_form_1`):

| # | Tên field | Field code | Loại | Ghi chú |
|---|---|---|---|---|
| 1 | Url | `url.` (mảng động theo index) | Text (type=url) | Thêm/xoá động qua nút "Add more" / nút trừ |
| 2 | Display Name | `name.` (mảng động theo index) | Text | Đi kèm từng Url |

Lưu vào `GuestFooter.websites` = serialize(`[display_name => url, ...]`).

**Bộ lọc ngôn ngữ** (form riêng, không lưu dữ liệu): dropdown `language` (danh mục `Language`) + nút Search — chỉ để chọn ngôn ngữ hiển thị/chỉnh sửa ở Form 2 bên dưới (submit lại trang với `language_filter=Search`, ép `$tab='footer'`).

**Form 2 — Nội dung footer đa ngôn ngữ** (`footer_form_2`):

| # | Tên field | Field code | Loại | Ghi chú |
|---|---|---|---|---|
| 1 | Book with confidence | `book_with_confidence` | Dropdown | Chọn 1 bản dịch có sẵn trong `CollectionTranslation` (type=`book_with_confidence`, theo ngôn ngữ đang lọc) |
| 2 | Terms & Conditions | `terms_and_condition` | Dropdown | Nguồn `CollectionTranslation` type=`terms_&_condition` |
| 3 | Personal data policy | `personal_data_policy` | Dropdown | Nguồn `CollectionTranslation` type=`personal_data_policy` |
| 4 | Why work with us | `why_work_with_us` | Dropdown | Nguồn `CollectionTranslation` type=`why_work_with_us` |
| 5 | Guarantee | `gurantee` | Dropdown | Nguồn `CollectionTranslation` type=`guarantee` |
| 6 | Facebook | `facebook` | Text | Không đa ngôn ngữ |
| 7 | Instagram | `instagram` | Text | Không đa ngôn ngữ |

5 field dropdown (1-5) đều lưu dạng serialize theo ngôn ngữ: `GuestFooter.<field> = serialize([lang => selected_title, ...])`, merge thêm ngôn ngữ mới vào mảng đã có khi Save.

Model liên quan: `GuestFooter` (id, guest_collection_website_id, websites, book_with_confidence, terms_and_condition, personal_data_policy, why_work_with_us, gurantee, facebook, instagram — đều serialize trừ facebook/instagram), `CollectionTranslation` (kho text chung theo `type` + `language`, được quản lý ở CMS-024/CMS-025 — 5 dropdown trên tab Footer chỉ **chọn** bản ghi có sẵn, không tạo mới tại đây).

## Chức năng/nút thao tác
- **Chuyển tab (nav-link):** đổi URL bằng JS, không reload (riêng tab Properties sẽ `location.reload()`).
- **Tab Wishlist — toggle icon:** bật/tắt trực tiếp, gọi AJAX `POST /VM/cms/addIwish` (action `addIwish()`, không có route đẹp, không mở trang riêng). Payload: `collection_id`, `wish_id`, `status` (`On`/`Off`). `status=On` → tạo/cập nhật bản ghi `GuestIwish`; `status=Off` → xác nhận qua `confirm()` rồi xoá (`deleteAll`) bản ghi `GuestIwish` tương ứng. Trả JSON `{response, message}`, cập nhật khối thông báo `#message-board` bằng JS, không reload trang.
- **Tab Properties — Save (`property_form`):** lưu ma trận villa/khu vực/I Wish vào `GuestProperty`; nếu không tick I Wish nào sẽ báo lỗi "Please select the desired I Wish corrosponding to property." Reset trả form về mặc định (client-side).
- **Tab Journal — Add New (modal):** submit `action=insight_new_form` → tạo `GuestInsight` mới.
- **Tab Journal — đổi dropdown Insight từng dòng:** gọi AJAX `POST /VM/cms/updateInsightAjax` (action `updateInsightAjax()`, không route đẹp) ngay khi `change`, payload `guest_insight_id`, `value` → cập nhật `GuestInsight.guest_collection_insight_id` tức thời, không cần Save/redirect.
- **Tab Journal — Delete (modal xác nhận):** submit `collection_insight_delete=delete` + `collection_insight_id` → xoá `GuestInsight`.
- **Tab Id Card — Save (`collection_id_card_form`):** lưu/khởi tạo `GuestIdCard`; ảnh chỉ ghi đè khi có file/ảnh crop mới, ngược lại giữ ảnh cũ.
- **Tab Footer — Save (link) (`footer_form_1`):** lưu danh sách website link vào `GuestFooter.websites`.
- **Tab Footer — Search (lọc ngôn ngữ):** load lại nội dung 5 dropdown Form 2 theo ngôn ngữ chọn (không lưu dữ liệu).
- **Tab Footer — Save (nội dung) (`footer_form_2`):** lưu 5 lựa chọn dropdown (theo ngôn ngữ đang lọc, merge vào dữ liệu đã có) + Facebook/Instagram vào `GuestFooter`.
- **Reset (mỗi form):** reset về giá trị ban đầu, client-side, không gọi server.

Ghi chú kỹ thuật: biến `$villas` (danh sách toàn bộ villa) được controller truyền ra view nhưng không thấy sử dụng trong 5 element tab (`i_wish.ctp`, `properties.ctp`, `insights.ctp`, `id_card.ctp`, `footer.ctp`) — có thể là biến dư thừa/không dùng.

## Điều hướng
- Vào từ: CMS-021 (Trang chủ đề — chọn 1 website để vào quản lý nội dung chi tiết); breadcrumb JS trên trang cũng có link quay lại CMS-021 (`controller=cms, action=collectionWebsites`, label "Themed Sites").
- Điều hướng đến: các popup nội bộ (Add Insight, Delete Insight) đều nằm trong cùng trang, không điều hướng sang URL khác. Sau khi Save mỗi tab (trừ Footer form 2), trang tự redirect lại chính nó (`collectionTabs/<tab>/<id>`) để hiển thị flash message.
- Liên quan (không mô tả sâu, do đồng nghiệp phụ trách): CMS-022 (`collectionWebsiteEdit` — sửa thông tin cơ bản của website, tách riêng khỏi màn hình này); danh mục nguồn cho tab I Wish/Insights được quản lý ở CMS-028/CMS-029 (`iWish`/`iWishEdit`) và CMS-026/CMS-027 (`insights`/`insightsEdit`); danh mục text dùng cho tab Footer được quản lý ở CMS-024 (`collectionCommonText`) và CMS-025 (`editCollectionCommonText`).
