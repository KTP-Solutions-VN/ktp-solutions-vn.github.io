# SET-002 — Core Preferences

**Type:** Full page

**Route:** `SettingController::generalSettings($tab = null)` — default `/setting/general-settings/:tab` (`:tab` is a passed parameter, e.g. `/setting/general-settings/owner-portal-url`)

**Module:** SET = Platform Settings

## Overview
A general system configuration screen organized into 3 tabs: (1) Core Preferences — site information & default SMTP, (2) Channel Multiplier — conversion coefficients by Agency used for the Hostex integration, (3) Owner Hub URL — manages owner portal URLs by region/business unit.

## Detailed Description

### Tab 1 — Core Preferences (`general-settings`, element `technical-settings/general_settings`)
Form for updating the `Setting` record (id = 1):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Site Title | `site_title` | Text | Yes | |
| 2 | Admin Email | `admin_email` | Email | Yes | |
| 3 | From Email | `from_email` | Email | Yes | |
| 4 | Reply To | `reply_to` | Email | Yes | |
| 5 | SMTP Email | `smtp_email` | Email | Yes | |
| 6 | SMTP Host | `smtp_host` | Text | Yes | |
| 7 | SMTP Port | `smtp_port` | Text | Yes | |
| 8 | SMTP Password | `smtp_password` | Text | Yes | |
| 9 | Enable SMTP | `enable_smtp` | Checkbox | No | Saved as 0/1 |
| 10 | Forex Rates Website | `forex_rates_website` | Text (URL) | No | |

### Tab 2 — Channel Multiplier (`hostex-coefficient`, element `technical-settings/hostex_coefficient`)
Form for updating the conversion coefficient for an Agency:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Agency | `agency_id` | Select (Agency list where `is_hostex_account = 1`) | No | Changing the selection reloads the current `coefficient` via AJAX `getAgencyCoefficient` |
| 2 | Coefficient | `coefficient` | Text (number) | No | Saved to the `Agency` table |

### Tab 3 — Owner Hub URL (`owner-portal-url`, element `technical-settings/owner_portal_url`)
List of configured Owner Hub URLs:

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Title | `title` | |
| 2 | URL | `url` | |
| 3 | Applicable Scope | `pills` | List of "Country — Region" pairs this URL applies to; the default URL (`is_default=1`) applies to any Region not claimed by another URL |
| 4 | Updated At / By | `updated_at`, `creator.usage_name` | |

No filters; the default URL is sorted to the top, followed by `created_at` descending. Applies only to countries within {Greece, France, Singapore}.

## Functions / Actions
- **Save (Tab 1, Tab 2):** submits the corresponding form, updates `Setting`/`Agency`, logs the activity.
- **+ ADD URL:** opens popup SET-002-P1 (New Owner Hub URL).
- **Edit (pencil icon) on each URL row:** opens popup SET-002-P2 (Edit Owner Hub URL).
- **Delete (trash icon, hidden for the default URL):** opens popup SET-002-P3 (delete confirmation).
- Switching tabs updates the browser URL (`window.history.replaceState`) and the breadcrumb dynamically.

## Navigation
- Accessed from: SET-001, or Platform Settings menu > Core Preferences.
- Navigates to: SET-002-P1, SET-002-P2, SET-002-P3.
