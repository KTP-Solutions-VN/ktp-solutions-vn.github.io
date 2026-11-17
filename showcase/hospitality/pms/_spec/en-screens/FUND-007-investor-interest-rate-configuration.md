# FUND-007 — Investor Interest Rate Configuration

**Type:** Full page

**Route:** `FundController::rates($owner_id)` — `/fund/rates/:owner_id` (GET to display, POST to save the entire table)

**Module:** FUND = Investment Fund

## Overview
Configure the interest rate tiers (investment-month range → applicable interest %) for an investor, edited inline directly on the table.

## Detailed Description

**Display columns (also serve as inline-editable fields):**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | From Month | `data[from_month][]` | Text (number, read-only until Edit is clicked) | Yes | Automatically recalculated based on the preceding row when a row is added/deleted |
| 2 | To Month | `data[to_month][]` | Text (number, read-only until Edit is clicked) | Yes | The last row is typically set to 99 (unlimited) |
| 3 | Interest Rate % | `data[rates][]` | Text (number, read-only until Edit is clicked) | Yes | |

No filter — the table always displays the full set of interest rate tiers for the current `owner_id`.

## Functions / Actions
- **Edit (pencil)**: unlocks the input fields for that row (To Month + Interest Rate, or Interest Rate only if it is the last/unlimited row) for editing; shows the Save button.
- **Add (+)**: inserts a new row immediately after the current row, automatically calculating the next `from_month`/`to_month`; subsequent rows are shifted accordingly (handled client-side), and the entire table is submitted upon clicking Save.
- **Delete (trash bin)**: allowed only on middle rows (not the first/last row); calls AJAX `fund/delete-row` to delete the row and retrieves the full updated set of interest rate tiers from the server.
- **Save**: submits the entire table, saving the interest rate tier array (serialized) to the `owner_id`'s `Fund.rates`.

## Navigation
- Entry point: FUND-001 (Rate € icon on each investor row).
- Returns to FUND-001 via the "Investors" breadcrumb.
