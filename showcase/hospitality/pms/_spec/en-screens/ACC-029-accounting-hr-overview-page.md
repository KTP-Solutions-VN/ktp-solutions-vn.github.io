# ACC-029 — Accounting & HR Overview Page

**Type:** Full page

**Route:** `AccountController::index()` — default `/account/index` (no parameters)

**Module:** Accounting & HR

## Overview
The "entry point" (landing page) of the Accounting & HR module. The action only sets the page title and `active_menu`, without querying or displaying any business data — the view simply shows the default dashboard logo.

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
  - Top header navigation — user account dropdown, **"Accounting"** item (`Element/header.ctp`, shown only when `$currentController == 'Account'`) → `Account::index`.
  - Sidebar > Account & HR > (in the **Settings** submenu, last item) **"Menu"** (`Element/side-bar/account-sidebar.ctp`) → `Account::index`.
- Navigates to: no further links from this page itself besides the Home breadcrumb; users use the left sidebar to access other business screens in the module (Statements — ACC-007, OTA — ACC-030, Settings — ACC-031, Vehicles — ACC-032, ...).
