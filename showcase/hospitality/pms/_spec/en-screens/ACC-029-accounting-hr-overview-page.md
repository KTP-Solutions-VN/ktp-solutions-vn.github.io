# ACC-029 — Finance Summary

**Type:** Full page

**Route:** `AccountController::index()` — default `/account/index` (no parameters)

**Module:** Finance & Admin

## Overview
The "entry point" (landing page) of the Finance & Admin module. The action only sets the page title and `active_menu`, without querying or displaying any business data — the view simply shows the default dashboard logo.

## Detailed Description

This is not a list page or a form page, so there is no column/field table. View content (`Account/index.ctp`):

| # | Component | Display Condition | Notes |
|---|---|---|---|
| 1 | Dashboard logo (`VillaManagement/logo-dashboard.png`) | Shown only when `user['user_type'] != 'Employee'` | Static image, no link/action |
| 2 | "Home" breadcrumb | Always shown | Links to `User::dashboard` |

No stat cards, no list, no filters. This is essentially a placeholder/transit page for the module, without actual dashboard content (summary figures, shortcuts, etc.) yet.

## Functions / Actions
- No business action buttons on the page.
- "Home" breadcrumb: navigates to `User::dashboard`.

## Navigation
- Entered from:
  - Top header navigation — user account dropdown, **"Finance"** item (`Element/header.ctp`, shown only when `$currentController == 'Account'`) → `Account::index`.
  - Sidebar > Finance & Admin > (in the **Finance Preferences** submenu, last item) **"Summary"** (`Element/side-bar/account-sidebar.ctp`) → `Account::index`.
- Navigates to: no further links from this page itself besides the Home breadcrumb; users use the left sidebar to access other business screens in the module (Account Ledger — ACC-007, Channel Payout Matching — ACC-030, Finance Preferences — ACC-031, Company Fleet — ACC-032, ...).
