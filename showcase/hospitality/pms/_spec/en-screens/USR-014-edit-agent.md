# USR-014 — Edit Agent

**Type:** Full page

**Route:** `UserController::editAgents($id)` — default `user/editAgents/:id`

**Module:** Login & System Users

## Overview
A form for editing an existing Agent's information, with the same fields as USR-013 but pre-populated with the current values.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | ID (hidden) | `id` | Hidden | — | The agent's `user_id` |
| 2 | First Name | `first_name` | Text | Yes | |
| 3 | Family Name | `family_name` | Text | Yes | |
| 4 | Usage Name | `usage_name` | Text | Yes | |
| 5 | Company Name | `company_name` | Text | Yes | |
| 6 | Avatar/Emoticon | `emoticon` | Hidden (emoji picker) | No | |
| 7 | Language | `language` | Select2 | Yes | |
| 8 | Email | `email` | Email | Yes | |
| 9 | Username | `username` | Text | Yes | |
| 10 | Password | `password` | Password | Yes | Displays the current password (decoded from base64 `legecy_key`) |
| 11 | Phone Number | `phone_number` | Text | Yes | |
| 12 | Geographic Area | `geo_graphical_location` | Select2 | Yes | |
| 13 | Contact Date | `contact_date` | Text (date picker) | Yes | |
| 14 | Activity Status | `status` | Select | Yes | |
| 15 | Notes | `note` | Textarea | Yes | |
| 16 | Send Account Email | `send_mail` | Checkbox | No | |

## Functions / Actions
- **Save:** updates the `User` and `Agent` records, resends the email if selected, and logs the activity.
- **Cancel:** returns to USR-012.

## Navigation
- Opened from: USR-012 (Edit icon).
- Navigates to: USR-012 (Agent List) after a successful save.
