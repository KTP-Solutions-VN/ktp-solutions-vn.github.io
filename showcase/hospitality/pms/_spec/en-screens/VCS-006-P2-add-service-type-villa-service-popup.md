# VCS-006-P2 — Vendor Service Type Form

**Type:** Popup/Modal (opened from VCS-006)
**Route:** No dedicated route — uses a shared form that POSTs to `villa-common-setting/service-providers` (hidden `action`=`add_service`); duplicate-name check via AJAX `villa-common-setting/check-service-name` (a custom pretty route configured in Routes.php)
**Module:** VCS = Property Attributes

## Overview
A Bootstrap modal (`#serviceModel`) that only supports Adding a new "Service Type" (`ProviderService`) — master data used to associate with Service Providers in VCS-006. Only visible to Superadmin users (since the "Services" tab is only shown to Superadmins).

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Name (Service Type name) | `name` (id `service_name`) | Text | Yes | Required validation + remote duplicate-name check via `checkServiceName` |
| 2 | Action (hidden) | `action` (id `service_action`) | Hidden (`add_service`) | Yes | Fixed value `add_service`, distinct from `add/edit/delete` so the controller routes to the branch that saves `ProviderService` |
| 3 | Id (hidden) | `id` (id `service_id`) | Hidden | Not used | The modal only supports adding, with no edit/delete mode |

## Functions / Actions
- "Save" button (`#submit_button1`) — submits when valid, saving a new `ProviderService` record.
- "Cancel" button — closes the modal without saving.
- Validation: `name` is required, checked for duplicates via remote AJAX `checkServiceName`.

## Navigation
- Opened from: VCS-006 ("Service Catalog" tab) — "+ Add new" button.
- Navigates to: no page change — after submission, VCS-006 is reloaded (redirect via `referer()`); the new Service Type then appears in the selection list on VCS-006-P1.
