# OWN-004-P2 — View Expense Claim Details

**Type:** Popup (opened from OWN-004, opens in a new browser tab)

**Route:** `/Owner/viewClaim/{claim_id}` (controller `Owner`, action `viewClaim($claim_id)`)

**Module:** Owner Management (Admin)

## Overview

A read-only detail page for a claim expense charged to a villa owner, showing the subsidiary company, supplier, amount, currency, description, and attached receipt image. Opened from the "View" icon in the Receipts tab of screen OWN-004 (opens in a new browser tab, `target="_blank"`).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Subsidiary Company Name | `company_subsidiary.short_name` | Text (readonly) | — | |
| 2 | Supplier Name | `supplier_name` | Text (readonly) | — | |
| 3 | Amount | `claim_amount` | Number (readonly) | — | Formatted to 2 decimal places |
| 4 | Currency | `currency.code` | Text (readonly) | — | |
| 5 | Description | `description` | Text (readonly) | — | |
| 6 | Receipt Image | `receipt_image` | Image (readonly) | — | |

## Functions / Actions

- View-only information; no edit button.

## Navigation

- Opened from: OWN-004 (Receipts tab, eye icon on each data row) — opens in a new browser tab.
- Does not navigate further to any other sub-screen.
