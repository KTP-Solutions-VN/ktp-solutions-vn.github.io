# BU-020 — Add Bank

**Type:** Full page

**Route:** `BusinessUnitController::addBank()` — default `/business-unit/add-bank`

**Module:** Business Unit

## Overview
A form for adding a new bank to the shared catalog, including identifying information, account number formatting rules, and logo.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Full Name | `name` | Text | Yes | |
| 2 | BIC/SWIFT | `bic_swift` | Text | Yes | |
| 3 | Short Name | `short_name` | Text | Yes | |
| 4 | Account Number Format | `account_formatting` | Text | Yes | Pattern such as `xxx-xxxxxx-x`, where each `x` is one digit and `-` is a separator |
| 5 | Address | `address` | Text | No | |
| 6 | Country | `country_name` | Select (select2) | Yes | |
| 7 | Logo | `logo` / `cropped_image` | Image file (1:1 crop, ≤1MB) | No | Uploaded to the `bank-logos` folder |

## Functions / Actions
- **Save:** saves the `Bank` record, logs the activity.
- **Cancel:** returns to BU-019 without saving.

## Navigation
- Opened from: BU-019 (bank list) — "Add new" button.
- After saving: redirects back to BU-019.
