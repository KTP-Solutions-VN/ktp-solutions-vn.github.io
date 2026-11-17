# CMS-023 — Collection Website Content Management (5 sub-tabs)

**Type:** Full page

**Route:** `CmsController::collectionTabs($tab, $id)` — default `/cms/collection-tabs/:tab/:id`

**Module:** Website Content (CMS)

## Overview
Screen for managing all detailed content of **a single** "collection website" (a website aggregating multiple villas by region, used to present a villa collection to guests). The interface is tab-based, consisting of 5 sub-tabs: **I Wish**, **Properties**, **Insights**, **Id Card**, **Footer**. `$id` is the id of the `GuestCollectionWebsite` record (selected from CMS-021); `$tab` determines the active tab in the URL (default `i-wish` when empty). When `$id` is not yet present (no website selected/created), the 4 tabs Properties/Insights/Id Card/Footer are locked (`disabled` class), and only the I Wish tab is operable.

Tab switching is handled by JS (changing the URL via `history.replaceState`, not an AJAX content load) — except that switching to the **Properties** tab triggers a `location.reload()` to reload the data; other tabs simply toggle the `active` state of an already-rendered `.tab-pane` (all tabs are rendered simultaneously in a single page load, not lazy-loaded).

## Detailed Description

### Tab: I Wish (`tab=i-wish`, default)
List of all "I Wish" categories (guest needs/preferences, e.g. Beach, Golf, Spa...) sourced from the shared master category `GuestCollectionIwish`, allowing each category to be toggled on/off for the current collection website.

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | | |
| 2 | Title | `GuestCollectionIwish.title` | System-wide shared I Wish category, sorted A-Z |
| 3 | On/Off | on/off toggle icon | "On" state if a `GuestIwish` record exists with the matching `guest_collection_iwish_id` + `guest_collection_website_id` |

Related models: `GuestCollectionIwish` (master category, read-only here), `GuestIwish` (N-N link table between the website and I Wish, storing the enabled state).

### Tab: Properties (`tab=properties`, usable only once `$id` exists)
A matrix for assigning villas to each enabled I Wish category, organized by Country → District → Villa. Used to determine which villas belong to which I Wish category on the collection website.

| # | Field Label | Field Code | Type | Notes |
|---|---|---|---|---|
| 1 | Column per enabled I Wish | `i_wish[]` (value = `"<district>-<iwish_id>"`) | Checkbox | 1 column per I Wish category with status "on"; represents the flag "this region applies to this I Wish category" |
| 2 | Select all villas in region | `.select-all` (does not submit directly) | Checkbox | Checks/unchecks all villa checkboxes within the same region (client-side) |
| 3 | Villas within a region (expanded) | `<RegionName>[]` = villa id | Checkbox | List of villas belonging to that region, shown/hidden via an arrow icon; a checked villa means it is listed under the corresponding I Wish category |

Data is stored in `GuestProperty.data` (PHP serialize), structured as `data[guest_collection_iwish_id][district_name] = [villa_id, villa_id, ...]`.

Related models: `GuestProperty` (guest_collection_website_id, data), `District` (contains `Country`), `Villa` (contains `Owner`, `VillaLocation`), `GuestCollectionIwish`/`GuestIwish` (to determine which I Wish categories are "on" for this website — reusing the result from the I Wish tab).

### Tab: Insights (`tab=insights`, usable only once `$id` exists)
List of "Insights" (articles/suggested information for guests) attached to the collection website, where each row can be assigned to one Insight type from a shared category.

| # | Column Name | Field Code | Type | Notes |
|---|---|---|---|---|
| 1 | No. | | | |
| 2 | Title | `GuestInsight.title` | Text (display) | Entered when adding new; not directly editable in the list |
| 3 | Insight | `guest_collection_insight_id` | Dropdown (`GuestCollectionInsight`) | Changing the value saves immediately via AJAX `updateInsightAjax`, no Save button needed |
| 4 | Delete | trash-can button | Action | Opens a confirmation popup, deletes via submitting `collection_insight_delete=delete` |

"Add New Insight" popup (modal `#exampleModal`, NOT a separate page — still part of the same `collectionTabs` page):

| # | Field Label | Field Code | Type | Required |
|---|---|---|---|---|
| 1 | Title | `title` | Text | Yes |
| 2 | Insight | `guest_collection_insight_id` | Dropdown (`GuestCollectionInsight`) | Yes |

Related models: `GuestInsight` (id, title, guest_collection_insight_id, guest_collection_website_id), `GuestCollectionInsight` (shared Insight category, similar to CMS-026 — handled by a colleague).

### Tab: Id Card (`tab=id-card`, usable only once `$id` exists)
Form for managing the "business/ID card" of the collection website: supported languages, contact information, and 2 illustrative images.

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language[]` | Multi-select checkbox (`Language`) | No | `en` is checked by default |
| 2 | Contact | `contact` | Text | Yes | |
| 3 | Email | `email` | Text | Yes | |
| 4 | Logo | `logo` (file) / `cropped_logo` (base64 if cropped) | Image upload | No | Required ratio 3:2, < 1MB; if the selected image has the wrong ratio, it is automatically cropped client-side (canvas) before submission |
| 5 | Front image (Image 2) | `front_image` (file) / `cropped_image` (base64 if cropped) | Image upload | No | Required ratio 21:9, < 5MB; auto-cropped similarly |

Related model: `GuestIdCard` (id, guest_collection_website_id, language — a serialized array of language codes, contact, email, logo, front_image). Images are stored in the `files/villas/` directory.

### Tab: Footer (`tab=footer`, usable only once `$id` exists)
Manages the website's footer content, consisting of 2 independent forms saved separately.

**Form 1 — List of social media/external website links** (`footer_form_1`):

| # | Field Label | Field Code | Type | Notes |
|---|---|---|---|---|
| 1 | Url | `url.` (dynamic array by index) | Text (type=url) | Dynamically added/removed via the "Add more" button / minus button |
| 2 | Display Name | `name.` (dynamic array by index) | Text | Accompanies each Url |

Saved to `GuestFooter.websites` = serialize(`[display_name => url, ...]`).

**Language filter** (separate form, does not save data): `language` dropdown (`Language` category) + Search button — used only to select the language for viewing/editing Form 2 below (resubmits the page with `language_filter=Search`, forcing `$tab='footer'`).

**Form 2 — Multilingual footer content** (`footer_form_2`):

| # | Field Label | Field Code | Type | Notes |
|---|---|---|---|---|
| 1 | Book with confidence | `book_with_confidence` | Dropdown | Selects an existing translation in `CollectionTranslation` (type=`book_with_confidence`, for the filtered language) |
| 2 | Terms & Conditions | `terms_and_condition` | Dropdown | Source `CollectionTranslation` type=`terms_&_condition` |
| 3 | Personal data policy | `personal_data_policy` | Dropdown | Source `CollectionTranslation` type=`personal_data_policy` |
| 4 | Why work with us | `why_work_with_us` | Dropdown | Source `CollectionTranslation` type=`why_work_with_us` |
| 5 | Guarantee | `gurantee` | Dropdown | Source `CollectionTranslation` type=`guarantee` |
| 6 | Facebook | `facebook` | Text | Not multilingual |
| 7 | Instagram | `instagram` | Text | Not multilingual |

All 5 dropdown fields (1-5) are stored serialized by language: `GuestFooter.<field> = serialize([lang => selected_title, ...])`, merging the new language into the existing array on Save.

Related models: `GuestFooter` (id, guest_collection_website_id, websites, book_with_confidence, terms_and_condition, personal_data_policy, why_work_with_us, gurantee, facebook, instagram — all serialized except facebook/instagram), `CollectionTranslation` (shared text repository by `type` + `language`, managed in CMS-024/CMS-025 — the 5 dropdowns on the Footer tab only **select** an existing record, not create a new one here).

## Functions / Actions
- **Switch tab (nav-link):** changes the URL via JS, no reload (except the Properties tab, which triggers `location.reload()`).
- **I Wish tab — toggle icon:** enables/disables directly, calling AJAX `POST /VM/cms/addIwish` (action `addIwish()`, no clean route, no dedicated page). Payload: `collection_id`, `wish_id`, `status` (`On`/`Off`). `status=On` → creates/updates a `GuestIwish` record; `status=Off` → confirms via `confirm()` then deletes (`deleteAll`) the corresponding `GuestIwish` record. Returns JSON `{response, message}`, updating the `#message-board` notification block via JS, no page reload.
- **Properties tab — Save (`property_form`):** saves the villa/region/I Wish matrix to `GuestProperty`; if no I Wish is checked, shows the error "Please select the desired I Wish corrosponding to property." Reset returns the form to default values (client-side).
- **Insights tab — Add New (modal):** submits `action=insight_new_form` → creates a new `GuestInsight`.
- **Insights tab — changing the per-row Insight dropdown:** calls AJAX `POST /VM/cms/updateInsightAjax` (action `updateInsightAjax()`, no clean route) immediately on `change`, payload `guest_insight_id`, `value` → instantly updates `GuestInsight.guest_collection_insight_id`, no Save/redirect needed.
- **Insights tab — Delete (confirmation modal):** submits `collection_insight_delete=delete` + `collection_insight_id` → deletes the `GuestInsight`.
- **Id Card tab — Save (`collection_id_card_form`):** saves/initializes `GuestIdCard`; images are only overwritten when a new file/cropped image is provided, otherwise the existing image is retained.
- **Footer tab — Save (links) (`footer_form_1`):** saves the list of website links to `GuestFooter.websites`.
- **Footer tab — Search (language filter):** reloads the content of the 5 Form 2 dropdowns for the selected language (does not save data).
- **Footer tab — Save (content) (`footer_form_2`):** saves the 5 dropdown selections (for the currently filtered language, merged into existing data) + Facebook/Instagram into `GuestFooter`.
- **Reset (each form):** resets to the initial value, client-side, no server call.

Technical note: the `$villas` variable (full list of all villas) is passed to the view by the controller but is not found to be used in any of the 5 tab elements (`i_wish.ctp`, `properties.ctp`, `insights.ctp`, `id_card.ctp`, `footer.ctp`) — this may be a redundant/unused variable.

## Navigation
- Accessed from: CMS-021 (Collection Website list — selecting a website to enter detailed content management); a JS breadcrumb on the page also includes a link back to CMS-021 (`controller=cms, action=collectionWebsites`, label "Collections Website").
- Navigates to: all internal popups (Add Insight, Delete Insight) remain on the same page, with no navigation to another URL. After saving each tab (except Footer form 2), the page redirects back to itself (`collectionTabs/<tab>/<id>`) to display the flash message.
- Related (not covered in depth here, handled by a colleague): CMS-022 (`collectionWebsiteEdit` — edits the website's basic information, separate from this screen); the source categories for the I Wish/Insights tabs are managed in CMS-028/CMS-029 (`iWish`/`iWishEdit`) and CMS-026/CMS-027 (`insights`/`insightsEdit`); the text categories used for the Footer tab are managed in CMS-024 (`collectionCommonText`) and CMS-025 (`editCollectionCommonText`).
