# REN-006 — Record Project Payment

**Type:** Full page
**Route:** renovation/addPayment/:renovation_id + dashed-style pretty route: renovation/add-payment/:renovation_id (id passed as base64)
**Module:** REN = Refurbishment

## Overview
Form for recording an independent payment (not tied to a specific invoice) into the renovation project's ledger: an advance or reimbursement between the parties involved.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Entry type | `post` | Radio: advance / reimbursement | Yes | Saved as `post = "Advance"`/`"Reimbursement"` |
| 2 | Payment method | `payment_method` | Select2 (`PaymentMethod`) | Yes | |
| 3 | Paid by | `payment_by` | Select2 (list of users) | Yes | |
| 4 | Paid to | `payment_to` | Select2 (list of users) | Yes | |
| 5 | Amount | `amount` | Numeric text | Yes | Recorded in the `credit` column of `RenovationPayment`, `debit = 0` |

## Functions / Actions
- **Save**: saves a new `RenovationPayment` record with the current date.

## Navigation
- Entered from: the "+ Payment" button on REN-005 — Project Spend Ledger.
- Leads to: after successfully saving, returns to REN-005 — Project Spend Ledger.
