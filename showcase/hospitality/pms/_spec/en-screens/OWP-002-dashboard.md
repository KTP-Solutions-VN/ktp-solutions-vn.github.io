# OWP-002 — Dashboard

**Type:** Full page

**Route:** `ExternalUserController::dashboard()` — no dedicated friendly route (accessed via `/external-user/dashboard`, CakePHP default)

**Module:** Owner Portal

## Overview

Welcome page displayed after login, showing the system logo and a greeting to the user (Owner). Currently has no widgets or statistics — it is a static introductory page only.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Dashboard logo image | — | Static image | — | Only shown when user_type is not "Employee" |
| 2 | Greeting | user.first_name | Display text | — | "Welcome Back {first_name}" |
| 3 | Short description | — | Static text | — | Introduces the portal's functionality |

## Functions / Actions

- No business action buttons; display-only content

## Navigation

- Accessed from the main menu after login
- No navigation to any sub-screen from here (only via the general menu)
