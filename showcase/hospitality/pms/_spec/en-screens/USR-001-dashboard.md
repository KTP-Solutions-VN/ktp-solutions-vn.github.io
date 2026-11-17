# USR-001 — Dashboard

**Type:** Full page

**Route:** `UserController::dashboard()` — default `user/dashboard`; friendly route: `/user/dashboard`

**Module:** Login & System Users

## Overview
The home page displayed immediately after a staff member logs in successfully (the system's default `loginRedirect` for staff/Employee accounts). Its content is currently quite minimal: it displays only the system logo (hidden for the Employee role) and a "Home" breadcrumb. This screen serves as a hub from which the user accesses other modules via the main menu.

## Detailed Description

The screen has no data-entry form; it displays only:

| # | Component | Field Code | Notes |
|---|---|---|---|
| 1 | System Logo | — | Displayed only when `user_type != Employee` |
| 2 | "Home" Breadcrumb | — | Links back to USR-001 itself |

## Functions / Actions
- There are no direct business actions on this page; navigation is handled primarily through the system's main menu (outside the scope of the two controllers covered).

## Navigation
- Entry point: LOG-001 (Login) after successful authentication (for Superadmin/Admin/Business Unit Manager accounts, the system redirects to the booking list instead of USR-001).
- Navigates to: no direct child navigation within the scope of this module.
