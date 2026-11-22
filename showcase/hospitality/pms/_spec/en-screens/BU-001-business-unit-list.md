# BU-001 — Operating Units

**Type:** Full page

**Route:** `BusinessUnitController::list()` — default `/business-unit/list`

**Module:** Operating Units

## Overview
A list of all business units in the system, sorted by country name and then by unit name. Allows filtering by Active/Paused status, viewing details, editing, deleting, and toggling the active status directly from the list.

## Detailed Description

List (DataTable `#zero_config`):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | Ascending sequence number |
| 2 | Country | `country_id` → `country_name` | |
| 3 | Business Unit Name | `name` | |
| 4 | Short Name | `short_name` | |
| 5 | Logo | `logo` | 100x100 thumbnail image; defaults to `no-image.gif` if empty |
| 6 | Legal Entity | `company_id` → company name, together with the branch name `company_subsidiary.short_name` | |
| 7 | Created On | `created_at` | Format `d M y` |
| 8 | Actions | — | View, Edit, Delete, Toggle status |

Filter: "Show Active" / "Show Paused" toggle button (via hidden field `paused_stop_show`, the display preference is saved per logged-in user).

## Functions / Actions
- **Add new:** navigates to BU-002 (New Operating Unit).
- **View (eye icon):** navigates to BU-004 (Operating Unit Profile) — `action=viewDetails`.
- **Edit (pencil icon):** navigates to BU-003 (Edit) — `action=edit`, id is `base64_encode`d.
- **Delete (trash icon):** opens the BU-001-P1 delete confirmation popup; confirming navigates to `delete/{id}` (id base64-encoded via JS `btoa`).
- **Toggle switch (toggle icon):** calls a hidden AJAX request to the `updateBusinessUnitStatus` action to switch the status between Active ⇄ Paused; switching to Paused also updates the status of related Villas (any Villa currently Open is switched to Paused, and the villa is removed from the "business_unit_id_2" slot if it matches).
- **Show Active/Show Paused:** changes the list filter condition based on `BusinessUnit.status`.

## Navigation
- Accessed from: Main menu > Operating Units.
- Navigates to: BU-002 (Add), BU-003 (Edit), BU-004 (Operating Unit Profile), BU-001-P1 (delete confirmation popup).
