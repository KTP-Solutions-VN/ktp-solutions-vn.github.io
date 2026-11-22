# REN-003 — Project Timeline

**Type:** Full page
**Route:** renovation/projectFollowUp/:id + dashed-style pretty route: renovation/project-follow-up/:id (id passed as base64)
**Module:** REN = Refurbishment

## Overview
The central management screen for a specific renovation project: update actual start/completion dates, track budget versus actual cost per item, manage the list of invoices/payment receipts (receipt), manage the progress photo library, and serve as the central navigation point to related popups/sub-screens (payment, invoice, photo, report).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa / Project title | `data_array.villa.name`, `title` | Display text | — | |
| 2 | Actual start/completion date | `actual_start_date`, `actual_end_date` | Datepicker | Yes | |
| 3 | Item list & budget/actual cost | `item[]`, `budget[]` (readonly), `real_amount[]` | Table, numeric input | Yes | Corresponds to each `RenovationItem`; documents (`document[]`) can be attached per item |
| 4 | List of invoices/payment receipts | `renovation_receipts` | Table: date, receipt code, amount | — | Source: `RenovationReceipt` |
| 5 | List of progress photos | `renovation_photos` | Table/photo grid + caption | — | Source: `RenovationPhoto` |

## Functions / Actions
- **Save**: updates the actual start/completion dates and the actual cost (`real_amount`) for each item; if a document is attached, it is uploaded and saved as `RenovationDocument`.
- **Wallet (wallet icon)**: opens REN-005 — Project Spend Ledger (`paymentList`).
- **+ Add new invoice**: opens REN-007 — Add Invoice or Receipt (`addNewReceipt`).
- **Edit invoice (pencil icon, per row)**: opens REN-008 — Edit Invoice or Receipt (`editRenovationReceipt`).
- **Delete invoice**: deletes the `RenovationReceipt`, reverses the corresponding `real_amount` for the affected items, and deletes related `RenovationPayment` records.
- **+ Add photo**: opens REN-009 — Upload Progress Photo (`addPhoto`).
- **Edit photo (pencil icon, per row)**: opens REN-010 — Edit Progress Photo (`editPhoto`).
- **Delete photo**: deletes the `RenovationPhoto`.
- **Export expense report (CSV)**: AJAX `getExpenseReport` exports an Excel/CSV file summarizing budget vs. actual cost.
- **Download all documents (zip)**: `documentZipFile` compresses all `RenovationDocument` records for the project.
- **Quick status update**: AJAX `updateStatus` progresses the status sequentially Not Started → Under Progress → Completed.
- **View progress report**: opens REN-011 — Budget vs. Progress (`report`).

## Navigation
- Entered from: the "Follow up project" icon on REN-002 — Refurbishment Tracker; or a quick link from REN-001 when the villa already has an in-progress project.
- Leads to: REN-005, REN-007, REN-008, REN-009, REN-010, REN-011.
