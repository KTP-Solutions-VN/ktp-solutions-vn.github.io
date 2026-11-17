# SET-001 — Setting Dashboard

**Type:** Full page

**Route:** `SettingController::dashboard()` — friendly route `/setting` (declared in `config/Routes.php` line 78); default `/setting/dashboard`

**Module:** SET = System Settings

## Overview
A welcome/gateway page when entering the "System Settings" area, displaying a banner/logo. Serves as the root page for opening the Settings submenu (General Settings, SMTP, Hostex Setup, etc.).

## Detailed Description
No list data or input form. Content:

| # | Component | Notes |
|---|---|---|
| 1 | Banner image | Displayed only if `user['user_type'] != 'Employee'` |

## Functions / Actions
- No business operations on this page; it serves only as the entry point of the System Settings menu (the submenu is shown in the sidebar via `active_menu = 1007`, `show_setting_menu = 1`).

## Navigation
- Accessed from: main menu "Settings".
- Navigates to: SET-002 (General Settings), SET-003 (SMTP Settings), SET-004 (Hostex Set-up) via the submenu.
