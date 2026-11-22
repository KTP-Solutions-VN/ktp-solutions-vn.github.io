# PROP-041 — Service Fee Ledger

**Type:** Full page
**Route:** property/service-fee/:villa_id (villa_id passed base64-encoded)
**Module:** PROP = Property Records

## Overview
Page listing all service fee payment records saved for a property (`VillaPaymentRecord` table, containing `Villa`, `VillaService`), allowing viewing of payment documents, editing/deleting records, and quick access to add a new payment record or to the services/utilities settings page.

## Detailed Description

### Displayed Columns (`#zero_config` table)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | No. | — | Text | — | Row number |
| 2 | Service | `villa_service.service_name` | Text | — | Service name (via VillaService contain) |
| 3 | Payment | `payment_amount` | Text | — | Amount |
| 4 | Payment Date | `payment_date` | Text (datetime, format `d, M Y h:i A`) | — | |
| 5 | Paid By | `paid_by` | Text | — | |
| 6 | From | `payment_from` | Text (datetime) | — | |
| 7 | To | `payment_to` | Text (datetime) | — | |
| 8 | Action | — | Icon buttons | — | View document (if `payment_document` exists), Edit, Delete |

## Functions / Actions
- "Add Payment Record" button → opens PROP-022 (Property Bank Details) at `payment-record/{base64(villa_id)}`.
- "Add Settings" button (hidden/commented out in the current code) → links to `service-setting/common-area/{base64(villa_id)}`.
- "View document" icon (`fa-eye`) → opens the file `/files/villas/{payment_document}` in a new tab.
- "Edit" icon (`fa-edit`) → opens PROP-023 (Edit Service Fee Entry) at `payment-record-edit/{base64(villa_id)}/{base64(id)}`.
- "Delete" icon (`fa-trash`) → calls `paymentRecordDelete` (AJAX delete confirmation).

## Navigation
- Opened from: PROP-035 (Property Profile) or the property services menu.
- Navigates to: PROP-022 (Payment Record — add new), PROP-023 (Edit Service Fee Entry), payment document file.
- Child popup: none (deletion is handled via JS confirm, not a dedicated modal in this file).
