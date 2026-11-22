# PROP-063 — Intake Record

**Type:** Full page
**Route:** property/view-onboarding/:id, opened from PROP-020 (Property Intake)
**Module:** PROP = Property Records

## Overview
Page for viewing (read-only) all entered data for a Villa Onboarding record: each Property/Unit information field with its value, the person who entered it/entry date, and the person who validated it/validation date.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Field | `data[<field>]` (field name) | Text (read-only) | — | E.g. Property Name, Short Name, Beds24 Name, Owner, Location, Unit Type, Unit... |
| 2 | Entry | `data[<field>][<field>]` | Text (read-only) | — | Entered value |
| 3 | Prepared by / On | `created_by`/`created_at` | Text (read-only) | — | |
| 4 | Validated by / On | `data[<field>][validated_by]`/`[validated_at]` | Text (read-only) | — | Blank if the field has not yet been validated |

## Functions / Actions
- View-only information, no save button.
- (Depending on permissions) may have a "Request Re-validation" button navigating to PROP-062 or calling `reviewOnBoarding` to reset validation status and request re-approval.

## Navigation
- Opened from: PROP-020 (Property Intake).
- Navigates to: PROP-062 (Intake Revalidation), or back to PROP-020 (Property Intake).
- Child popup: None.
