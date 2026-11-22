# OWN-011 — Edit Partner Agency

**Type:** Full page

**Route:** `/Owner/editAgency/{tab}/{id}/{show_page}/{payment_detail_id}` (controller `Owner`, action `editAgency($tab, $id, $show_page, $payment_detail_id)`)

**Module:** Owner Relations (Admin)

## Overview

A form for editing an existing Agency, consisting of 2 tabs: "Agency Details" (agency information — same fields as OWN-010) and "Payment Details" (list/add/edit the Agency's bank payment details, managed within this tab via the `show_page` parameter: `agencyList` = view list, `agency`/`edit` = add/edit form for a payment detail).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Agency Name | `agency_name` | Text | Yes | |
| 2 | Short Name | `short_name` | Text | Yes | |
| 3 | Status | `status` | Radio (Active/Inactive) | Yes | |
| 4 | Start Date | `start_date` | Date picker | Yes | |
| 5 | Country | `country` | Select | Yes | |
| 6 | Logo | `logo` / `cropped_image` | Image file (1:1 crop) | No | |
| 7 | Email | `email` | Text (email) | Yes | |
| 8 | Website | `website` | Text | Yes | |
| 9 | Phone Number | `phone_number` | Text | No | |
| 10 | Business Unit | `business_units[]` | Select, multiple rows | Yes | |
| 11 | Default Language | `language_id` | Select | Yes | |
| — | **Payment Details Tab — List (`show_page=agencyList`)** | | | | Table: No., Payment Method, Bank Name, Account Name, Account Number, Swift Code, Country, Currency, Preference, Document, Actions |
| 12 | Payment Method | `payment_method_id` | Select | Yes | In the add/edit payment detail form |
| 13 | Bank Name | `bank_name` | Text | Yes | |
| 14 | Swift Code | `bank_swift` | Text | Yes | |
| 15 | Country (Payment) | `country_id` | Select | Yes | |
| 16 | Currency | `currency_id` | Select | Yes | |
| 17 | Account Name | `account_name` | Text | Yes | |
| 18 | Account Number | `account_number` | Text | Yes | |
| 19 | Document | `document` | File (image/PDF) | No | |
| 20 | Preference | `payment_type` | Checkbox group (Primary/Secondary), single selection | Yes | |

## Functions / Actions

- **Save** (Agency Details tab): updates `Agency` and `UserBusinessUnit`; logs the activity; remains on OWN-011 after saving.
- **Save** (Payment Details tab, add/edit form): saves/updates the `AgencyBankAccount` record; logs the activity; returns to the payment detail list (`show_page=agencyList`).
- **+ Payment Details**: opens the add-payment-detail form (within the same tab, no separate URL/action).
- **Edit** (pencil icon, per payment row): opens the corresponding edit-payment-detail form.
- **Delete** (trash icon, per payment row): deletes the payment detail (action `deleteAgencyPaymentDetail`, no dedicated UI).
- **Cancel**: returns to OWN-009 (Partner Agencies).

## Navigation

- Opened from: OWN-009 ("Edit" icon or "Payment" icon on each row).
- Does not navigate to any other independent sub-screen (the add/edit payment form resides on this same page).
- Cancel: returns to OWN-009.
