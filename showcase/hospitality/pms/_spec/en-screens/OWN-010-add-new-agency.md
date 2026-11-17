# OWN-010 — Add New Agency

**Type:** Full page

**Route:** `/Owner/agency` (controller `Owner`, action `agency($tab = null, $agency_id = null, $show_page = null, $payment_detail_id = null)`, when `agency_id` is not supplied)

**Module:** Owner Management (Admin)

## Overview

A form for creating a new Agency in the system, consisting of 2 tabs: "Agency Details" (agency information) and "Payment Details" (payment information — only usable after the first tab has been saved, since it requires an `agency_id`). The same action also handles editing when `agency_id` is present (see OWN-011), but under the default route (no parameters) this is the add-new screen.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Agency Name | `agency_name` | Text | Yes | Minimum 2 characters |
| 2 | Short Name | `short_name` | Text | Yes | Minimum 2 characters |
| 3 | Status | `status` | Radio (Active/Inactive) | Yes | |
| 4 | Start Date | `start_date` | Date picker (dd-mm-yyyy) | Yes | |
| 5 | Country | `country` | Select | Yes | |
| 6 | Logo | `logo` / `cropped_image` | Image file (auto-crop 1:1 ratio) | No | Max 1MB |
| 7 | Email | `email` | Text (email) | Yes | |
| 8 | Website | `website` | Text | Yes | |
| 9 | Phone Number | `phone_number` | Text | No | |
| 10 | Business Unit | `business_units[]` | Select, supports multiple rows (button "+ Add Business Unit") | Yes | |
| 11 | Default Language | `language_id` | Select | Yes | |

## Functions / Actions

- **Save** (Agency Details tab): saves `Agency` and `UserBusinessUnit` records; logs the activity; after saving, switches to OWN-011 (Edit Agency) on the "agency_payment_details" tab, `show_page=agencyList`.
- **Cancel**: returns to OWN-009 (Agency List).
- Payment Details tab: not usable on the Add New screen (requires `agency_id`; only becomes active after saving and switching to OWN-011).

## Navigation

- Opened from: OWN-009 ("+ Add New" button).
- After a successful save: switches to OWN-011 — Edit Agency (Payment Details tab).
- Cancel: returns to OWN-009.
