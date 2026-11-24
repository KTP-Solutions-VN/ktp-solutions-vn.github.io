# Showcase — Prototype Playground

Các prototype KTP Solutions đã dựng, bản white-label (tên, thương hiệu, màu đã thay; giữ nguyên chức năng và luồng), dữ liệu mẫu.

**Xem online:** https://www.ktpsolutions.vn/screens/du-an/ (mục Dự án, lọc theo lĩnh vực) → nút "Playground bản mẫu" mở https://www.ktpsolutions.vn/screens/du-an/playground/?app=<id> — bấm từng màn, đổi khung Desktop / Tablet / Mobile. **Không cho tải mã nguồn**: file zip chỉ giữ ở local. Mỗi lĩnh vực / prototype / màn có URL riêng: `/screens/du-an/?linh-vuc=hospitality`, `/screens/du-an/playground/?app=pms`, `…&screen=<màn>`.

| Prototype | Lĩnh vực | Thư mục |
|---|---|---|
| Azura Manager PMS — quản lý vận hành villa / resort | Khách sạn & Resort | [`hospitality/pms/`](hospitality/pms/) |
| Azura Stays Channel Manager — đồng bộ OTA | Khách sạn & Resort | [`hospitality/cms/`](hospitality/cms/) |
| Apex Industrial CRM — CRM đa pháp nhân | Công nghiệp / B2B | [`crm/`](crm/) |
| CareJourney Admin — back-office | Y tế | [`medical/admin/`](medical/admin/) |
| CareJourney Storefront — web bán hàng | Y tế | [`medical/store-front/`](medical/store-front/) |
| CareJourney POS — bán hàng tại quầy thuốc | Y tế | [`medical/pos/`](medical/pos/) |
| CareJourney Kiosk — kiosk tự phục vụ tại sự kiện, sảnh bệnh viện | Y tế | [`medical/kiosk/`](medical/kiosk/) |
| Đội Xe Fleet Management — quản lý đội xe, lãi/lỗ từng chuyến, app tài xế (VI + bản EN ở `en/`) | Vận tải & Logistics | [`logistics/fleet/`](logistics/fleet/) |

## Cấu trúc

```
showcase/
  index.html                               chỉ chuyển hướng link cũ sang /screens/du-an/ (noindex)
  assets/playground.{css,js}               playground (trang ../screens/du-an/playground/)
  playground-data.js                       danh sách màn — SINH TỰ ĐỘNG, không sửa tay
  assets/covers/<id>.jpg                   ảnh bìa từng prototype
  _tools/build_playground.py               sinh playground-data.js
  _tools/i18n_prototype.py + _tools/i18n/  sinh bản tiếng Anh logistics/fleet/en/ từ bản tiếng Việt + bảng dịch
  _tools/shots.json                        màn ↔ ảnh chụp After
  shots/after/<project>-NNN.jpg            ảnh chụp bản After (CRM, medical)
  hospitality/{pms,cms}/                   prototype tĩnh
  medical/{admin,store-front,pos,kiosk}/   prototype tĩnh
  logistics/fleet/                         prototype tĩnh (tiếng Việt); en/ là bản tiếng Anh SINH TỰ ĐỘNG, không sửa tay
  crm/app/                                 CRM single-page app (xem crm/README.md)
  *.zip                                    bản nén mã nguồn, CHỈ ở local (gitignore), không link ở đâu
```

Prototype tĩnh mở thẳng `index.html` là chạy. CRM cần server trả `index.html` cho mọi đường dẫn: `cd crm && python3 serve.py`.

## Thêm / sửa prototype

1. Chỉ đưa vào đây bản **đã white-label**: không còn tên, domain, email, logo, màu, tên người, slogan, tên chương trình của khách; tên menu / nhóm menu / tên màn cũng phải đặt lại cách gọi (không giữ y nguyên như sản phẩm gốc). Quét lại trước khi commit.
2. Sửa thư mục prototype thì nén lại zip cùng tên (thư mục gốc trong zip trùng tên, không kèm `.DS_Store` / `__MACOSX`):
   `cd hospitality && rm pms.zip && zip -qrX pms.zip pms -x 'pms/_spec/*' '*.DS_Store'`
3. Fleet (`logistics/fleet/`): chỉ sửa bản tiếng Việt, rồi `python3 showcase/_tools/i18n_prototype.py build fleet` để ghi lại `en/` (lệnh báo đoạn mới chưa có bản dịch; thêm vào `_tools/i18n/fleet.en.json`). Danh sách màn của playground lấy từ mảng `G` trong `logistics/fleet/index.html`.
4. Thêm prototype mới: khai báo trong `PRODUCTS` ở `_tools/build_playground.py`, chụp ảnh bìa 1440×900 ở 2x, lưu JPEG rộng 2400 vào `assets/covers/<id>.jpg`, thêm 1 dự án vào `assets/data/du-an.js` (có `playground`, `use_cases`), rồi chạy `python3 showcase/_tools/build_playground.py` và thêm link vào `sitemap.xml` ở gốc website.

## Chỉ ở máy local (đã gitignore, không commit)

`shots/before/`, `shots/compare/`, `crm/_src/source/` (dữ liệu thật của khách), `comparison.html` (bảng đối chiếu tên thật ↔ tên white-label), `REVIEW.md` (README review before/after cũ), `_review/` (công cụ review, bản gốc hospitality) và mọi file `*.zip`.
