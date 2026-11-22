# USR-021 — New Wage Rule

**Type:** Full page

**Route:** `UserController::addPayrollRules()` — default `user/addPayrollRules`

**Module:** Sign-in & Workforce

## Overview
A form for creating a new daily wage calculation rule based on legal entity, nationality, and months of seniority.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Legal Entity | `company_id` | Select2 | Yes | |
| 2 | Nationality Type | `nationality_type` | Select2 | Yes | All/Equal To/Different From |
| 3 | Nationality | `nationality[]` | Select2 multiple | Required if nationality type is not "All" | Hidden when "All" is selected |
| 4 | Seniority Type | `seniority_type` | Select2 | Yes | Less than/Equal to or More than/Between |
| 5 | Number of Months (from) | `seniority_value1` | Number | Yes | |
| 6 | Number of Months (to) | `seniority_value2` | Number | Required if type = Between | Only shown when "Between" is selected |
| 7 | Wage Amount (SGD) | `wage_amount` | Text (number, with thousands separator formatting) | Yes | |

## Functions / Actions
- **Save:** creates a new `PayrollRule` record, recording the creator.
- **Cancel:** returns to USR-020.

## Navigation
- Opened from: USR-020 (the "Add New" button).
- Navigates to: USR-020 (Wage Rules) after a successful save.
