# ACC-040 — SIM Card Management (SIM Cards)

**Type:** Full page

**Route:** `AccountController::simCards()` — default `/account/sim-cards`

**Module:** Accounting & HR

## Overview
Manages the list of phone SIM cards (company assets, `Vehicle` table with `assets_type = 'sim_card'`) by Business Unit: view the list, add, edit, and delete via an on-page modal.

## Detailed Description

List (DataTable `#zero_config`, filtered by the selected Business Unit):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Sr. No | — | Sequential number |
| 2 | First Name | `user.first_name` | Name of the current user (`used_by` → joined `User`) |
| 3 | Family Name | `user.family_name` | |
| 4 | Provider | `name` | Mobile network provider |
| 5 | SIM Number | `licence_plate` | Stored in the `licence_plate` field, entered from `phone_number` |
| 6 | Starting Date | `acquisition_date` | Format `d M Y` |
| 7 | Monthly Fees | `acquisition_price` | |
| 8 | Vehicle Modified (date edited) | `updated_at` | Format `d M Y` |
| 9 | Modified By | `modified_by` | |
| 10 | Actions | — | Edit, Delete — shown only to users who are not Business Unit Manager/Employee (Delete button shown only to Superadmin) |

Filter:
- **Business Unit** (`business_unit1`, select2): selecting a BU reloads the page at `sim-cards?id=<business_unit_id>`. The BU list is drawn from user permissions (`_getAuthBasedBuVilla`), with an "All" option (id = 0).

Query conditions: `Vehicle.assets_type = 'sim_card'` and `Vehicle.business_unit_id` matching the selected BU (or the user's `selected_business` if no `id` is passed), containing `User`.

## Functions / Actions
- **Add new:** opens the `#addVehicle` modal (same page, no dedicated view) in add mode — enter Business Unit, Provider (`name`), SIM Number (`phone_number`), Used By, Starting Date, Monthly Fees.
  - Submits via POST to the `simCards()` action itself with `action = add`: saves a new record to `Vehicle` (`assets_type = 'sim_card'`, `status = active`); if `used_by` is selected, also creates a `UserCompanyAsset` record.
- **Edit (pencil icon):** opens the same `#addVehicle` modal in edit mode, pre-loaded from the row's `data-*` attributes. Submits with `action = edit`: updates `Vehicle` by `id`, re-syncing `UserCompanyAsset` if `used_by` is set.
- **Delete (trash icon, Superadmin only):** opens the `#addVehicle` modal in delete-confirmation mode. Submits with `action = delete`: soft-deletes the related `UserCompanyAsset` then soft-deletes the `Vehicle` by `id`.
- The modal shares a single form (`#popup_form`) for all three actions, distinguished by the hidden `action` field.
- Validation: SIM Number (`phone_number`) is required, checked for duplicates via AJAX `account/checkSerialNumber` (type = `sim_card`); Business Unit is required.
- When Business Unit is changed within the modal: AJAX `account/getBusinessUsers` reloads the employee list (Used By) for that BU.

## Navigation
- Entered from: Sidebar > Account & HR > SIM Cards (`active_menu = 'acc-simCards'`).
- No navigation to other pages — all add/edit/delete actions are performed via modal on this same page.
