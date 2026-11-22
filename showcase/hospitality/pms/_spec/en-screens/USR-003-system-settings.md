# USR-003 — Site & SEO Settings

**Type:** Full page

**Route:** `UserController` inherits `LoginController::settings()` — default `user/settings` (no dedicated friendly route; already commented out in `config/Routes.php`)

**Module:** Sign-in & Workforce

## Overview
Shares the same logic and the same `settings()` method as LOG-003, but is accessed via the `User` controller and therefore renders its own template (`Template/User/settings.ctp`). Used to configure general system information (site title, SEO, admin email, etc.).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Site Title | `site_language` | Text | No | |
| 2 | SEO Description | `seo_description` | Text | No | |
| 3 | SEO Keywords | `seo_keywords` | Text | No | |
| 4 | Admin Email | `admin_email` | Text | No | |
| 5 | From Email | `from_email` | Text | No | |
| 6 | Title (demo) | `title2` | Text | No | Static/sample field, not yet bound to data |
| 7 | Company Name (demo) | `comname1` | Text | No | Static/sample field |
| 8 | Email (demo) | `email4` | Email | No | Static/sample field |
| 9 | Contact No (demo) | `conno2` | Text | No | Static/sample field |
| 10 | Existing Customer (demo) | `radio-stacked` | Radio (Yes/No) | No | Static/sample field |

Note: as with LOG-003, the controller reads `Setting::findById(1)` but does not yet bind it to the view, and POST save handling has not been implemented.

## Functions / Actions
- **Save / Cancel:** buttons on the form, currently with no save logic attached on the controller side.

## Navigation
- Entry point: route `/user/settings` (typically used internally; no public menu link was found).
- Navigates to: no child navigation.
