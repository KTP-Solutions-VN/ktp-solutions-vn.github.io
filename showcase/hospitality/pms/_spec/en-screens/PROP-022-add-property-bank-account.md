# PROP-022 — Add Property Bank Account

**Type:** Full page
**Route:** property/payment-record/:villa_id (villa_id passed base64-encoded)
**Module:** PROP = Properties

## Overview
Form for adding/updating the bank account information (Villa Bank Account) used to receive payments for a specific property. Each property has only one bank account record (if one already exists, submitting will update the existing record by its id).

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Account Name | `account_name` | Text | Yes (class `required`) | |
| 2 | Account Number | `account_number` | Text | Yes | |
| 3 | Bank Swift | `bank_swift` | Text | Yes | |
| 4 | Country | `country_id` | Select (list of Countries) | Yes | |
| 5 | Currency | `currency_id` | Select (list of Currencies) | Yes | |
| 6 | Mode of Payment | `payment_method_id` | Select (list of PaymentMethods) | Yes | |

Default field values are populated from the existing `VillaBankAccount` record for `villa_id` (if any).

## Functions / Actions
- "Save" button — saves to the `VillaBankAccount` table (creates new, or updates the existing record for `villa_id`); writes an Activity Log entry; displays a flash message; redirects to `property/list/{base64(villa_id)}`.
- "Cancel" button — returns to the Property list (`property/list`).

## Navigation
- Opened from: the Property detail page (Property list/identification — outside the scope of the current spec).
- Navigates to: `property/list/{villa_id}` after a successful save or when Cancel is clicked.
- Child popup: none.
