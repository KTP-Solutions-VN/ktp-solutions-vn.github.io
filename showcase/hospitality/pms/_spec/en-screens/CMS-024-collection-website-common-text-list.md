# CMS-024 — Collection Website Common Text List

**Type:** Full page

**Route:** `CmsController::collectionCommonText($action, $id)` — default `/cms/collection-common-text/:action/:id`

**Module:** Website Content (CMS)

## Overview
List of shared text snippets (translations by `type`) applied across collection websites — data from the `CollectionTranslation` table. This is the source text repository for the 5 dropdowns on the **Footer** tab of CMS-023 (Book with confidence, Terms & Condition, Personal data policy, Why work with us, Guarantee). The same `collectionCommonText` action handles both displaying the list and deleting a record (when `$action`/`$id` are passed).

## Detailed Description

List (data table, filtered by language):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Title | `CollectionTranslation.title` | |
| 2 | Type | `CollectionTranslation.type` | One of 5 fixed types: `book_with_confidence`, `terms_&_condition`, `guarantee`, `why_work_with_us`, `personal_data_policy` (see CMS-025) |
| 3 | Content | `CollectionTranslation.text` | |
| 4 | Language | `CollectionTranslation.language` | Hidden from the table itself — the entire list only displays records for a single selected language |

Filter: `language` dropdown (`Language` category) + Search button (`language_filter=Search`), default language `en`. Selecting a different language reloads the `data_array` list filtered by `CollectionTranslation.language = <selected language>`.

## Functions / Actions
- **Filter by language:** change the dropdown + Search to view the text list for the corresponding language.
- **Add New:** navigates to CMS-025 (`editCollectionCommonText`, no `id` passed).
- **Edit (click row/Edit button):** navigates to CMS-025 (`editCollectionCommonText/:id`).
- **Delete:** calls back into this same action with `$action` + `$id` (route `/cms/collection-common-text/<action>/<id>`) → deletes the `CollectionTranslation` record by `id`, then redirects back to the list (no parameters passed) with a success/error flash message.

## Navigation
- Accessed from: can be accessed independently within the CMS module (Settings/CMS menu); referenced as the source data repository from the Footer tab of CMS-023.
- Navigates to: CMS-025 (form to add/edit a single common text record).
