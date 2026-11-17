# USR-020 — Payroll Rules List

**Type:** Full page

**Route:** `UserController::payrollRules()` — default `user/payrollRules`

**Module:** Login & System Users

## Overview
A list of payroll calculation rules by legal entity, nationality, and seniority, used as the basis for calculating the daily wage for staff.

## Detailed Description

**Filters:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Legal Entity | `legal_entity_id` | Select2 (auto-submit) | No | Defaults to "All" |
| 2 | Nationality Type | `nationality_type` | Select2 (auto-submit) | No | All/Equal To/Different From |
| 3 | Nationality | `nationality` | Select2 (auto-submit) | No | Applies only when the nationality type is not "All" |

**Displayed Columns:**

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Legal Entity | `company.name` | |
| 3 | Nationality Type | `nationality_type` | |
| 4 | Nationality | `nationality` | List of countries (JSON) |
| 5 | Seniority | `seniority_type` | Less than/Equal to or More than/Between |
| 6 | Number of Months | `seniority_value1`/`seniority_value2` | |
| 7 | Wage Amount (THB) | `wage_amount` | |
| 8 | Created Date | `created_at` | |
| 9 | Actions | — | Delete |

## Functions / Actions
- **Add New:** opens USR-021 (Add Payroll Rule).
- **Delete:** confirmation popup, calls `user/delete-payroll-rule/:base64(id)`.

## Navigation
- Entry point: Settings/Users menu → Payroll Rules.
- Navigates to: USR-021 (Add Payroll Rule).
