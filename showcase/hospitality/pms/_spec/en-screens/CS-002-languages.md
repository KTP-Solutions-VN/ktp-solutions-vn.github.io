# CS-002 — Language Setup

**Type:** Full page

**Route:** `CommonSettingController::languages()` — default `/common-setting/languages`

**Module:** CS = Reference Data

## Overview
A list for managing the system's Language lookup data, with each language associated with a list of applicable countries.

## Detailed Description

List (DataTable `#zero_config`, sorted by `name`):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Language Name | `name` | |
| 3 | Applicable Countries | `country_code` | Value stored as a PHP-serialized array of country codes; displayed as a list of country names joined by commas |
| 4 | Created Date | `created_at` | Format `d M Y H:i` |
| 5 | Actions | — | Edit, Delete (opens popup CS-002-P1) |

## Functions / Actions
- **Add new:** opens popup CS-002-P1 in Add mode.
- **Edit:** calls AJAX `getLanguageById` to fetch the current `name` + `country_code`, then opens popup CS-002-P1 (Edit mode).
- **Delete:** reopens popup CS-002-P1 in delete-confirmation mode (input fields hidden).
- On save, the system automatically generates the `language_code` from the language name (`CommonController::_getLanguageCode`); the user does not enter it directly.

## Navigation
- Accessed from: Configuration menu > Reference Data > Language Setup.
- Navigates to: CS-002-P1 (Language Form popup).
