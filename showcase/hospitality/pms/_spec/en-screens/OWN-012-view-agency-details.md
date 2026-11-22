# OWN-012 — Partner Agency Profile

**Type:** Popup (opened from OWN-009)

**Route:** `/Owner/viewAgencyDetails/{id}` (controller `Owner`, action `viewAgencyDetails($id)`)

**Module:** Owner Relations (Admin)

## Overview

A read-only detail page for an Agency: name, country, start date, status, phone number, website, email, logo, and the business unit(s) in charge.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Agency Name | `agency_name` | Text (readonly) | — | |
| 2 | Short Name | `short_name` | Text (readonly) | — | |
| 3 | Country | `country` | Text (readonly) | — | |
| 4 | Start Date | `start_date` | Date (readonly) | — | Format `Y-m-d` |
| 5 | Status | `status` | Text (readonly) | — | |
| 6 | Phone Number | `phone_number` | Text (readonly) | — | |
| 7 | Website | `website` | Text (readonly) | — | |
| 8 | Email | `email` | Text (readonly) | — | |
| 9 | Logo | `logo` | Image (readonly) | — | |
| 10 | Business Unit | `selected_user_business_unit` | Text (readonly) | — | Comma-separated list of business unit names |

## Functions / Actions

- View-only information; no edit button.

## Navigation

- Opened from: OWN-009 (eye icon "View Agency Details" on each row).
- Does not navigate further to any other sub-screen.
