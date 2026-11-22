# FUND-002-P1 — Investor Transaction: Invest / Withdraw / Payout / Capitalize

**Type:** Popup (opened from FUND-002)

**Route:** Submits via POST to `FundController::statements()` (`/fund/statements`, field `action` = `invest` | `withdraw` | `payout` | `capitalize`). A single modal is shared across all 4 transaction types, showing/hiding fields based on type.

**Module:** FUND = Investor Capital

## Overview
A modal for creating a new transaction for an investor: adding capital (Invest), withdrawing capital (Withdraw), paying out interest in cash (Payout), or rolling accrued interest into capital (Capitalize).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Amount | `amount` | Text/number | Yes | For Payout/Capitalize, capped at the current available projected interest (`Fund.interest_due`) |
| 2 | Date | `date` | Date picker (`yyyy-mm-dd`) | Yes (Invest, Withdraw) | Hidden for Payout, Capitalize (the server uses the current date automatically) |
| 3 | Origin | `origin` | Radio: Rental / Investment | Yes (Invest only) | Hidden for other modes |
| 4 | Reason | `reason` | Text | Yes (Withdraw only) | Hidden for other modes |
| 5 | (hidden) Action | `action` | Hidden | — | `invest` / `withdraw` / `payout` / `capitalize` |
| 6 | (hidden) ID | `id` | Hidden | — | Not used directly (the investor is taken from the parent page's query) |

## Functions / Actions
- **Invest**: adds to the capital contribution (`Fund.capital`), creates a `Statement` + `StatementLog` (type `invest`); the applicable interest rate is determined by the tier (`Fund.rates`) based on the number of months since the first investment.
- **Withdraw**: deducts progressively from `Statement` balances in ascending chronological order (FIFO) until the withdrawal amount is fully covered; creates a `StatementLog` of type `withdraw`; returns an error if the balance is insufficient.
- **Payout**: deducts directly from `Fund.interest_due`, creates a `StatementLog` of type `payout` (does not affect capital contribution).
- **Capitalize**: adds the amount to the first investment with a remaining balance, reducing `Fund.interest_due` accordingly, creates a `StatementLog` of type `capitalize` (converts interest into capital).
- **Cancel**: closes the modal without saving.

## Navigation
- Opened from: FUND-002 (Invest / Withdraw / Payout / Capitalize buttons).
- After saving (success or error): reloads FUND-002.
