# CS-001-P1 — Country Form

**Type:** Popup (opened from CS-001)

**Route:** Static Bootstrap Modal (`#exampleModal`) within `countries.ctp`; submits via POST to the same action `CommonSettingController::countries()`; duplicate name check via AJAX `checkCountry()` — `/common-setting/check-country`.

**Module:** CS = Reference Data

## Overview
A shared popup for three operations: Add, Edit, and Delete a country — the content/title/button are dynamically switched via JS depending on the action.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country Name | `name` | Text | Yes | Validated remotely via `checkCountry` — returns an error if the name is duplicated (excluding the record currently being edited) |
| 2 | Action (hidden) | `action` | Hidden (`add`/`edit`/`delete`) | — | Value set by JS depending on the button clicked |
| 3 | ID (hidden) | `id` | Hidden | — | Present only when editing/deleting |

In **Delete** mode: the `modal-body` section (name input field) is hidden, leaving only the title "Delete Country: {name}" and the confirmation button.

## Functions / Actions
- **Save/Update/Delete** (a single button whose label changes based on the action): submits the `popup_form` via a standard AJAX post (page postback), saving/deleting the `Country` record.
- **Cancel:** closes the modal without saving.

## Navigation
- Opened from: CS-001 (Country Setup) — "Add new" button, Edit icon, Delete icon on each row.
- After submission: redirects back to CS-001 (using `referer()`), displaying a success/error flash message.
