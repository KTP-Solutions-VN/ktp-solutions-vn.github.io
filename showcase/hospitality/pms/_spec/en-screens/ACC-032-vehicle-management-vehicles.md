# ACC-032 — Vehicle Management (Vehicles)

**Type:** Full page (list + add/edit/delete modal on the same page, no dedicated popup view)

**Route:**
- Main page: `AccountController::vehicles()` — default `/account/vehicles` (GET to view the list; POST to the same URL for add/edit/delete, processed according to the `action` parameter in the request, then redirects back to `referer()`)
- AJAX to load staff by Business Unit/Team (used for the "Used by" select in the modal): `AccountController::getBusinessUsers()` — default `/account/get-business-users` (POST, returns JSON)
- AJAX to check for duplicate vehicle name: `AccountController::getUniqueName()` — default `/account/get-unique-name` (POST, returns JSON) — called via jQuery Validate `remote` when entering the "Name" field
- (Out of scope, noted for reference only): duplicate license-plate validation uses the `checkSerialNumber` action (not covered by this document)

**Module:** Accounting & HR

## Overview
Manages the vehicle list (company assets of type `vehicle`) by Business Unit: view active/sold vehicles, add, edit, and delete vehicles via an on-page modal; when assigning "Used by" (the employee using the vehicle), the system simultaneously creates/updates a `UserCompanyAsset` record (type `car`) to track the asset assigned to the employee.

## Detailed Description

### Page filters
| # | Field Label | Field Code | Input Type | Notes |
|---|---|---|---|---|
| 1 | Business Unit | `business_unit` (query `id`) | Select2 | "All" option (`id=0`) + BU list per user permissions; changing it reloads the page with `?id=<bu>` |
| 2 | Active/Sold toggle button | hidden within `action=nothing` (filter form submit) | Toggle button | Shows "Sold" when viewing Active (`Vehicle.sale_date = ''`); shows "Active" when viewing Sold (`Vehicle.sale_date != ''`) |

### List table (DataTable `#zero_config`)
| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Sr No | — | Sequential number |
| 2 | First Name | `user.first_name` | Name of the vehicle's user (joined via `used_by` → `User`) |
| 3 | Family Name | `user.family_name` | |
| 4 | Vehicle | `name` | Vehicle name/code |
| 5 | Plate | `licence_plate` | License plate |
| 6 | Insured till | `insured_till` | Format `d M Y` |
| 7 | Vehicle mod | `updated_at` | Last update date, format `d M Y` |
| 8 | Mod user | `modified_by` | Name of the last user to update |
| 9 | Action | — | Edit, Delete — this column is **hidden** if `user_type` is `Business Unit Manager` or `Employee` |

Data retrieval conditions: `Vehicle.assets_type = 'vehicle'`, filtered by `business_unit_id` (based on the selected BU or the user's `selected_business`), and `sale_date = ''` (Active) or `sale_date != ''` (Sold) depending on the view being shown; contains `User`; sorted by `Vehicle.name ASC`.

### "Add/Edit Vehicle" modal form (`#addVehicle`, a single modal shared for both Add and Edit)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (BUs per user permissions) | Yes | |
| 2 | Vehicle type | `vtype` | Select2: Car / Lorry / Pick-up / Samlo / Motorcycle | Yes | |
| 3 | Name | `name` | Text | Yes | Remote duplicate-name validation via `getUniqueName` (excludes itself when editing) |
| 4 | Brand | `brand` | Text | Yes | |
| 5 | Color | `color` | Text | Yes | |
| 6 | Team | `team` | Select2: Cleaning / Maintenance / Garden / Pool / Back Office | Yes | Changing this triggers AJAX `getBusinessUsers` to reload "Used by" |
| 7 | Used by (staff) | `staff` | Select2 (Active staff, `user_type = Employee`, belonging to the selected BU/Team, excluding users already assigned another `car` asset — except the vehicle currently being edited) | No | Loaded via AJAX `getBusinessUsers`; if selected, creates/updates `UserCompanyAsset` |
| 8 | License plate | `lplate` | Text | Yes | Remote duplicate-plate validation via `checkSerialNumber` |
| 9 | Sale date | `sdate` | Text + datepicker `dd-mm-yyyy` | No | Shown only when Editing (`#srow`) |
| 10 | Acquisition date | `adate` | Text + datepicker `dd-mm-yyyy` | No | |
| 11 | Price | `price` | Text (number-formatted while typing) | No | Field `acquisition_price` |
| 12 | Insurance | `insurance` | Text | No | |
| 13 | Insurance till | `insurance-till` | Text + datepicker `dd-mm-yyyy` (`startDate: '-0d'`) | No | |

## Functions / Actions
- **Add new ("Add new" button, hidden if `user_type` is Business Unit Manager/Employee):** opens the `#addVehicle` modal in add mode, submits POST `action=add` to `vehicles`; the server creates a `Vehicle` record (`status='active'`, default `assets_type`), and if "Used by" is selected, also creates a `UserCompanyAsset` (`assets='car'`, `received_on=now`, `approved_by=current user`); writes an access log; redirects to the previous page.
- **Edit (pencil icon, hidden if Business Unit Manager/Employee):** opens the modal in edit mode (pre-loaded from the button's `data-*` attributes), submits POST `action=edit`; updates `Vehicle`, and if "Used by" is set, updates/recreates the corresponding `UserCompanyAsset` keyed by `serial_number = vehicle id`.
- **Delete (trash icon, shown only for `user_type = Superadmin`):** opens the modal in delete-confirmation mode, submits POST `action=delete`; the server deletes the linked `UserCompanyAsset` (by `serial_number`) then deletes the `Vehicle`; writes an access log; redirects to the previous page.
- **Reloading "Used by" by Business Unit/Team/Vehicle type:** AJAX `getBusinessUsers` (`form_name=vehical`) whenever `business_unit`, `team`, or `vtype` changes in the modal — excludes staff already assigned another vehicle (retains staff currently assigned to the vehicle being edited).
- **Checking for duplicate vehicle name:** AJAX `getUniqueName` when leaving the "Name" field (jQuery Validate remote).
- **Toggle Active/Sold:** submits the filter form (`#filter`) button, switching the `Vehicle.sale_date` condition to view active or sold vehicles.
- **Changing Business Unit:** reloads the page with query `?id=<business_unit>`.

## Navigation
- Entered from: Sidebar > Account & HR > Settings (submenu) > **Assets > Vehicles**.
- Navigates to: no separate URL-based sub-page — all add/edit/delete actions are handled via a JS modal (`#addVehicle`) on this same page, not via separate `.ctp` popup views (no `add_vehicle.ctp`/`edit_vehicle.ctp` exists). After saving/deleting, the page redirects back to itself (`referer()`).
