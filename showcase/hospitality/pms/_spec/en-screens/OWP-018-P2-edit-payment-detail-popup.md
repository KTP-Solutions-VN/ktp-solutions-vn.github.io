# OWP-018-P2 — Edit Payout Account

**Type:** Popup (opened from OWP-018)

**Route:** `ExternalUserController::editPaymentDetail($id)` — no dedicated friendly route, opened from the edit icon on OWP-018 (default `/external-user/edit-payment-detail/{id}`)

**Module:** Owner Hub

## Overview

Form for editing an existing payment account/detail of the Owner.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Payment method | payment_method_id | Select (pre-filled) | Yes | |
| 2 | Bank name | bank_name | Text (pre-filled) | Yes | |
| 3 | Bank SWIFT code | bank_swift | Text (pre-filled) | Yes | |
| 4 | Country | country_id | Select (pre-filled) | Yes | |
| 5 | Currency | currency_id | Select (pre-filled) | Yes | |
| 6 | Account name | account_name | Text (pre-filled) | Yes | |
| 7 | Account number | account_number | Text (pre-filled) | Yes | |
| 8 | Attached document | document | File upload (image/PDF) | No | Shows the existing image/"View PDF" button, can be deleted ("Remove") and a new file uploaded |
| 9 | Payment priority | payment_type | Checkbox (Primary/Secondary) | Yes | If the type is changed, the existing account of that same type (if any) is automatically switched to the other type |

## Functions / Actions

- Update payment details (submit form → validate → save → returns to OWP-018)
- Cancel (returns to OWP-018)

## Navigation

- Opened from OWP-018 (edit icon on each row)
- After saving or canceling → returns to OWP-018
