# SET-001 — Platform Settings

**Type:** Full page

**Route:** `SettingController::dashboard()` — friendly route `/setting` (declared in `config/Routes.php` line 78); default `/setting/dashboard`

**Module:** SET = Platform Settings

## Overview
A welcome/gateway page when entering the "Platform Settings" area, displaying a banner/logo. Serves as the root page for opening the Settings submenu (Core Preferences, Outgoing Mail Server, Channel Account Mapping, etc.).

## Detailed Description
No list data or input form. Content:

| # | Component | Notes |
|---|---|---|
| 1 | Banner image | Displayed only if `user['user_type'] != 'Employee'` |

## Functions / Actions
- No business operations on this page; it serves only as the entry point of the Platform Settings menu (the submenu is shown in the sidebar via `active_menu = 1007`, `show_setting_menu = 1`).

## Navigation
- Accessed from: main menu "Platform Settings".
- Navigates to: SET-002 (Core Preferences), SET-003 (Outgoing Mail Server), SET-004 (Channel Account Mapping) via the submenu.
