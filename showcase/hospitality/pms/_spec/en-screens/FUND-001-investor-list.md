# FUND-001 — Investor List

**Type:** Full page

**Route:** `FundController::investors()` — `/fund/investors` (GET, filtered via query string `id`, `show_investor`; POST used to assign a project or download an Excel report). No dedicated pretty route in `config/Routes.php`; falls back to DashedRoute. In the deployment environment, the application runs under the base path `/VM` (e.g., `/VM/fund/investors`).

**Module:** FUND = Investment Fund

## Overview
A list of owners (Owner) flagged as fund investors, showing capital contributions, projected interest, and assigned projects; allows toggling "investor" status, assigning projects to investors, and exporting an Excel report.

## Detailed Description

**Filters:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` (query `id`) | Select2 | No | List of business units per the logged-in user's permissions; changing the value reloads the page with the new query |
| 2 | Display | `show_investors` (query `show_investor`) | Select2: All / Investors | No | "Investors": shows only Owners with `Fund.status = yes`; defaults to "All" |

**Display columns:**

| # | Column | Data Source | Notes |
|---|---|---|---|
| 1 | Owner | `Owner.first_name` + `Owner.family_name` | |
| 2 | Status | `Fund.status` (yes/no) | Displayed as a toggle switch; if `Fund.capital > 0` and the user attempts to turn it off, a warning "This Owner invest more than Zero capital" is shown instead of changing the status |
| 3 | Capital Contribution | `Fund.capital` | Numeric format, 2 decimal places |
| 4 | Projected Interest | `Fund.interest_due` | Numeric format, 2 decimal places; auto-calculated daily on the last day of the month (`interest()` function) |
| 5 | Project | `Fund.project_id` (unserialized) | Names of open projects (`ProjectFund.status = open`) joined by commas |
| 6 | Actions | — | Shown only when `Fund.status = yes`: Rate icon, View (Statements) icon, Project icon |
| — | Totals row | — | Total number of active investors, total capital contribution, total projected interest |

## Functions / Actions
- **Toggle investor status on/off** (AJAX `fund/update-investor-status`): if the Owner does not yet have a `Fund` record, the system automatically creates one with the default interest rate tiers (1–24 months: 6%, 25–48 months: 7%, 49–99 months: 8%).
- **Rate icon (€)**: opens the FUND-007 screen (Rate Configuration) for the corresponding investor.
- **View icon (eye)**: opens the FUND-002 screen (Transaction Statement) for the investor.
- **Project icon (gear)**: opens the FUND-001-P1 popup to assign a project to the investor.
- **Download**: exports an Excel report (`Investor-fund-report-<date>.xlsx`) based on the current filters — a file-download action with no dedicated screen.

## Navigation
- Entry point: Investment Fund management menu ("Investors" item, `active_menu = 301`).
- Navigates to: FUND-007 (Rates), FUND-002 (Statements), popup FUND-001-P1 (Assign Project).
