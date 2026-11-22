# PROP-033 — Property Register

**Type:** Full page
**Route:** property/list/:id (default CakePHP DashedRoute: `/property/list`; the `id` parameter is the business unit id, also accepted via the query string `?id=`)
**Module:** PROP = Property Records

## Overview
The main list page (entry point) of the Property Records module — listing all villas/properties for the currently selected Business Unit, with filters and action buttons for add/edit/delete/duplicate/view details/view inventory, and downloading the guest contract. This is the central navigation hub to other pages in the module (villa, view_details, inventories, etc.).

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 | No | `{0: 'All'} + business_unit`; changing the value → redirects to `list?id=<bu>` and saves the `default_bu`/`property_business_unit_id` cookies |
| 2 | Show active/inactive (hidden) | `paused_stop_show` | Hidden + `#paused_stop_show` submit button | — | Toggles "Show Active"/"Show Inactive" (Paused/Closed) — POSTs back to the same `list` action, saved to `User.paused_stop_show` |
| Table column | Property Type | — | Text (from `villa_type_id`) | — | Name retrieved from the `VillaType` table |
| Table column | Area | — | Text (from `area_id`) | — | Name retrieved from the `Area` table (via `VillaLocation`) |
| Table column | Name | `name` | Text | — | Villa name |
| Table column | Owner | — | Text/Link | — | `Owner.family_name`; a link opening `Owner::edit` (new tab) if the user has permission, otherwise displayed as plain text |
| Table column | Concierge | — | Text | — | Concatenation of `emoticon - usage_name - first_name family_name` |
| Table column | Status | `status` | Text | — | Open/Paused/Closed |
| Table column | Actions | — | Button group (see below) | — | |

The table uses the client-side DataTable `#zero_config`. There is no dedicated search box beyond the default DataTable search.

## Functions / Actions
- "+ Properties" button (`.add_country`) → navigates to **PROP-034 — Add/Edit Property page** in Add mode (`action=villa, identification`). Shown only when the user is not an `external_user` and has permission (Superadmin/Admin/Business Unit Manager, or Employee/Team Leader with a Content/Accounting role).
- "Territories" button (`.residencesBtn`/link `territories`) → navigates to the Territories page (outside the scope of the 3 assigned actions); disabled (`grey_button`) if `is_concierge` = false.
- "Show Active"/"Show Inactive" toggle button → submits a POST form on the same page, changing the `paused_stop_show` field.
- "Residences" button (link `residenceEnquiry`) → navigates to the Residence Enquiry page.
- "Reports" button (link `propertyReports/contract`) → navigates to PROP-029 (Contract Reports).
- "Copy Code" icon (`.copy_text`) on each row → copies the villa's `short_name` to the clipboard (JS only, no server call).
- "View Details" icon (eye, class `btn-success`) → navigates to **PROP-035 — Property Profile** (`action=viewDetails, $id`). Shown only for appropriate roles (Superadmin/Admin/Business Unit Manager, or Employee/Team Leader with a Concierge/Planner role).
- "Download Guest Contract" icon (`.guest-contract-download`) → opens child popup `#guestContractDownloadModal` (select Language + Electricity payment option via AJAX `guestContractDownloadOptions`, validated via `guestContractAssignmentValidation`, downloads the PDF via `guestContractAssignmentPdf`). Shown only for Superadmin or Employee/Team Leader with a Concierge role.
- "Duplicate" icon (`.btn-warning`, function `copyProperty()`) → opens child popup `#exampleModal1` "Duplicate Property" (select source villa + enter new name), checks for duplicate names via AJAX `checkVillaName`, submits via AJAX `duplicateProperty`, then reloads the page.
- "View Inventory" icon (`ti-layout-grid3-alt`) → navigates to the `inventories/$id` action (outside the scope of the 3 assigned actions).
- "Service Settings" icon (`fa-cogs`) → opens **PROP-034** on the "service and utilities" tab (`action=villa, service and utilities, $id`), shown only when `is_show_service_button` = true (not a partnership contract).
- "Edit Details" icon (`fa-edit`, `.edit_country`) → navigates to **PROP-034 — Add/Edit Property page** in Edit mode (`action=villa, identification, $id`).
- "Delete" icon (`fa-trash`, `.delete`) → opens child popup `#exampleModal` delete confirmation; the Save button in the popup calls `window.location.href = '/VM/property/delete/' + btoa(id)` (navigates to the `delete` action, outside the scope of the 3 assigned actions).
- "Download" icon (end of table) → link to download the file `downloadPropertyData/$id/$paused_stop_show` (data export, outside the assigned scope — noted for navigation reference only).
- For `external_user == 'agency-staff'`: a dedicated Edit icon navigates to `villa/business situation/$id`, disabled if the villa's contract is not in `open` status.

## Navigation
- Opened from: the main menu (Property Register section, `active_menu = '7'`).
- Navigates to: PROP-034 (Add/Edit Property page, identification/service and utilities/business situation steps), PROP-035 (Property Profile), PROP-029 (Contract Reports), the `territories`, `residenceEnquiry`, `inventories`, `delete`, `downloadPropertyData` actions (outside the assigned scope).
- Child popup: Delete confirmation popup (`#exampleModal`), Duplicate Property popup (`#exampleModal1`), Download Guest Contract popup (`#guestContractDownloadModal`).
