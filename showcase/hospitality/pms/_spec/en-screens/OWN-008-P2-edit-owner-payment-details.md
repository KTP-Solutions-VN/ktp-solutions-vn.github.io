# OWN-008-P2 — Edit Owner Payment Details

**Type:** Popup (opened from OWN-008)

**Route:** `/Owner/editPaymentDetail/{id}` (controller `Owner`, action `editPaymentDetail($id)`)

**Module:** Owner Management (Admin)

## Overview

A form for editing an existing payment account/detail (bank) for an owner. Opened from the "Edit" (pencil) icon on each row of screen OWN-008.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Payment Method | `payment_method_id` | Select | Yes | The current value is pre-selected |
| 2 | Bank Name | `bank_name` | Text | Yes (if payment_method_id = 1) | Only shown when method id=1 |
| 3 | Swift Code | `bank_swift` | Text | Yes | |
| 4 | Country | `country_id` | Select | Yes | |
| 5 | Currency | `currency_id` | Select | Yes | |
| 6 | Account Name | `account_name` | Text | Yes | |
| 7 | Account Number | `account_number` | Text | Yes | |
| 8 | Document | `document` | File (image/PDF) | No | Displays the previously uploaded file (image or "View PDF" link); max 1MB |
| 9 | Preference | `payment_type` | Checkbox group (Primary/Secondary), single selection | Yes | The current value is pre-selected |

## Functions / Actions

- **Save**: updates the `OwnerBankAccount` record; if `payment_type` is changed, the owner's other record of the same type automatically switches to the opposite type; logs the activity; after saving, redirects to OWN-008 (`payment/{owner_id}`).
- **Cancel**: returns to OWN-001 (Owner List).

## Navigation

- Opened from: OWN-008 ("Edit" icon on each payment detail row).
- After saving (success or failure): returns to OWN-008 — Owner Payment List.
