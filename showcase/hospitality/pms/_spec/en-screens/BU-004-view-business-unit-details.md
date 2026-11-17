# BU-004 — View Business Unit Details

**Type:** Full page

**Route:** `BusinessUnitController::viewDetails($id)` — default `/business-unit/view-details/{id}`

**Module:** Business Unit

## Overview
A read-only page displaying the complete information of a business unit.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit Name | `name` | Text (readonly) | — | |
| 2 | Phone Number | `phone_number` | Text (readonly) | — | |
| 3 | Email | `email` | Text (readonly) | — | |
| 4 | Address | `address` | Text (readonly) | — | |
| 5 | City | `city` | Text (readonly) | — | |
| 6 | Country | `country_id` → country name | Text (readonly) | — | |
| 7 | Region/State | `region_id` → region name | Text (readonly) | — | |
| 8 | Legal Entity | `company_id` → company name | Text (readonly) | — | |
| 9 | Postal Code | `postal_code` | Text (readonly) | — | |

## Functions / Actions
- No editing actions are available on this page (view only).
- If the record cannot be found or the `id` is missing: an error flash message is displayed and the user is returned to the previous page.

## Navigation
- Opened from: BU-001 (View icon on each row).
- Navigates to: none (terminal page; use the Back button/breadcrumb to return to BU-001).
