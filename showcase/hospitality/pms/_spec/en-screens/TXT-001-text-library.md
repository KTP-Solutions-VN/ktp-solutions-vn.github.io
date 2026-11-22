# TXT-001 — Description Bank

**Type:** Full page

**Route:** `TextsController::index()` — default `/texts`

**Module:** Description Bank

## Overview
The central hub for managing all descriptive text content used for OTA/listings of villas, organized into 6 tabs: Properties (Villa), Units, Residences, Shared Texts (reusable text), Profiles (OTA account profiles), and Languages. Table data is loaded dynamically via AJAX (`TextsController::data`), with no page reload when switching tabs/filters.

## Detailed Description

Filter/toolbar applied to the Properties/Units/Residences/Shared/Profiles tabs:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select | No | Defaults to "All Business Units" |
| 2 | Language | `language_id` | Select + flag icon | No | List based on Business Unit/country |
| 3 | Status | `status` | Select: All/Complete/Partially complete/Not started | No | |
| 4 | OTA | `platform_id` | Select (list of Booking Platforms) | No | Filters by the content requirements of each OTA channel |
| 5 | Search | `q` | Text search | No | Searches by text name/location |

Columns displayed per row (Property/Unit/Residence tabs): property/unit/residence name, Content Elements with content in the selected language, status (ready/partial/none), user & timestamp of the last update, readiness level per OTA (OTA readiness).

Columns displayed on the Shared/Profiles tabs (reusable text library): Title, Content Element, Group, Content by language, applicable Business Unit, number of places using it (assignment usage), status.

Languages tab: list of languages configured per country, count of listings/shared texts/profiles using each, user & timestamp of the last update, in-use status (in_use).

## Functions / Actions
- **Switch tabs:** Properties/Units/Residences/Shared Texts/Profiles/Languages — reloads data via AJAX `data`.
- **New text:** opens the TXT-001-P1 popup (Add text) — shown only on data tabs (hidden on the Languages tab).
- **Edit a row/content:** opens the TXT-001-P1 popup in edit mode.
- **Delete reusable text (Shared/Profiles):** opens the TXT-001-P3 confirmation popup, calls AJAX `deleteText`.
- **Add language (Languages tab):** opens the TXT-001-P2 popup.
- **Delete language (Languages tab):** opens the TXT-001-P3 popup (shared confirmation modal), calls AJAX `deleteLanguage`.
- **Copy content:** quickly copies text content to the clipboard (no dedicated view).
- **Pagination:** navigates data pages via AJAX.

## Navigation
- Accessed from: Web & Media → Description Bank.
- Navigates to: TXT-001-P1 (Description Editor), TXT-001-P2 (Add language), TXT-001-P3 (Delete confirmation).
