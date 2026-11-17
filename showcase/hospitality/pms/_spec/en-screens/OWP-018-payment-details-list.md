# OWP-018 — Payment Details List

**Type:** Full page

**Route:** `ExternalUserController::paymentDetails()` — no dedicated friendly route (default `/external-user/payment-details`)

**Module:** Owner Portal

## Overview

List of payment accounts/details (bank, wallet, etc.) that the Owner has registered to receive payments from the management unit, comprising Primary and Secondary accounts.

## Detailed Description

List — displayed columns:

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | No. | sr_no | |
| 2 | Payment method | payment_method_id | Method name (mapped from the PaymentMethod category) |
| 3 | Bank name | bank_name | |
| 4 | Account name | account_name | |
| 5 | Account number | account_number | |
| 6 | Bank SWIFT code | bank_swift | |
| 7 | Country | country_id | |
| 8 | Currency | currency_id | |
| 9 | Payment priority | payment_type | "Primary" (prefered) / "Secondary" (other) |
| 10 | Attached document | document | "View" link opens the file (image/PDF) in a new tab; empty if none |
| 11 | Actions | — | Edit, Delete |

## Functions / Actions

- Add payment details ("+" button → opens OWP-018-P1)
- Edit payment details (pencil icon → opens OWP-018-P2)
- Delete payment details (trash icon → opens a delete confirmation popup, calls `deletePaymentDetail($id)`, no dedicated view)

## Navigation

- Accessed from the main menu (Payment Details)
- "+" button → OWP-018-P1 (add payment detail popup)
- Edit icon → OWP-018-P2 (edit payment detail popup)
- Delete icon → confirmation popup, returns to OWP-018 after deletion
