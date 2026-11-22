# OWN-001 — Owner Accounts

**Type:** Full page

**Route:** `/Owner/list` (controller `Owner`, action `list()`)

**Module:** Owner Relations (Admin)

## Overview

This screen lists all villa Owners in the system. It allows filtering by Business Unit, filtering by Active/Inactive status, provides a quick view of the number of active/inactive villas for each owner, and serves as the entry point for adding, viewing, editing, or deleting an owner.

## Detailed Description

### Filters

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (dropdown) | No | Defaults to the Business Unit assigned to/currently selected by the user; includes an "All" option |
| 2 | Active/Inactive Status | `status` | Hidden toggle-style submit button (hidden field `status`) | No | Button that toggles the filter status between "Active Owners" / "Inactive Owners" |

### List (Table)

| # | Column Name | Field Code | Data Type | Notes |
|---|---|---|---|---|
| 1 | No. | — | Sequence number | Auto-generated |
| 2 | Family Name | `family_name` | Text | Default sort column (ASC) |
| 3 | First Name | `first_name` | Text | |
| 4 | Email | `email` | Text | |
| 5 | Nationality | `nationality` | Text | |
| 6 | Nb Properties | `active_villa` / `inactive_villa` | Text (aggregated) | Displayed as `Active (Inactive)` |
| 7 | Created Date | `created_at` | Datetime | Format `d M Y H:i` |
| 8 | Actions | — | Button group | View, Villa Ownership, Payment, Edit, Delete |

## Functions / Actions

- **Add New** (button "+ Add New"): navigates to OWN-002 (New Owner Account).
- **Access History** (button): navigates to OWN-014 (Owner Access History).
- **Filter by Business Unit**: submits the filter form to reload the list.
- **Active/Inactive owners** (toggle button): switches the status filter condition and resubmits the list.
- **View details** (eye icon, per row): opens OWN-001-P1 (Owner Account Snapshot).
- **Villa Ownership** (house icon, per row): navigates to OWN-003 (Edit Owner Account) — "Properties" tab.
- **Payment** (dollar icon, per row): navigates to OWN-003 (Edit Owner Account) — "Payment Details" tab.
- **Edit** (pencil icon, per row): navigates to OWN-003 (Edit Owner Account) — "Owner Details" tab.
- **Delete** (trash icon, per row): deletes the owner (action `delete($id)`, no dedicated UI — only a confirmation followed by an ajax call/redirect).

## Navigation

- Entered from: main menu (sidebar) item "Owner Accounts".
- Navigates to:
  - OWN-002 — New Owner Account (Add New button)
  - OWN-001-P1 — Owner Account Snapshot (eye icon)
  - OWN-003 — Edit Owner Account (house/dollar/pencil icon, opens the corresponding tabs)
  - OWN-014 — Owner Access History (Access History button)
