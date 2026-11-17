# REN-007 — Add Invoice/Payment Receipt

**Type:** Full page
**Route:** renovation/addNewReceipt/:renovation_id + dashed-style pretty route: renovation/add-new-receipt/:renovation_id (id passed as base64)
**Module:** REN = Renovation

## Overview
Form for creating a new payment receipt for a renovation project: upload the invoice PDF file, allocate the actual amount spent across the declared items (or add a new ad-hoc item), and select the payer and payment method. The system automatically generates the invoice file name from the villa + sequence number, updates the `real_amount` of the related items, and records the corresponding income/expense entries in the ledger (REN-005).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Invoice file | `receipt_name` | File upload (PDF only) | No | Automatically named `<Villa>-Renovation-<ymd>-<Seq>.pdf` |
| 2 | Item & amount spent | `item[<key>][name]`, `item[<key>][amount]` | Table: item name (pre-filled, readonly) + amount (input) | Yes (amount) | New ad-hoc item rows can be added (name entered manually) |
| 3 | Total amount | `total_amount` | Text, readonly, auto-calculated | — | Sum of all `item[].amount` |
| 4 | Paid by | `payment_by` | Select2 (list of users) | No | |
| 5 | Payment type | `paid_type` | Radio: advanced by staff / paid by company | Yes | Determines how the entry is recorded in the ledger |
| 6 | Payment method | `payment_method` | Select2 (`PaymentMethod`) | Conditional | Only applies when `paid_type = paid by company` |

## Functions / Actions
- **+ Add item**: adds a new ad-hoc item row to the table.
- **Save**: uploads the invoice file, saves `RenovationReceipt` (with `renovation_items` serialized), accumulates `real_amount` into each corresponding `RenovationItem`, and records the ledger entry into `RenovationPayment`:
  - If "Advanced by staff": records 1 debit line (staff advance).
  - If "Paid by company": records 2 lines — a debit "Supplier" line based on the payment method and a credit "Company" line.

## Navigation
- Entered from: the "+ Add new invoice" button on REN-003 — Renovation Project Follow-up.
- Leads to: after successfully saving, returns to REN-003 — Renovation Project Follow-up.
