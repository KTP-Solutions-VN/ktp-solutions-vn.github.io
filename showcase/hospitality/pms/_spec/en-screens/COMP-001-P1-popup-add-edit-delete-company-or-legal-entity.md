# COMP-001-P1 — Popup: Add/Edit/Delete Company or Legal Entity

**Type:** Popup/Modal (opened from COMP-001)
**Route:** No dedicated route — uses a shared POST form to `company/list` (hidden action `add`/`edit`/`delete`); duplicate-name checks via AJAX `company/checkCompany` and `company/checkSubsidiaryName`
**Module:** COMP = Company

## Overview
A shared Bootstrap modal (`#exampleModal`) covering 4 scenarios: Add Company, Edit Company, Add Legal Entity (subsidiary), Edit Legal Entity, plus 1 delete-confirmation scenario shared by both types. The form content is dynamically shown/hidden via JS depending on the `data-button_name` of the triggering button (`company` or `company_subsidiary`).

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Legal Entity (parent company) | `company_id` | Select (Company dropdown) | Yes (shown only for Subsidiary actions) | Hidden for Company actions |
| 2 | Legal Entity (company name) | `name` | Text | Yes (shown only for Company actions) | Validated remotely for duplicate names via `checkCompany` |
| 3 | Subsidiary (legal entity name) | `subsidiary_name` | Text | Yes (shown only for Subsidiary actions) | Validated remotely for duplicate names via `checkSubsidiaryName` |
| 4 | Short Name | `short_name` | Text | Yes | Shared by both types |
| 5 | Country | `country_id` | Select (Country dropdown) | Yes (shown only for Subsidiary actions) | Hidden for Company actions |
| 6 | Logo | `logo` / `cropped_logo` (hidden, base64) | Image file upload + canvas crop (1:1 ratio) | No | Shown only for Subsidiary actions; limited to <1.2MB, automatically cropped if the ratio is incorrect |
| 7 | Action (hidden) | `action` | Hidden (`add`/`edit`/`delete`) | Yes | Controls submission behavior |
| 8 | Id (hidden) | `id` | Hidden | Conditional | Required when editing/deleting |
| 9 | Tab (hidden) | `tab` | Hidden | Yes | Identifies which tab the action is being performed on (`company-list`/`subsidiaries-list`) |

In delete mode: the entire input block is hidden, and only the delete confirmation text (`delete_confirm_help_text`) is displayed.

## Functions / Actions
- "Save"/"Update"/"Delete" button (`#submit_button`) — text and behavior change according to the action; disabled while submitting to prevent double-submission.
- "Cancel" button — closes the modal without saving.
- jQuery Validate: enforces required fields by type, checks for duplicate names via remote AJAX.
- Logo upload: selecting a file → checks image size & ratio, automatically crops if the ratio deviates from 1:1, saves as base64 into `cropped_logo`.

## Navigation
- Opened from: COMP-001 (Add new / Edit / Delete buttons on the Company and Subsidiaries tabs).
- Navigates to: no page change — after submission, COMP-001 is reloaded (redirect via `referer()`).
