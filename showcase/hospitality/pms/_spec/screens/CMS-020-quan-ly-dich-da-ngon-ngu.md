# CMS-020 — Bản dịch giao diện (Interface Translations)

**Loại:** Trang đầy đủ

**Route:** `CmsController::cmsTranslation($tab)` — mặc định `/cms/cms-translation/:tab`

**Module:** CMS = Xuất bản web

## Mô tả ngắn gọn
Màn hình quản trị bản dịch đa ngôn ngữ cho toàn hệ thống, gồm 4 tab tương ứng 4 nguồn nội dung khác nhau: Mini Website, Guest Hub, Owner Hub, Azura Manager. Mỗi tab cho phép chọn ngôn ngữ và chỉnh sửa nội dung dịch của nguồn tương ứng. Tham số `tab` trên URL xác định tab nào đang active khi tải trang; khi người dùng click đổi tab, URL được cập nhật lại bằng `history.replaceState` (không tải lại trang).

## Mô tả chi tiết

Tham số route: `tab` (`mini-website` | `guest-portal` | `owner-portal` | `azura-manager`). Nếu rỗng, mặc định là `mini-website`.

Chung cho cả 4 tab: có dropdown chọn **Ngôn ngữ (Language)** (field `language`, danh sách lấy từ bảng `Language`, mặc định `en`). Đổi ngôn ngữ sẽ nạp lại nội dung bản dịch của tab hiện tại theo ngôn ngữ mới (JS, không tải lại trang) — với 2 tab đầu lấy từ dữ liệu đã có sẵn trên client, với 2 tab sau gọi AJAX tải file JSON tương ứng ngôn ngữ.

**Tab 1 — Mini Website** (`mini-website`):
- Nguồn dữ liệu & lưu trữ: bảng `CmsTranslation` (mỗi bản ghi có `id`, `language`, `title` — mã khóa dịch, `text` — nội dung dịch).
- Hiển thị: danh sách các dòng field dịch (label lấy từ `title`, ô nhập là `text`) theo ngôn ngữ đang chọn.
- Lưu: submit form → với mỗi dòng, gọi `_saveData('CmsTranslation', ['id', 'language', 'text', 'title'])` — cập nhật theo từng bản ghi theo `id`.

**Tab 2 — Guest Hub** (`guest-portal`):
- Nguồn dữ liệu & lưu trữ: bảng `GuestPortalTranslation` (cấu trúc tương tự: `id`, `language`, `title`, `text`).
- Hiển thị & lưu: tương tự Tab 1 nhưng thao tác trên `GuestPortalTranslation`.

**Tab 3 — Owner Hub** (`owner-portal`):
- Nguồn dữ liệu: **file JSON**, không phải bảng DB. Đường dẫn: `WWW_ROOT/locale/owner-translation/<language_code>.json` (nếu file của ngôn ngữ chọn không tồn tại, fallback đọc `en.json`).
- Hiển thị: bảng gồm 3 cột — Trang (Page, gom nhóm theo các key `page_name_N` trong file JSON), Nhãn (Label, suy ra từ tên key), Bản dịch (ô nhập text ứng với từng key còn lại trong JSON).
- Lưu: submit toàn bộ mảng `text[key]` của form → ghi đè **toàn bộ nội dung file JSON** `WWW_ROOT/locale/owner-translation/<language>.json` bằng `json_encode($request_data['text'])` (chỉ ghi nếu file đã tồn tại sẵn, không tự tạo file mới).

**Tab 4 — Azura Manager** (`azura-manager`):
- Nguồn dữ liệu: **file JSON**, tương tự Tab 3 nhưng đường dẫn `WWW_ROOT/locale/azura-manager-translation/<language_code>.json` (fallback `en.json` nếu không tồn tại), nhóm trang theo key `page_N`.
- Hiển thị & lưu: tương tự Tab 3, ghi đè file `WWW_ROOT/locale/azura-manager-translation/<language>.json`.

Lưu ý cơ chế lưu khác biệt giữa các tab:
- Tab 1, 2: lưu theo **từng bản ghi DB** (update theo `id`), có thể lưu một phần.
- Tab 3, 4: lưu **toàn bộ file JSON** của ngôn ngữ đang chọn (ghi đè hoàn toàn nội dung file bằng dữ liệu form hiện tại).

## Chức năng/nút thao tác
- **Chọn tab (Mini Website / Guest Hub / Owner Hub / Azura Manager):** chuyển nội dung hiển thị, đồng thời cập nhật tham số `tab` trên URL (không reload).
- **Chọn Language (dropdown, riêng theo từng tab):** nạp lại nội dung bản dịch theo ngôn ngữ mới cho tab đang active.
- **Save (mỗi tab có nút Save riêng):** lưu nội dung dịch của tab đang active (theo cơ chế lưu tương ứng nêu trên), sau đó hiển thị thông báo lưu thành công và ở lại trang.
- **Reset:** đưa form của tab hiện tại về trạng thái mặc định (HTML reset).

## Điều hướng
- Vào từ: menu chính (mục Interface Translations).
- Điều hướng đến: không điều hướng sang màn hình khác; lưu xong ở lại chính CMS-020, tab vẫn giữ nguyên qua tham số `tab` trên URL.
