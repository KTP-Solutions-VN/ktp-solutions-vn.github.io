# CMS-003 — Service Showcase

**Type:** Full page

**Route:** `CmsController::cmsServicesList($action, $id)` — default `/cms/cms-services-list/:action/:id`

**Module:** Web Publishing

## Overview
List of "villa services" (Concierge/Maintenance/Cleaning/Transport) configured for display on the villa website. No server-side pagination (retrieves the entire result set via `CmsService->find('all')`; pagination/filtering/sorting are handled client-side only, via the `#zero_config` DataTable).

## Detailed Description

List (data table):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | (computed client-side) | |
| 2 | Title | `CmsService.title` | |
| 3 | Action | — | Edit, Delete buttons |

No server-side filter/search, no server-side pagination.

## Functions / Actions
- **Add new ("+" button):** navigates to CMS-004 (`/cms/cms-services`, no `id` passed).
- **Edit:** navigates to CMS-004 with `id` (`/cms/cms-services/:id`).
- **Delete:** calls back into this same action (`$action`/`$id`) in the form `/cms/cms-services-list/delete/:id` — deletes the `CmsService` record by `id`, shows a flash message, then redirects back to the list.
- Backend note: the `duplicateProperty` action (AJAX, no dedicated view) allows duplicating service content from one villa to another (`business_unit_id`, `villa`, `to`); however, no button/UI element in the current CMS-003/CMS-004 views is found to call this action (there is one line of JS calling `#duplicate-form` that is already commented out in `cms_services.ctp`), so this function is currently not activated through the displayed interface.

## Navigation
- Accessed from: CMS-005 (Shared Content Blocks, "Service Showcase" button) or breadcrumb from CMS-004.
- Navigates to: CMS-004 (Showcase Service Editor).
