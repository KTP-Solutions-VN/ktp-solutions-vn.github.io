# OWN-003 — Edit Owner

**Type:** Full page

**Route:** `/Owner/edit/{tab}/{id}/{show_page}/{payment_detail_id}` (controller `Owner`, action `edit($tab, $id, $show_page, $payment_detail_id)`)

**Module:** Owner Management (Admin)

## Overview

A comprehensive management screen for an existing owner, organized into tabs on a single page: Owner Details, Owned Villas, Payment Details (bank), Co-owner, and Co-owner Payment Details. The `$tab` URL parameter determines which tab is active on page load; `$show_page` (list/add/edit) determines whether the list or the add/edit form is displayed within the payment tab.

## Detailed Description

### Tab "Owner Details" (`owner-details`)

Identical field set to OWN-002 (Add New Owner), but pre-populated with data for editing, and with the "Send Password Email" field hidden.

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | First Name | `first_name` | Text | Yes | |
| 2 | Family Name | `family_name` | Text | Yes | |
| 3 | Nationality | `nationality` | Select2 | Yes | |
| 4 | Email | `email` | Text (email) | Yes | |
| 5 | Username | `username` | Text | Yes | |
| 6 | Password | `password` | Password | Yes | Displays the current password after decoding |
| 7 | Phone Number | `phone_number` | Text | No | |
| 8 | Status | `status` | Select | Yes | |
| 9 | Type | `company_name` | Radio | Yes | |
| 10 | Role | `role` | Radio | Yes | |
| 11 | Module Access | `user_role[]` | Checkbox | Conditional | |
| 12 | Business Unit | `business_units[]` | Select2 (multiple rows) | Yes | |
| 13 | Language | `language_id` | Select | Yes | |
| 14 | Access Portal | `access_portal[]` | Checkbox | Yes | |
| 15 | Avatar | `upload` | Image file | No | |
| 16 | Add Co-owner | "Add Co-owner" button | Button | — | Dynamically generates an additional co-owner form |

### Tab "Properties" (`owner-properties`)

List of villas owned, displayed as cards, not a table.

| # | Column Name | Field Code | Data Type | Notes |
|---|---|---|---|---|
| 1 | Villa Image | `villa_image` | Image | Front-facing image; defaults to no-image |
| 2 | Villa Name | `name` | Text (link) | If the villa is open (`status = Open`), clicking opens the villa detail page (new tab); if closed, it is not clickable |

### Tab "Payment Details" (`payment-details`, shares the same element for the primary owner)

- List mode (`show_page=list`): a table of the owner's bank accounts.

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
| 9 | Payment Preference | `payment_type` | Text (Primary/Secondary) | |
| 10 | Document | `document` | Link to view file | |
| 11 | Actions | — | Edit / Delete | |

- Add/edit mode (`show_page=add|edit`): form for entering payment details.

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Payment Type | `payment_method_id` | Select | Yes | |
| 2 | Bank Name | `bank_name` | Text | Yes | |
| 3 | Swift Code | `bank_swift` | Text | Yes | |
| 4 | Country | `country_id` | Select | Yes | |
| 5 | Currency | `currency_id` | Select | Yes | |
| 6 | Account Name | `account_name` | Text | Yes | |
| 7 | Account Number | `account_number` | Text | Yes | |
| 8 | Attached Document | `document` | File (image/PDF) | No | Max 5MB |
| 9 | Preference | `payment_type` | Checkbox (Primary/Secondary) | Yes | |

### Tab "Co-owner" (each co-owner has its own form, generated dynamically based on count)

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | First Name | `first_name` | Text | Yes | |
| 2 | Family Name | `family_name` | Text | Yes | |
| 3 | Email | `email` | Text (email) | Yes | |
| 4 | Language | `language_id` | Select | Yes | |

### Tab "Co-owner Payment Details" (`co-owner-payment-details-{n}`)

Field structure identical to the primary owner's "Payment Details" tab (list/add/edit), applied per co-owner.

## Functions / Actions

- **Save** (each tab has its own Save button): saves the data for the corresponding tab, logs the activity, and redirects back to the tab that was just saved.
- **Cancel**: returns to OWN-001 (Owner List).
- **+ Add Business Unit**: adds a business unit selection row in the Owner Details tab.
- **+ Add Co-owner**: adds a new co-owner form (Owner Details tab).
- **+ Payment Details / Edit / Delete** (in the Payment Details and Co-owner Payment Details tabs): switches between the list and the add/edit form on the same screen (via the `show_page` parameter).

## Navigation

- Opened from: OWN-001 (house/dollar/pencil icon on each row), OWN-002 (after a successful add).
- No separate child popups — all sub-actions (add/edit villa, add/edit payment, add/edit co-owner) occur on the same page via the tab/show_page parameters.
- Cancel: returns to OWN-001.
