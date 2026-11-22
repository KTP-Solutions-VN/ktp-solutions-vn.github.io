# OWN-008-P1 — New Owner Payout Account

**Type:** Popup (opened from OWN-008)

**Route:** `/Owner/addPaymentDetail/{owner_id}` (controller `Owner`, action `addPaymentDetail($owner_id)`)

**Module:** Owner Relations (Admin)

## Overview

A form for adding a new payment account/detail (bank) for a specific owner. Opened from the "+ Payment Details" button on screen OWN-008 (Owner Payout Accounts).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Payment Method | `payment_method_id` | Select | Yes | If method id=1 is selected, a "Bank Name" field (`bank_name`, Text, required) is additionally shown via JS |
| 2 | Swift Code | `bank_swift` | Text | Yes | |
| 3 | Country | `country_id` | Select | Yes | |
| 4 | Currency | `currency_id` | Select | Yes | |
| 5 | Account Name | `account_name` | Text | Yes | |
| 6 | Account Number | `account_number` | Text | Yes | |
| 7 | Document | `document` | File (image/PDF) | No | Max 1MB; JPG/JPEG/PNG/PDF only; click the image frame to select a file |
| 8 | Preference | `payment_type` | Checkbox group (Primary/Secondary), single selection | Yes | Select one of the two (`prefered`/`other`); JS automatically deselects the other |

## Functions / Actions

- **Save**: saves a new `OwnerBankAccount` record for the owner; if a record with the same `payment_type` (prefered/other) already exists, it is overwritten; logs the activity; after saving, redirects to OWN-008 (`payment/{owner_id}`).
- **Cancel**: returns to OWN-001 (Owner Accounts).

## Navigation

- Opened from: OWN-008 ("+ Payment Details" button).
- After saving (success or failure): returns to OWN-008 — Owner Payment List.
