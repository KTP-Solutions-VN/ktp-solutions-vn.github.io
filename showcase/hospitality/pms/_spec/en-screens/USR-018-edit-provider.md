# USR-018 — Edit Contractor

**Type:** Full page

**Route:** `UserController::editProvider($id)` — default `user/editProvider/:id` (id is base64-encoded)

**Module:** Sign-in & Workforce

## Overview
A form for editing a staff account belonging to an external service provider, similar to USR-017 but pre-populated with the existing data (re-entering the password is not required).

## Detailed Description

Fields are similar to USR-017 (New Contractor): Service, Provider, First Name, Family Name, Usage Name, Nationality, Email, Username, Phone Number, Status, Access, Role, Module Permissions, Business Unit, Language, Profile Photo, Avatar — all pre-populated with the current values from the `User` record.

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | New Password | `password` | Password | No | Only updated if entered |
| 2 | (other fields) | — | — | — | Same as USR-017, pre-populated with existing data |

## Functions / Actions
- **Update (Save):** saves changes to `User` and related tables (business unit, role, language), and logs the activity.
- **Cancel:** returns to USR-016.

## Navigation
- Opened from: USR-016 (the "Edit" button on each row).
- Navigates to: USR-016 (Contractors) after a successful save.
