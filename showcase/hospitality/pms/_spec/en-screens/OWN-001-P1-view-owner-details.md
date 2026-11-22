# OWN-001-P1 — Owner Account Snapshot

**Type:** Popup (opened from OWN-001)

**Route:** `/Owner/viewDetails/{id}` (controller `Owner`, action `viewDetails($id)`)

**Module:** Owner Relations (Admin)

## Overview

A read-only display screen/frame showing the detailed information of an owner, including personal information, the business unit in charge, language, and the list of linked co-owners. Opened from the "view" icon in the OWN-001 list.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | First Name | `first_name` | Text (readonly) | — | |
| 2 | Family Name | `family_name` | Text (readonly) | — | |
| 3 | Nationality | `nationality` | Text (readonly) | — | |
| 4 | Username | `username` | Text (readonly) | — | |
| 5 | Phone Number | `phone_number` | Text (readonly) | — | |
| 6 | Password | `legecy_key` (base64-decoded) | Text (readonly) | — | Displays the password in plain text (decoded from the stored field) |
| 7 | Email | `email` | Text (readonly) | — | |
| 8 | Company | `company_name` | Text (readonly) | — | |
| 9 | Business Unit | Aggregated from `UserBusinessUnit` | Text (readonly, concatenated list) | — | |
| 10 | Language | `language_id` | Text (readonly) | — | |
| 11 | Co-owner List | `co_owner` | Sub-table: name, email, language | — | Displayed if the owner has linked co-owners |

## Functions / Actions

- View-only information; no edit/save buttons on this screen.
- If the `id` is invalid or no data is found: an error flash message is displayed and the user is returned to the previous page (`referer`).

## Navigation

- Opened from: OWN-001 (eye icon on each list row).
- Does not navigate further to any other sub-screen.
