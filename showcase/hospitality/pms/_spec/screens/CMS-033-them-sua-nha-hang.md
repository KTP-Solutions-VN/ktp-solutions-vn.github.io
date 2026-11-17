# CMS-033 — Thêm/Sửa nhà hàng (Guest Portal)

**Loại:** Trang đầy đủ

**Route:** `CmsController::restaurants($tab, $restaurant_id)` — mặc định `/cms/restaurants/:tab/:restaurant_id`

**Module:** CMS = Nội dung trang chủ

## Mô tả ngắn gọn
Form thêm mới hoặc chỉnh sửa 1 nhà hàng hiển thị trên Guest Portal, dùng chung 1 action cho cả Add (không truyền `restaurant_id`) và Edit (có `restaurant_id`). Màn hình có 2 tab: **Restaurant** (thông tin chung nhà hàng) và **Image** (ảnh scroll/banner nhà hàng). Tab Image chỉ mở được sau khi nhà hàng đã được lưu lần đầu (đã có `restaurant_id`).

## Mô tả chi tiết

Giao diện dạng tab (Bootstrap nav-tabs), tham số `$tab` xác định tab đang active (`restaurant` mặc định hoặc `image`); tab **Image** bị disable (không click được) khi chưa có `restaurant_id`.

### Tab: Restaurant (thông tin chung) — element `cms/restaurant.ctp`

Bảng field (form):

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Dropdown (select2, danh sách BU theo phân quyền user) | Không đánh dấu required trong HTML | Mặc định chọn theo BU hiện có của bản ghi; option rỗng bị disable |
| 2 | Tên nhà hàng | `name` | Text | Có (`required`) | |
| 3 | Logo | `logo` (+ `cropped_logo` ẩn) | Upload ảnh + crop client-side (canvas) | Không | Click vào ảnh logo hiện tại để mở chọn file; JS kiểm tra tỉ lệ ảnh, nếu lệch tỉ lệ 1:1 (dung sai 10%) sẽ tự động crop vuông qua canvas trước khi lưu vào `cropped_logo`; giới hạn 1.2MB; ảnh lưu tại `files/restaurants/` |
| 4 | Địa chỉ | `address` | Text | Có (`required`) | Khi gõ, JS gọi Google Geocoding API để tự lấy toạ độ, set vào 2 field ẩn `latitude`/`longitude` |
| 5 | Vĩ độ / Kinh độ | `latitude`, `longitude` | Hidden | Không | Tự động set qua JS khi nhập địa chỉ, không hiển thị cho người dùng |
| 6 | Link Google Map | `google_map_link` | Text | Có (`required`) | |
| 7 | Đánh giá (Review) | `rating` | Number, max 5 | Có (`required`) | |
| 8 | Mô tả | `description` | Textarea (WYSIWYG TinyMCE) | Có (`required`) | Toàn bộ `<textarea>` trên trang được khởi tạo TinyMCE |
| 9 | Link Menu món ăn | `food_menu_link` | Text | Có (`required`) | |
| 10 | Giờ mở cửa (Hours) | `hours` | Text | Có (`required`) | Nhập tự do dạng text, không có control giờ riêng |
| 11 | Số điện thoại | `phone_number` | Text | Có (`required`) | |

### Tab: Image (ảnh scroll/banner) — element `cms/restaurant_image.ctp`

| # | Tên field | Field code | Loại dữ liệu/input | Bắt buộc | Ghi chú |
|---|---|---|---|---|---|
| 1 | Ảnh scroll (Scroll Image) | `file` (multiple) | Upload nhiều ảnh (plugin `bootstrap-fileinput`) | Tối thiểu 1 ảnh (`minFilesNum: 1`) | Chấp nhận jpg/png/gif, tối đa 5MB/ảnh, tối đa 20 ảnh; ảnh yêu cầu tỉ lệ 21:9 — JS tự động crop giữa ảnh nếu lệch tỉ lệ trước khi upload; mỗi ảnh upload ngay (AJAX) khi chọn, không có nút Save chung cho tab này |

Ghi chú: tab Image thao tác hoàn toàn qua AJAX (plugin fileinput), không submit qua form chính của trang.

## Chức năng/nút thao tác
- **Chuyển tab (Restaurant / Image):** đổi tab qua JS (không reload trang), đồng thời cập nhật lại URL (`history.replaceState`) theo tab đang chọn; tab Image bị khoá nếu nhà hàng chưa được lưu lần đầu.
- **Chọn/đổi Logo:** chọn ảnh, JS kiểm tra và tự crop vuông 1:1 nếu cần trước khi submit.
- **Save (tab Restaurant):** submit toàn bộ form (multipart) về chính action `restaurants` với `tab = restaurant`. Nếu có ảnh crop (`cropped_logo`) thì lưu ảnh đã crop; nếu không, dùng file `logo` upload thô; nếu không chọn ảnh mới thì giữ nguyên logo cũ. Lưu xong hiển thị Flash message thành công/thất bại, redirect về chính CMS-033 với `restaurant_id` vừa lưu (giữ nguyên tab).
- **Cancel (tab Restaurant):** quay lại CMS-032 (danh sách nhà hàng), không lưu.
- **Upload ảnh scroll (tab Image):** mỗi ảnh chọn sẽ tự động AJAX POST tới `CmsController::saveRestaurantBannerImage()` (không có route đẹp riêng, không tạo màn hình riêng) — lưu file ảnh vào `files/restaurants/`, tạo bản ghi `RestaurantImage` gắn với `restaurant_id`, trả về JSON để plugin fileinput cập nhật danh sách thumbnail.
- **Xoá ảnh scroll (nút X trên từng thumbnail, tab Image):** AJAX POST tới `CmsController::deleteRestaurantBannerImage($id)` (không có route đẹp riêng, không tạo màn hình riêng) — xoá bản ghi `RestaurantImage` và file vật lý tương ứng.

## Điều hướng
- Vào từ: CMS-032 (nút "+ Add New" hoặc icon Edit trên từng dòng nhà hàng).
- Điều hướng đến: quay lại chính CMS-033 (tab vừa thao tác) sau khi Save thông tin nhà hàng thành công; nút Cancel điều hướng về CMS-032.
