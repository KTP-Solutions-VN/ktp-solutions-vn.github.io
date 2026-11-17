# VCS-006-P1 — Add/Edit/Delete Service Provider Popup

**Type:** Popup/Modal (opened from VCS-006)
**Route:** No dedicated route — uses a shared form that POSTs to `villa-common-setting/service-providers` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX `villa-common-setting/check-service-provider-name` (a custom pretty route configured in Routes.php)
**Module:** VCS = Villa Common Settings

## Overview
A Bootstrap modal (`#providerModal`) covering the three Add/Edit/Delete Service Provider scenarios, comprising contact information, the type(s) of service provided (each type may carry its own display label), and the list of Business Units permitted to use the provider. In Delete mode, the input section is hidden.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Service Provider (provider name) | `name` | Text | Yes | Required validation + remote duplicate-name check via `checkServiceProviderName` |
| 2 | Service Type | `villa_services_id[]` | Select2 multiple | Yes | List sourced from `ProviderService`; multiple selection |
| 3 | Display label per service | `label_name[]` | Text (dynamic, generated based on the number of selected Service Types) | Yes (when shown) | "Add Field" button adds a label row for each selected service |
| 4 | Contact Person | `contact_person` | Text | Yes | |
| 5 | Address | `address` | Text | Yes | |
| 6 | Country | `country` | Select2 | Yes | List of countries |
| 7 | Phone Number | `phone_number` | Text | Yes | |
| 8 | Email | `email` | Text | Yes | |
| 9 | Messenger | `messenger` | Text | No | |
| 10 | Messenger ID | `messenger_id` | Text | No | |
| 11 | Status | `status` | Select (Active/Inactive) | Yes | |
| 12 | Business Units | `business_units[]` | Multi-select checkboxes | Yes (at least 1) | Custom JS validation: requires at least 1 checkbox to be checked |
| 13 | Action (hidden) | `action` | Hidden (`add`/`edit`/`delete`) | Yes | |
| 14 | Id (hidden) | `id` | Hidden | Conditional | Required when editing/deleting |

## Functions / Actions
- "Save"/"Update"/"Delete" button (`#submit_button`) — label changes based on the action; only submits once jQuery Validate passes (including the custom rule for the Business Units checkboxes).
- "Cancel" button — closes the modal without saving.
- "Add Field" button (`#add_labels`) — adds one label field (`label_name[]`) for each currently selected Service Type (synchronized whenever the Service Type selection changes).
- When editing: all data is repopulated from the `data-*` attributes of the Edit button (name, selected service types, checked business units, service labels, contact info, etc.).
- Validation: required text/select fields; `name` is checked for duplicates via remote AJAX `checkServiceProviderName`; `business_units` requires at least 1 checkbox to be checked.

## Navigation
- Opened from: VCS-006 ("Service Providers" tab) — Add new / Edit / Delete buttons on the list table.
- Navigates to: no page change — after submission, VCS-006 is reloaded (redirect via `referer()`).
