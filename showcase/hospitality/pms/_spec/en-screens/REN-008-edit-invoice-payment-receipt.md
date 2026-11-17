# REN-008 — Edit Invoice/Payment Receipt

**Type:** Full page
**Route:** renovation/editRenovationReceipt/:id + dashed-style pretty route: renovation/edit-renovation-receipt/:id (id passed as base64)
**Module:** REN = Renovation

## Overview
Form for editing a saved payment receipt: update the amount allocated to each item, the payer, and the payment method. Upon saving, the system recalculates the `real_amount` difference for each item and overwrites the related ledger entries tied to this receipt.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Invoice file name | `receipt_name` | Text, readonly | — | The file cannot be changed after creation |
| 2 | Item & amount spent | `item[<key>][name]`, `item[<key>][amount]` | Table | Yes (amount) | Pre-populated from `RenovationReceipt.renovation_items` (unserialized) |
| 3 | Total amount | `total_amount` | Text, readonly, auto-calculated | — | |
| 4 | Paid by | `payment_by` | Select2 | No | |
| 5 | Payment type | `paid_type` | Radio: advanced by staff / paid by company | Yes | |
| 6 | Payment method | `payment_method` | Select2 (`PaymentMethod`) | Conditional | Only when `paid_type = paid by company` |

## Functions / Actions
- **Update**: merges items with duplicate names, recalculates the `real_amount` difference against the previous value, updates `RenovationItem`; deletes all existing `RenovationPayment` records tied to this receipt and re-records them per the new `paid_type` (same logic as REN-007).

## Navigation
- Entered from: the "Edit" icon in the invoice table on REN-003 — Renovation Project Follow-up.
- Leads to: after successfully saving, returns to REN-003 — Renovation Project Follow-up.
