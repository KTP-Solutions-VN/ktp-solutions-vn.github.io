# CMS-034 — Guest Contract Editor

**Type:** Full page

**Route:** `CmsController::contracts()` — default `/cms/contracts` (GET may include the query parameters `country_id`, `language_code`, `tab`, `section_key`, `payment_setting_type`, `general_version_id`; the same route also accepts AJAX GET `?ajax_action=load` and AJAX/POST form submission)

**Module:** Website Content (CMS)

## Overview
Administration screen for editing the **content/terms of the guest contract (Guest Contract)** shared across the entire system, configured per **Country** and **Language** pair. The content authored here consists of template text paragraphs (rich text, which can include dynamic variables `{property.xxx}`, `{booking.xxx}`) that are merged into a villa's actual guest contract at the time it is issued. The screen has **3 main content blocks (tabs)**: General (shared content by "version"/property type), Section (clause blocks: check-in/checkout, deposit, pool cleaning), and Electricity (electricity fee terms by payment type). Access is controlled by the permission key `Cms-contracts`; if the user lacks sufficient permission, the system shows a warning Flash message and redirects to the previous page (or returns a JSON error if called via AJAX).

All actions on the page (changing Country/Language, switching tabs, selecting a version/section/electricity type, saving, deleting) are handled via in-place AJAX (reloading the content panel via `ajax_action=load`, saving via AJAX POST) — there is no iframe/modal-based tab navigation, but tab links still carry a full-page `href` (a fallback for when JS is disabled/when there are unsaved changes, which are automatically saved before navigating away via `navigateWithPendingSave`).

## Detailed Description

### Global Filters (apply to the whole page)

| Filter | Field Code | Input Type | Effect on Data |
|---|---|---|---|
| Country | `country_id` | Dropdown (`<select>`, id `guest-contract-country`) | The primary key used to load all General Version, Section Template, Electricity Template, Status Summary, and Preview Values data for the selected country. Defaults to the first country in the list (sorted A–Z by name) if `country_id` is not passed. Changing the Country navigates (`navigateWithPendingSave`) to a new URL, without carrying over `language_code`/`tab` (they reset to default) |
| Language | `language_code` | Language tab-style buttons (not a dropdown) — shown within each content tab (`.gc-lang` / `.gc-version-lang`) | Limited to the 5 languages supported for contract authoring: `en` (English), `fr` (French), `cn` (Chinese), `ru` (Russian), `ar` (Arabic) — the actual display name is taken from the `Language` table if available, otherwise a default name is used. Defaults to `en` if valid, otherwise the first language in the supported list. Changing the language reloads the corresponding General/Section/Electricity Template content for the selected Country + Language (on the General tab, switching language only swaps the authored content in the browser's memory, without an AJAX call, until Save writes out each language) |
| Tab | `tab` | Tab-style link | Accepts one of 3 values: `general`, `section`, `electricity`. Defaults to `general`. An invalid value automatically falls back to `general` |
| Section key (only when tab = section) | `section_key` | Section-selection button | Accepts one of 4 values: `checkin_checkout`, `deposit_no_deposit` (No deposit), `deposit` (Deposit), `pool_cleaning`. Defaults to `checkin_checkout` if empty/invalid |
| Payment setting type (only when tab = electricity) | `payment_setting_type` | Electricity-calculation-type selection button | Accepts one of 6 displayed values: `included`, `collect_fixed`, `collect_quota`, `collect_kwh`, `platform_separate`, `combined_separate` (2 types, `platform_rental` and `combined_rental`, have label definitions in the code but do NOT appear in the displayed list `_guestContractVisibleElectricityTypes()`/UI). Defaults to `included` if empty/invalid |
| General version ID (only when tab = general) | `general_version_id` | Selected from the "Version Library" list on the left | Determines which General Content Version is currently being viewed/edited. If empty, defaults to the first version (sorted by `property_type` → `name` ascending) of the selected Country |

**Note on the tab UI:** the UI displays **5 navigation items** (not 3), because the `section` tab is split into 3 items by `section_key`: **General content** (tab=general), **Check-in/Checkout** (tab=section, section_key=checkin_checkout), **Deposit** (tab=section, section_key=deposit or deposit_no_deposit — clicking it opens the first section_key in the deposit group), **Electricity** (tab=electricity), **Pool cleaning** (tab=section, section_key=pool_cleaning). Each item carries a status badge (see "Status Summary" below).

**Status Summary displayed on each tab:**
For each content block (`general`, `checkin_checkout`, `deposit`, `electricity`, `pool_cleaning`), the system checks whether content exists (body not empty after `strip_tags`) for **all 5 supported languages**, for the currently selected Country.
- **"Complete"** status (tone `ok`, green): content exists for all languages.
- **"Not configured"** status (tone `bad`, red): no record exists at all (applies specifically to `general` when no version yet exists).
- **"<Missing language code(s)> Missing"** status (tone `warn`, yellow): lists the language codes (uppercase, comma-separated) that lack content.
- For the `general` block specifically: a language is considered missing if **any version** in that Country lacks content for that language (aggregated across all versions).
- For the `deposit` block specifically: considered "Complete" only when **both** sections (`deposit_no_deposit` and `deposit`) have complete content for that language.
- For the `electricity` block specifically: considered "Complete" only when **all 6** displayed payment_setting_type values have content for that language.

**Dynamic variables (`{property.xxx}`, `{booking.xxx}`) and the "Preview" block:**
Each section/electricity type has a list of insertable variables (shown as clickable tags that insert the variable into the editor at the cursor position). The "Preview" block on the right shows the content with variables replaced by sample values (`previewValues`, taken from the first sample villa belonging to the selected Country — check-in/out time, deposit, pool cleaning time, electricity rate — or a hard-coded default value if the villa has no data). This is illustrative preview data only, not the actual data of any specific villa.

Table of variables by section/electricity type:

| Section/Type | Field Code | Available Variables |
|---|---|---|
| Check-in/Checkout | `checkin_checkout` | `{property.check_in_time}`, `{property.check_out_time}` |
| No deposit | `deposit_no_deposit` | (no variables) |
| Deposit | `deposit` | `{property.deposit_amount}` |
| Pool cleaning | `pool_cleaning` | `{property.pool_cleaning_time}`, `{property.pool_cleaning_frequency}` |
| Included (electricity included) | `included` | (no variables) |
| Collect fixed (fixed collection) | `collect_fixed` | `{property.electricity_daily_amount}` |
| Collect quota (quota-based collection) | `collect_quota` | `{property.electricity_quota_kwh}`, `{property.electricity_extra_kwh_rate}` |
| Collect kWh (per-kWh collection) | `collect_kwh` | `{property.electricity_kwh_rate}` |
| Platform separate | `platform_separate` | (no variables) |
| Combined separate | `combined_separate` | `{property.electricity_quota_kwh}`, `{property.electricity_extra_kwh_rate}` |

---

### Tab: General (Shared Content)

3-column layout: **(1) Version Library** (list of shared content "versions", on the left) → **(2) Editing Form** (middle) → **(3) Preview** (right).

Each "General Content Version" (table `GuestContractGeneralVersion`) represents one shared content package used for one property type (Flat/House/Resort), and may have multiple translations (table `GuestContractGeneralVersionContent`, 1 record per language). The user selects a version in the Version Library, then authors content per language (switching via the language buttons; each language's content is held temporarily in the browser's memory until Save is clicked — Save writes out all languages authored during the session simultaneously).

**Version Library (list on the left):**

| # | Component | Field Code | Notes |
|---|---|---|---|
| 1 | Version name | `name` | Displayed in bold |
| 2 | Internal note | `internal_note` | Displayed in small text below the name |
| 3 | Property type tag | `property_type` | Capitalized (Flat/House/Resort) |
| 4 | Language tag(s) with content | (computed) | List of uppercase language codes that already have a non-empty `body`, separated by spaces |
| 5 | Edit icon (pencil) | — | Click the card to select the version for editing |
| 6 | Delete icon (×) | — | Opens a delete confirmation modal |

**Editing form (fields):**

| # | Field Label | Field Code | Input Type | Required | Notes |
|---|---|---|---|---|---|
| 1 | Save type (hidden) | `save_type` | Hidden | — | Always = `general` |
| 2 | Tab (hidden) | `tab` | Hidden | — | Always = `general` |
| 3 | Country (hidden) | `country_id` | Hidden | — | Synced with the Country selected at the top of the page |
| 4 | Language code (hidden) | `language_code` | Hidden (`.js-language-code`) | — | Changes according to the currently active language button |
| 5 | General Version ID (hidden) | `general_version_id` | Hidden (`.js-general-version-id`) | — | Empty when creating a new version |
| 6 | Version name | `name` | Text input | **Required** | Validated both client-side (JS) and server-side; empty → error "Version name is required" (field `name`) |
| 7 | Internal note | `internal_note` | Text input | Not required | An internal note for administrators, not shown to guests |
| 8 | Property type | `property_type` | Button-style radio group (3 options) | **Required** | Values: `flat` (Flat), `house` (House), `resort` (Resort); empty → error "Property type is required"; a value outside these 3 → error "Invalid property type" |
| 9 | Contract content (Body) | `body` (submitted along with `body_by_language[<lang>]` per authored language on Save) | Rich text editor (TinyMCE, textarea `.gc-rich-text-editor`) | Not required | Free-form HTML/text content; variables `{property.xxx}`/`{booking.xxx}` can be inserted manually (the General tab does not show a pre-built list of variable tags to insert — there is no "Automatic fields" block on this tab) |

**Preview (on the right):** displays the current `body` content (HTML-escaped/with line breaks) in real time while authoring.

### Tab: Section (Check-in/Checkout, Deposit, Pool cleaning)

2-column layout: **Editing form** (left) + **Preview** (right). Above it is a strip of language-selection buttons; if the current `section_key` belongs to the Deposit group (`deposit_no_deposit` or `deposit`), an additional strip of buttons is shown to switch between "No deposit" and "Deposit".

Data model: `GuestContractSectionTemplate` — 1 record per (Country, Section key, Language) combination.

| # | Field Label | Field Code | Input Type | Required | Notes |
|---|---|---|---|---|---|
| 1 | Save type (hidden) | `save_type` | Hidden | — | Always = `section` |
| 2 | Tab (hidden) | `tab` | Hidden | — | Always = `section` |
| 3 | Country (hidden) | `country_id` | Hidden | — | |
| 4 | Language code (hidden) | `language_code` | Hidden (`.js-language-code`) | — | |
| 5 | Section key (hidden) | `section_key` | Hidden | — | One of: `checkin_checkout`, `deposit_no_deposit`, `deposit`, `pool_cleaning`; server validates it must be one of the valid values, otherwise → error "Invalid contract section" |
| 6 | Select sub-section (Deposit group only) | (`.js-section-option` button, sets `section_key`) | Button with 2 options: "No deposit" / "Deposit" | — | Shown only when currently in the Deposit group |
| 7 | Clause content (Body) | `body` | Rich text editor (TinyMCE, textarea `.gc-rich-text-editor`) | Not required | Includes an "Automatic fields" block showing the variables available for the current `section_key` (see the variable table above) for quick insertion into the editor |

**Preview (on the right):** the `body` content with variables replaced by sample values (`previewValues`).

### Tab: Electricity

2-column layout: **Editing form** (left, with a strip of buttons for selecting 1-of-6 electricity payment types above it) + **Preview** (right). A strip of language-selection buttons is also shown above.

Data model: `GuestContractElectricityTemplate` — 1 record per (Country, Payment setting type, Language) combination.

| # | Field Label | Field Code | Input Type | Required | Notes |
|---|---|---|---|---|---|
| 1 | Save type (hidden) | `save_type` | Hidden | — | Always = `electricity` |
| 2 | Tab (hidden) | `tab` | Hidden | — | Always = `electricity` |
| 3 | Country (hidden) | `country_id` | Hidden | — | |
| 4 | Language code (hidden) | `language_code` | Hidden (`.js-language-code`) | — | |
| 5 | Payment setting type (hidden) | `payment_setting_type` | Hidden (`.js-payment-setting-type`) | — | |
| 6 | Select electricity payment type | (`.js-electricity-option` button, sets `payment_setting_type`) | Button, 6 displayed options: 1. Included, 2. Collect fixed, 3. Collect quota, 4. Collect kWh, 5. Platform separate, 6. Combined separate | **Required** | Server validates the value must belong to `_guestContractVisibleElectricityTypes()`, otherwise → error "Invalid electricity configuration" |
| 7 | Note for selected configuration | (read-only, computed) | Display text (not an input) | — | Shows a label + guidance note corresponding to the currently selected type (e.g., a reminder to "Write electricity rule") |
| 8 | Clause content (Body) | `body` | Rich text editor (TinyMCE, textarea `.gc-rich-text-editor`) | Not required | Includes an "Automatic fields for case" block showing the variables available for the current payment type (see the variable table above); this block is hidden if that type has no variables |

**Preview (on the right):** the `body` content with variables replaced by sample values (`previewValues`).

## Functions / Actions
- **Change Country (dropdown):** reloads the entire page/data for the new country; if the current form has unsaved changes (applies only to the Section/Electricity tabs — the General tab does not auto-save on navigation), it is automatically saved first before navigating.
- **Switch tab / switch item (General, Check-in/Checkout, Deposit, Electricity, Pool cleaning):** navigated via links (with a full-page `href`) but the click event is intercepted to load data via in-place AJAX; unsaved changes are saved automatically first.
- **Change language (language code buttons):** on the General tab — only swaps the authored content in memory (no AJAX call); on the Section/Electricity tabs — reloads the corresponding `body` for the new language via AJAX (auto-saving first if there are unsaved changes).
- **"+ New version" (General tab only):** resets the editing form to a new-version creation state (clears `general_version_id`, clears the name/note, sets the default property_type = `flat`, clears the content).
- **Select a version in the Version Library (General tab only):** loads that version's data via AJAX (name, note, type, content for the currently selected language).
- **Edit icon on a version card:** has no separate behavior beyond clicking the card (opens that version for editing).
- **Delete icon (×) on a version card (General tab only):** opens a delete confirmation modal; confirming triggers an AJAX POST with `save_type=delete_general` — deletes all translated content (`GuestContractGeneralVersionContent`) and then the version itself (`GuestContractGeneralVersion`); errors if the version is not found or deletion fails.
- **Select sub-section (No deposit / Deposit, only when in the Deposit group):** reloads the corresponding section content via AJAX.
- **Select electricity payment type (6 buttons, Electricity tab only):** reloads the corresponding electricity template content via AJAX.
- **Insert a dynamic variable (`{property.xxx}`/`{booking.xxx}` tag, Section/Electricity tabs):** inserts the variable string at the cursor position in the rich text editor, and updates the Preview accordingly.
- **Save (submit button — General tab, and implicitly for Section/Electricity tabs via form submission):**
  - Client validation: Country is required; for the General tab, Version name and Property type are required.
  - Server validation corresponding to `save_type` (`general`/`section`/`electricity`) as described for each tab.
  - General tab: saves/creates `GuestContractGeneralVersion`, then saves/creates each `GuestContractGeneralVersionContent` for **every language authored during the session** (sent as `body_by_language[<lang>]`), not just the currently active language.
  - Section tab: saves/creates 1 `GuestContractSectionTemplate` record for the selected (Country, Section key, Language).
  - Electricity tab: saves/creates 1 `GuestContractElectricityTemplate` record for the selected (Country, Payment setting type, Language).
  - On success: shows a notification (green banner, auto-hides after 3 seconds in the AJAX case), refreshes the Version Library/Status Summary/Preview in place; a non-AJAX POST shows a Flash message + redirects back to `contracts` preserving the query context.
  - On failure: shows an error on the relevant field (if a `field` is returned) + a red banner.
- **Cancel (General tab only):** reloads the current data via AJAX, discarding unsaved changes on the form.
- **Delete-version confirmation modal:** the "Cancel" button closes the modal; the "Delete" button confirms the deletion (see the Delete icon item above).

## Related Models / Tables
- `GuestContractGeneralVersion` — shared content version by Country + property type (`property_type`: flat/house/resort), with `name`, `internal_note`, `created_by`, `created_at`, `updated_at`.
- `GuestContractGeneralVersionContent` — translated content (`body`) of one `GuestContractGeneralVersion` by `language_code` (1-to-many relationship: one version has multiple translations, one record per language).
- `GuestContractSectionTemplate` — clause content by (`country_id`, `section_key`, `language_code`), with `body`.
- `GuestContractElectricityTemplate` — electricity clause content by (`country_id`, `payment_setting_type`, `language_code`), with `body`.
- Read-only references: `Country`, `Language` (dropdown list/supported languages), `Villa`, `VillaLocation`, `VillaRule`, `PoolCleaning`, `VillaElectricityRate` (used only to compute sample data for Preview; not edited from this screen).

**Multilingual mechanism:** stored as **one separate record per (content object, language) pair** — not serialized together in a single column for multiple languages. Specifically: General → each (version, language_code) is 1 row in `GuestContractGeneralVersionContent`; Section → each (country_id, section_key, language_code) is 1 row in `GuestContractSectionTemplate`; Electricity → each (country_id, payment_setting_type, language_code) is 1 row in `GuestContractElectricityTemplate`. All content is always tied to a specific `country_id` — there is no concept of "global" content shared across multiple countries.

## Navigation
- Accessed from: the main menu (Settings/CMS, `active_menu = 184`), requiring the permission key `Cms-contracts`.
- Navigates to: none (this is a self-contained action that manages all 3 tabs entirely via in-place AJAX; it does not open any popup or navigate to any other sub-action within `CmsController`).
