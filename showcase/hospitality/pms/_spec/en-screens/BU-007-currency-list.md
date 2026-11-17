# BU-007 — Currency List

**Type:** Full page

**Route:** `BusinessUnitController::currency()` — default `/business-unit/currency`

**Module:** Business Unit

## Overview
A list of currencies configured in the system, used as the basis for exchange rates (BU-008) and for business units/accounts. Allows adding, editing, and deleting directly on the page via a popup.

## Detailed Description

List (DataTable `#zero_config`):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | Ascending sequence number |
| 2 | Currency Name | `name` | |
| 3 | Country | `country_id` → `country.name` | |
| 4 | Code | `code` | ISO currency code |
| 5 | Symbol | `sign` | |
| 6 | Created On | `created_at` | Format `d M y` |
| 7 | Actions | — | Edit, Delete |

## Functions / Actions
- **Rates:** navigates to BU-008 (Exchange Rates).
- **Add new** (visible only to `Superadmin` users): opens the BU-007-P1 popup in Add mode.
- **Edit (pencil icon):** opens the BU-007-P1 popup in Edit mode, pre-populated with the selected row's data.
- **Delete (trash icon):** opens the BU-007-P2 delete confirmation popup.

## Navigation
- Accessed from: Settings menu.
- Navigates to: BU-008 (Exchange Rates), BU-007-P1 (add/edit popup), BU-007-P2 (delete confirmation popup).
