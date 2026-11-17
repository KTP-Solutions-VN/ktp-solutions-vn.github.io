# BU-021 — Edit Bank

**Type:** Full page

**Route:** `BusinessUnitController::editBank($id)` — default `/business-unit/edit-bank/{id}` (id base64-encoded)

**Module:** Business Unit

## Overview
A form for editing the information of an existing bank — the same set of fields as BU-020 (Add Bank), pre-populated with existing data.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Full Name | `name` | Text | Yes | |
| 2 | BIC/SWIFT | `bic_swift` | Text | Yes | |
| 3 | Short Name | `short_name` | Text | Yes | |
| 4 | Account Number Format | `account_formatting` | Text | Yes | |
| 5 | Address | `address` | Text | No | |
| 6 | Country | `country_name` | Select (select2) | Yes | |
| 7 | Logo | `logo` / `cropped_image` | Image file (1:1 crop, ≤1MB) | No | Keeps the existing logo if no new image is selected |

## Functions / Actions
- **Save:** updates the `Bank` record, logs the activity.
- **Cancel:** returns to BU-019 without saving.

## Navigation
- Opened from: BU-019 (bank list) — Edit icon on each row.
- After saving: redirects back to BU-019.
