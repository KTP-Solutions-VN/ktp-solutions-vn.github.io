# SET-004-P1 — Channel Account Mapping Form

**Type:** Popup (in practice an inline form that opens/closes below each channel table in SET-004, not a Bootstrap modal)

**Route:** Rendered dynamically within `SettingController::hostexSetup()` (`hostex_setup.ctp`); submits via AJAX POST to `saveHostexAccount()` — `/setting/save-hostex-account`; duplicate email check within the same channel via AJAX `checkHostexEmail()` — `/setting/check-hostex-email` (jQuery Validate `remote`).

**Module:** SET = Platform Settings

## Overview
A form for adding a new or editing an existing Hostex account (OTA account) belonging to a specific distribution channel, including the account email/name, the linked OTA Account, and the account owner (Azura Stays or Agency).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Account Email or Name | `email` (sent as `account_email`) | Text | Yes | Checked for duplicates within the same channel (`channel_id`) via AJAX `checkHostexEmail`, excluding the record currently being edited |
| 2 | OTA Account | `ota_account_id` | Select | No | List of OTA Accounts (`Chanel` table) belonging to the channel being worked on |
| 3 | Owner | `owner` | Select: `azurastays` / `agency` | Yes | Defaults to "Azura Stays" |
| 4 | Agency | `agency` (sent as `agency_id`) | Select from Agency list | Yes, if Owner = `agency` | Disabled when Owner = "Azura Stays" |

## Functions / Actions
- **Save:** validates (jQuery Validate) then sends AJAX request `saveHostexAccount` (including `id` if editing, `channel_id`, `account_email`, `ota_account_id`, `owner`, `agency_id`); saves the `HostexAccount` record, logs the activity, shows a flash message, reloads the page on success.
- **Cancel:** closes the inline form without saving.
- **Add account (opens the form in Add mode):** resets the form to blank.
- **Edit (opens the form in Edit mode):** pre-fills the form with the selected account row's data (including `editId` to distinguish add/edit upon submission).

## Navigation
- Opened from: SET-004 — the "Add account" button for each channel, or the "Edit" icon on each account row.
- After saving: reloads SET-004; the corresponding channel's account table is updated.
