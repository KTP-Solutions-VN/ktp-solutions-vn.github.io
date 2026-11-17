# OWP-018-P1 — Add Payment Detail Popup

**Type:** Popup (opened from OWP-018)

**Route:** `ExternalUserController::addPaymentDetail()` — no dedicated friendly route, opened from the "+" button on OWP-018 (default `/external-user/add-payment-detail`)

**Module:** Owner Portal

## Overview

Form for adding a new payment account/detail for the Owner.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Payment method | payment_method_id | Select | Yes | If a bank method is selected (id=1), the "Bank Name" field is additionally shown |
| 2 | Bank name | bank_name | Text | Yes (conditional) | Only shown when payment_method_id = 1 |
| 3 | Bank SWIFT code | bank_swift | Text | Yes | |
| 4 | Country | country_id | Select | Yes | |
| 5 | Currency | currency_id | Select | Yes | |
| 6 | Account name | account_name | Text | Yes | |
| 7 | Account number | account_number | Text | Yes | |
| 8 | Attached document | document | File upload (image/PDF) | No | Approx. 5MB size limit, with image preview or a "View PDF" button |
| 9 | Payment priority | payment_type | Checkbox (Primary/Secondary) | Yes | Choose "prefered" (primary) or "other" (secondary); if an account of the same type already exists, the system will overwrite (update) it |

## Functions / Actions

- Save payment details (submit form → validate → save → returns to OWP-018)
- Cancel ("Cancel" button → returns to OWP-018)

## Navigation

- Opened from OWP-018 ("+" button)
- After saving or canceling → returns to OWP-018
