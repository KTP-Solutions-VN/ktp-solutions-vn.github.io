# CMS-020 — Interface Translations

**Type:** Full page

**Route:** `CmsController::cmsTranslation($tab)` — default `/cms/cms-translation/:tab`

**Module:** Web Publishing

## Overview
Administration screen for multilingual translations across the entire system, consisting of 4 tabs corresponding to 4 different content sources: Mini Website, Guest Hub, Owner Hub, Azura Manager. Each tab allows selecting a language and editing the translated content of the corresponding source. The `tab` URL parameter determines which tab is active when the page loads; when the user clicks to switch tabs, the URL is updated via `history.replaceState` (no page reload).

## Detailed Description

Route parameter: `tab` (`mini-website` | `guest-portal` | `owner-portal` | `azura-manager`). If empty, defaults to `mini-website`.

Common to all 4 tabs: a **Language** dropdown (field `language`, list sourced from the `Language` table, default `en`). Changing the language reloads the translation content of the current tab for the new language (via JS, no page reload) — for the first 2 tabs, this uses data already available on the client; for the latter 2 tabs, an AJAX call loads the corresponding JSON file for that language.

**Tab 1 — Mini Website** (`mini-website`):
- Data source & storage: `CmsTranslation` table (each record has `id`, `language`, `title` — the translation key, `text` — the translated content).
- Display: a list of translation field rows (label from `title`, input field is `text`) for the selected language.
- Save: submitting the form → for each row, calls `_saveData('CmsTranslation', ['id', 'language', 'text', 'title'])` — updates by record `id`.

**Tab 2 — Guest Hub** (`guest-portal`):
- Data source & storage: `GuestPortalTranslation` table (same structure: `id`, `language`, `title`, `text`).
- Display & save: same as Tab 1, but operating on `GuestPortalTranslation`.

**Tab 3 — Owner Hub** (`owner-portal`):
- Data source: a **JSON file**, not a DB table. Path: `WWW_ROOT/locale/owner-translation/<language_code>.json` (if the selected language's file does not exist, falls back to reading `en.json`).
- Display: a table with 3 columns — Page (grouped by the `page_name_N` keys in the JSON file), Label (derived from the key name), Translation (a text input for each remaining key in the JSON).
- Save: submitting the entire `text[key]` array from the form → overwrites the **entire content** of the JSON file `WWW_ROOT/locale/owner-translation/<language>.json` with `json_encode($request_data['text'])` (only writes if the file already exists; does not auto-create a new file).

**Tab 4 — Azura Manager** (`azura-manager`):
- Data source: a **JSON file**, similar to Tab 3 but with path `WWW_ROOT/locale/azura-manager-translation/<language_code>.json` (falls back to `en.json` if it does not exist), grouping pages by the `page_N` key.
- Display & save: same as Tab 3, overwriting the file `WWW_ROOT/locale/azura-manager-translation/<language>.json`.

Note on the differing save mechanisms between tabs:
- Tabs 1, 2: saved **per individual DB record** (update by `id`), which can be a partial save.
- Tabs 3, 4: saves the **entire JSON file** for the currently selected language (fully overwrites the file's content with the current form data).

## Functions / Actions
- **Select tab (Mini Website / Guest Hub / Owner Hub / Azura Manager):** switches the displayed content and updates the `tab` URL parameter (no reload).
- **Select Language (dropdown, separate per tab):** reloads the translation content for the new language in the active tab.
- **Save (each tab has its own Save button):** saves the translation content of the active tab (via the corresponding save mechanism described above), then displays a save-success notification and remains on the page.
- **Reset:** returns the current tab's form to its default state (HTML reset).

## Navigation
- Accessed from: main menu (Interface Translations item).
- Navigates to: no navigation to other screens; after saving, remains on CMS-020 itself, with the active tab preserved via the `tab` URL parameter.
