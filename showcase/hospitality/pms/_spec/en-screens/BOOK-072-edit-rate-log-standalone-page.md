# BOOK-072 — Edit Price Note

**Type:** Full page (independent sub-page — not a popup/modal)
**Route:** Booking/ratesLogEdit/:id
**Pretty route:** no dedicated route found in config/Routes.php (uses the default route, e.g. `/booking/rates-log-edit/12`)
**Module:** Reservations

## Overview
Form for editing a rate log record (`VillaRateLog`) identified by the `id` passed in the URL, including business unit, villa, and note content.

**Important note:** similar to BOOK-071, this action and view remain functional but are no longer linked from BOOK-070 in the current UI (BOOK-070 uses an edit-log popup directly on the page). This may be a legacy screen left over from before, reachable only via a direct URL with a valid `id`.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select | Yes | Default value taken from the `business_unit_id` of the record being edited |
| 2 | Villa | `villa` | Select | Yes | Default value taken from the `villa_id` of the record being edited; the villa list is scoped to the user's permission scope |
| 3 | Content (Action) | `action` | Textarea | Yes | Prefilled with the existing note content |

## Functions / Actions
- **Save** — updates the `VillaRateLog` record (id, villa_id, business_unit_id, action, action_by = current user), then redirects to BOOK-070
- **Reset** — restores the original values on the form

## Navigation
- Opened from: no link in the current UI leads to this page (it may previously have been opened from BOOK-070, requiring a record `id`)
- Navigates to: back to BOOK-070 after a successful/failed save
