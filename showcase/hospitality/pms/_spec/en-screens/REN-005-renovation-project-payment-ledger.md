# REN-005 — Project Spend Ledger

**Type:** Full page
**Route:** renovation/paymentList/:renovation_id + dashed-style pretty route: renovation/payment-list/:renovation_id (id passed as base64)
**Module:** REN = Refurbishment

## Overview
A ledger recording all income/expense transactions (`RenovationPayment`) related to the renovation project: every invoice raised, every advance/reimbursement is recorded as one or more income/expense lines here.

## Detailed Description

### Displayed columns
| # | Column | Source Field Code | Notes |
|---|---|---|---|
| 1 | Date | `date` | |
| 2 | Post | `post` | Entry description (receipt name, "Company", "Advance", "Reimbursement") |
| 3 | Paid by | `paid_by` | |
| 4 | Paid to | `paid_to` | |
| 5 | Payment method | `payment_method` | |
| 6 | In (Credit) | `credit` | |
| 7 | Out (Debit) | `debit` | |
| 8 | Balance | Running total | Calculated cumulatively across rows |

## Functions / Actions
- **+ Payment**: opens REN-006 — Record Project Payment (`addPayment`).

## Navigation
- Entered from: the "Wallet" icon on REN-003 — Project Timeline.
- Leads to: REN-006 — Record Project Payment.
