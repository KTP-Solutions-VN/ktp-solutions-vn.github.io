# ACC-038 — Mobile Devices

**Type:** Full page

**Route:** `AccountController::phones()` — default `/account/phones`

**Module:** Finance & Admin

## Overview
Manages the list of phones (company assets, `Vehicle` table with `assets_type = 'phone'`) by Business Unit: view the list, add, edit, and delete via an on-page modal.

## Detailed Description

List (DataTable `#zero_config`, filtered by the selected Business Unit):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Sr. No | — | Sequential number |
| 2 | First Name | `user.first_name` | Name of the current user (`used_by` → joined `User`) |
| 3 | Family Name | `user.family_name` | |
| 4 | Brand | `brand` | Brand |
| 5 | Model | `name` | Phone model name |
| 6 | Serial Number | `licence_plate` | Stored in the shared `licence_plate` field of the `Vehicle` table |
| 7 | Acquisition Date | `acquisition_date` | Format `d M Y` |
| 8 | Acquisition Price | `acquisition_price` | |
| 9 | Vehicle Modified (date edited) | `updated_at` | Format `d M Y` |
| 10 | Modified By | `modified_by` | |
| 11 | Actions | — | Edit, Delete — shown only to users who are not Business Unit Manager/Employee (Delete button shown only to Superadmin) |

Filter:
- **Business Unit** (`business_unit1`, select2): selecting a BU reloads the page at `phones?id=<business_unit_id>`. The BU list is drawn from user permissions (`_getAuthBasedBuVilla`), with an "All" option (id = 0).

Query conditions: `Vehicle.assets_type = 'phone'` and `Vehicle.business_unit_id` matching the selected BU (or the user's `selected_business` if no `id` is passed), containing `User` (linked via `UserCompanyAsset.serial_number = Vehicle.id`).

## Functions / Actions
- **Add new:** opens the `#addVehicle` modal (same page, no dedicated view) in add mode — enter Business Unit, Brand, Model, Serial Number, Used By, Acquisition Date, Acquisition Price.
  - Submits via POST to the `phones()` action itself with `action = add`: saves a new record to `Vehicle` (`assets_type = 'phone'`, `status = active`); if `used_by` is selected, also creates a `UserCompanyAsset` record (assigning the asset to the employee).
- **Edit (pencil icon):** opens the same `#addVehicle` modal in edit mode, pre-loaded from the row's `data-*` attributes. Submits with `action = edit`: updates `Vehicle` by `id`, re-syncing `UserCompanyAsset` if `used_by` is set.
- **Delete (trash icon, Superadmin only):** opens the `#addVehicle` modal in delete-confirmation mode. Submits with `action = delete`: soft-deletes the related `UserCompanyAsset` then soft-deletes the `Vehicle` by `id`.
- The modal shares a single form (`#popup_form`) for all three actions, distinguished by the hidden `action` field.
- Validation: Serial Number is required, checked for duplicates via AJAX `account/checkSerialNumber` (type = `phone`); Business Unit, Model, and Brand are required.
- When Business Unit is changed within the modal: AJAX `account/getBusinessUsers` reloads the employee list (Used By) for that BU.

## Navigation
- Entered from: Sidebar > Finance & Admin > Mobile Devices (`active_menu = 'acc-phones'`).
- No navigation to other pages — all add/edit/delete actions are performed via modal on this same page.
