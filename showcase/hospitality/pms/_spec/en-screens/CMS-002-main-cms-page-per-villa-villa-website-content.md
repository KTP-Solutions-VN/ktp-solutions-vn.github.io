# CMS-002 — Main CMS Page per Villa (Villa Website Content)

**Type:** Full page

**Route:** `CmsController::cms($tab, $villa_id, $lang1)` — default `/cms/cms/:tab/:villa_id/:lang1` (default tab is `welcome` when empty, or `main`)

**Module:** Website Content (CMS)

## Overview
The central screen of the CMS module: manages all content displayed on the website (mini-website) of a specific villa. It consists of 8 content tabs (Welcome, Why Here, Daily Life, Comfort, Booking, Menu, Services, SEO), each containing one or more independent sub-forms with their own Save button. All 8 tabs are pre-rendered simultaneously on a single page (data for each tab is fully loaded by the controller in one request); switching tabs is purely a show/hide effect (Bootstrap tab) plus a URL update via `history.replaceState`, NOT a separate AJAX load — each sub-form, when its Save button is clicked, still submits a normal (full-page) POST back to the `cms` action with the same `$tab`, `$villa_id`, `$lang1`, then redirects back to that same tab.

Accessed from CMS-001 (selecting a villa from the list).

## Detailed Description

All fields below (except images) are **multilingual**: data is stored as an array keyed by `language_code` (the "Language" dropdown at the top of each sub-form, with values sourced from the `Language` table). Changing the language dropdown reloads the text fields via JS from data already loaded on the client (`welcome_array`, `why_here_array`, etc. already contain data for all languages) before the sub-form for the selected language is submitted.

### Tab 1 — Welcome (default when the page opens)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language` | Dropdown | - | Applies to all text fields below |
| 2 | Moment (short text) | `moment_text` | Textarea | Yes | Sub-form `welcome_form_1` |
| 3 | Disclosure | `disclosure_text` | Textarea | Yes | Sub-form `welcome_form_1` |
| 4 | Interior one-liner | `interior[]` | List of text lines (dynamically added/removed via JS) | First line required | Sub-form `welcome_form_2` |
| 5 | Exterior one-liner | `exterior[]` | List of text lines (dynamically added/removed) | First line required | Sub-form `welcome_form_3` |
| 6 | Feature icon | `image[]` / existing images have `id[]` | Image upload (multiple icons, dynamically added/removed) | First icon required | Sub-form `welcome_form_4`, max 1MB, 1:1 ratio, stored via the `CmsImage` model (tag `feature-icon`) |
| 7 | Legend (icon caption) | `legend` | Text | - | Accompanies each feature icon |

### Tab 2 — Why Here
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language` | Dropdown | - | |
| 2 | Short text | `why_here_text` | Textarea | Yes | |
| 3 | Points of interest | `points_of_interest` | Text/list | Yes | Form `why_here_form_1` |

### Tab 3 — Daily Life
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language_daily_life` | Dropdown | - | |
| 2 | Kitchen description | `kitchen_description` | Textarea | - | Form `daily_life_form_1` |
| 3 | Convenience Store 1/2/3 | `convenience_store` (x3) | Text | - | Form `daily_life_form_2` |
| 4 | Shop 1/2/3 | `shops` (x3) | Text | - | |
| 5 | Supermarket 1/2/3 | `supermarket` (x3) | Text | - | |
| 6 | Restaurant 1..6 | `restraunts` (x6) | Text | - | |
| 7 | Kitchen image | `daily_life_image` | Image upload | - | Max 1MB, `CmsImage` model |

### Tab 4 — Comfort
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language` | Dropdown | - | |
| 2 | Bedroom description (per bedroom) | `bedroom_text[]` | List of text lines, number of lines = number of villa bedrooms (`bedroom_count`, taken from `VillaDetail.number_of_beds`) | - | Form `comfort_form_1` |
| 3 | Wifi description | `wifi_description` | Textarea | - | Appears in both `comfort_form_1` and `comfort_form_2` |
| 4 | Wifi upload speed | (label "Wifi Uploading Speed") | Text | - | Form `comfort_form_2` |
| 5 | Wifi download speed | (label "Wifi Downloading Speed") | Text | - | |
| 6 | Comfort image(s) | `image[]`, `id[]` | Image upload (multiple, dynamically added/removed) | - | Form `comfort_form_3`, max 1MB, `CmsImage` model |

### Tab 5 — Booking
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Instant Booking | `instant_booking` | Toggle/checkbox | - | Form `booking_form` |
| 2 | Airbnb Link | `airbnb_link` | Dropdown | - | List sourced from `VillaOtaManagement.links`, filtered by channels whose name contains "Airbnb" (`Chanel` table) |
| 3 | Other OTA | `other_ota` | Dropdown | - | Filters channels that do NOT contain "Airbnb" and are not "MiniSite" |
| 4 | Other OTA link | `other_ota_link` | Text | - | |
| 5 | Expedia link | (label "Expedia link", field name is the same as `other_ota_link`) | Text | - | |

### Tab 6 — Menu (enable/disable & link other villa content blocks to the website menu)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Why Here | `cms_why_us_id` | Dropdown | - | Links to a Why Us record (CMS-006/007/008) |
| 2 | Concierge | `cms_concierge_id` | Dropdown | - | Links to Concierge (CMS-018/019) |
| 3 | Logo | field id `cms_destination_id` (label "Logo") | Dropdown | - | *Technical note:* this field shares the same `id`/name as the "Destination" field below in the view — a suspected copy-paste error in the original code that should be confirmed with QA when the UI is rebuilt |
| 4 | Destination | `cms_destination_id` | Dropdown | - | Links to the per-villa Destination (CMS-012/013) |
| 5 | Talk To Us | `cms_contact_us_id` | Dropdown | - | Links to the Contact Form (CMS-016/017) |
| 6 | Arrival | `cms_arrival_id` | Dropdown | - | Links to Arrival (CMS-030/031) |

### Tab 7 — Services
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Services | `cms_services_id` | Dropdown (multi?) | - | Selects the villa services shown on the website; links to CMS-003/004 |

### Tab 8 — SEO
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language` | Dropdown | - | |
| 2-16 | SEO Title / SEO Description / SEO Keywords (repeated across 5 groups, corresponding to 5 pages: Home/Welcome/Why Here/Daily Life/Comfort) | `seo_title_text`, `seo_description_text`, `seo_keywords_text` | Text/Textarea | Yes (marked in red) | Form `seo_form` |
| 17 | Airport Arrival | `airport_text` | Textarea | Yes | |
| 18 | Harbour/Pier Arrival | `pier_text` | Textarea | Yes | |
| 19 | Car Rental | `car_rental_text` | Textarea | Yes | |
| 20 | Other Transfer | `other_text` | Textarea | Yes | |
| 21 | Check-in Description | `check_in_text` | Textarea | Yes | |
| 22 | Stay Description | `stay_text` | Textarea | Yes | |

## Functions / Actions
- **Switch tabs** (Welcome/Why Here/Daily Life/Comfort/Booking/Menu/Services/SEO): only changes the display on the client side, no data reload.
- **Save per sub-form** (each tab has 1-4 separate Save buttons, e.g. `welcome_form_1`..`welcome_form_4`, `comfort_form_1`..`comfort_form_3`, etc.): submits a POST back to the same `cms` action; the server identifies which form was submitted by the submit field's name, saves the corresponding data (several fields are serialized by language), then redirects back to the correct tab.
- **Dynamic add/remove rows** (Interior/Exterior one-liner, Feature icon, Comfort image, Bedroom description): handled by client-side JavaScript before submission.
- **Image upload** (Feature icon, Kitchen image, Comfort image): limited to 1MB per image, with some requiring a specific aspect ratio (1:1 for feature icons); stored via the `CmsImage` model shared across the entire CMS module.
- **Delete secondary image** (villa multi-image gallery, `tag NOT IN [Main, undefined, feature-icon, Destination, Concierge]`): uses the `deleteMulti` action (AJAX, no dedicated screen) — invoked from the secondary image list displayed on the page.
- **Select content language**: changing the "Language" dropdown at the top of each tab allows editing content in another language (no page reload; JS auto-fills already-loaded data).

## Navigation
- Accessed from: CMS-001 (selecting a villa from the list) → opens the Welcome tab by default.
- Navigates to: no navigation to other screens in the normal flow — the dropdowns in the Menu/Services tabs only select data links (there is no direct click-through link to CMS-003…031 from here).
