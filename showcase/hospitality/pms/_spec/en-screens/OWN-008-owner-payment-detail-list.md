# OWN-008 — Owner Payment Detail List

**Type:** Full page

**Route:** `/Owner/payment/{owner_id}` (controller `Owner`, action `payment($owner_id)`)

**Module:** Owner Management (Admin)

## Overview

A screen listing the payment accounts/details (bank) declared for a specific owner. This is an independent payment CRUD flow (running in parallel with the "Payment Details" tab embedded in OWN-003) — currently it only serves as the destination after adding/editing/deleting payment details via the `addPaymentDetail`/`editPaymentDetail`/`deletePaymentDetail` actions; no direct link into this screen from OWN-001/OWN-003 was found in the current source code.

## Detailed Description

| # | Column Name | Field Code | Data Type | Notes |
|---|---|---|---|---|
| 1 | No. | — | Number | |
| 2 | Payment Method | `payment_method_id` | Text (mapped from category) | |
| 3 | Bank Name | `bank_name` | Text | |
| 4 | Account Name | `account_name` | Text | |
| 5 | Account Number | `account_number` | Text | |
| 6 | Swift Code | `bank_swift` | Text | |
| 7 | Country | `country_id` | Text (mapped) | |
| 8 | Currency | `currency_id` | Text (mapped) | |
| 9 | Document | `document` | Link to view file | |
| 10 | Actions | — | Edit / Delete | |

## Functions / Actions

- **+ Payment Details**: opens OWN-008-P1 (Add Payment Details).
- **Edit** (pencil icon, per row): opens OWN-008-P2 (Edit Payment Details).
- **Delete** (trash icon, per row): deletes the payment detail (action `deletePaymentDetail`, no dedicated UI).

## Navigation

- Navigates to:
  - OWN-008-P1 — Add Owner Payment Details
  - OWN-008-P2 — Edit Owner Payment Details
- Note: no direct entry point into this screen from the Admin OwnerController interface has been identified; further review with the development team is required to confirm whether this flow is still in use or has been superseded by the "Payment Details" tab in OWN-003.
