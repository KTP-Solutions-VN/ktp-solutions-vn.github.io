# LOG-003 — System Settings

**Type:** Full page

**Route:** `LoginController::settings()` — default `login/settings`

**Module:** Login & System Users

## Overview
A configuration form for general website/system information (site title, SEO description/keywords, admin email, outgoing email, etc.), sourced from the `Setting` table (id=1). This action is shared with USR-003 (both use the `settings()` method inherited from `LoginController`, differing only in theme/access route); however, when accessed via `/login/settings`, it renders the Login module's own template.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Site Title | `site_language` | Text | No | |
| 2 | SEO Description | `seo_description` | Text | No | |
| 3 | SEO Keywords | `seo_keywords` | Text | No | |
| 4 | Admin Email | `admin_email` | Text | No | |
| 5 | From Email | `from_email` | Text | No | |
| 6 | Title (demo) | `title2` | Text | No | Static/sample field, not yet bound to real data (leftover from the sample template) |
| 7 | Company Name (demo) | `comname1` | Text | No | Static/sample field |
| 8 | Email (demo) | `email4` | Email | No | Static/sample field |
| 9 | Contact No (demo) | `conno2` | Text | No | Static/sample field |
| 10 | Existing Customer (demo) | `radio-stacked` | Radio (Yes/No) | No | Static/sample field |

Note: The controller currently only reads `Setting::findById(1)` but does not yet bind the value to the view, and save-on-submit (POST) logic has not been implemented — this screen is currently a static UI with incomplete save logic.

## Functions / Actions
- **Save:** submit button (no save logic implemented on the controller side yet).
- **Cancel:** cancel button (a submit-type button, with no logic attached yet).

## Navigation
- Entry point: menu/route `/login/settings` (typically for the general admin area).
- Navigates to: no child navigation; a standalone screen equivalent to USR-003.
