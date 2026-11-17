# USR-013 — Add Agent

**Type:** Full page

**Route:** `UserController::addAgents()` — default `user/addAgents`

**Module:** Login & System Users

## Overview
A form for creating a new sales Agent account, including personal information, login credentials, operating area, and the agent's activity status.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | First Name | `first_name` | Text | Yes | Minimum 2 characters |
| 2 | Family Name | `family_name` | Text | Yes | |
| 3 | Usage Name | `usage_name` | Text | Yes | |
| 4 | Company Name | `company_name` | Text | Yes | |
| 5 | Avatar/Emoticon | `emoticon` | Hidden (emoji picker) | No | |
| 6 | Language | `language` | Select2 | Yes | English/French |
| 7 | Email | `email` | Email | Yes | Duplicate check via `checkemail` ajax call |
| 8 | Username | `username` | Text | Yes | Duplicate check via `checkUserName` ajax call |
| 9 | Password | `password` | Password | Yes | |
| 10 | Phone Number | `phone_number` | Text | Yes | |
| 11 | Geographic Area | `geo_graphical_location` | Select2 | Yes | China/Phuket/Thailand/Other |
| 12 | Contact Date | `contact_date` | Text (date picker) | Yes | |
| 13 | Activity Status | `status` | Select | Yes | New/Top Performer/Active/Occasional/Dormant |
| 14 | Notes | `note` | Textarea | Yes | |
| 15 | Send Account Email | `send_mail` | Checkbox | No | |

## Functions / Actions
- **Save:** creates a `User` record (employment=Agent) plus an `Agent` record, sends an account email if selected, and logs the activity.
- **Cancel:** returns to USR-012.

## Navigation
- Opened from: USR-012 (the "Add New" button).
- Navigates to: USR-012 (Agent List) after a successful save.
