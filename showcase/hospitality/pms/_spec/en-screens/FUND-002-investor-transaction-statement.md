# FUND-002 — Investor Ledger

**Type:** Full page

**Route:** `FundController::statements($in_id = null)` — `/fund/statements` or `/fund/statements/:in_id` (parameter passed when navigating from FUND-001; also filterable via query `id` = business unit, `investors` = investor/fund id).

**Module:** FUND = Investor Capital

## Overview
View the transaction history (investments, withdrawals, interest payouts, interest capitalizations) of a specific investor, the running balance for each investment, and initiate new transactions.

## Detailed Description

**Filters:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` (query `id`) | Select2 | No | Changing the value reloads the page |
| 2 | Investor | `investors` | Select2 (list of Funds with `status = yes`) | No | Defaults to the first investor in the list, or the `in_id`/`investors` value passed in |

**Display columns:**

| # | Column | Data Source | Notes |
|---|---|---|---|
| 1 | Date | `StatementLog.transaction_date` | |
| 2 | Description | `StatementLog.description` | |
| 3 | Amount | `StatementLog.amount` | For `withdraw` transactions on the same day, matching rows are merged into a single row totaling the day's withdrawal amount |
| 4 | Origin | `StatementLog.origin` | Rental / Investment |
| 5 | Balance | `StatementLog.balance` | |
| 6 | Interest Rate (%) | `Statement.rate` | Hidden for `withdraw` transactions |
| 7 | Actions | — | View icon (no specific function currently attached) |
| — | Totals row | — | Total transaction amounts and net closing balance |

## Functions / Actions
- **Invest**: opens the FUND-002-P1 popup in Invest mode.
- **Withdraw**: opens the FUND-002-P1 popup in Withdraw mode.
- **Payout**: opens the FUND-002-P1 popup in Payout mode (the modal title always shows the available interest amount).
- **Capitalize**: opens the FUND-002-P1 popup in Capitalize mode.

## Navigation
- Entry point: FUND-001 (View icon on an investor row), or by selecting the "Investor" filter directly on this screen.
- Navigates to: popup FUND-002-P1.
- After saving a transaction: reloads FUND-002 itself (redirect to referer).
