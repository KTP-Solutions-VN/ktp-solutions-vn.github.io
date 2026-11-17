# PROP-059 — Photography Schedule List (Shootings)

**Type:** Full page
**Route:** property/shootings
**Module:** PROP = Properties

## Overview
Page listing all Photography schedules currently in "Pending" status (not yet completed), filterable by Business Unit, applicable across all 3 levels Property/Residence/Unit. Allows editing or deleting a photography schedule.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | No | Changing value → redirects back to the page, saved to cookie |

### Displayed Columns
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Type | `type` | Property/Residence/Unit |
| 3 | Name | `name` | Corresponding Property/Residence/Unit name |
| 4 | Photographer | `photographer_name` | Via ServiceProvider contain |
| 5 | Plan | `plan` | Planned shooting date, "Not Assigned" if not yet scheduled |
| 6 | Created | `created_by` | Creator + creation date |
| 7 | Comment | `comment` | |
| 8 | Actions | — | Edit icon (opens PROP-060), Delete icon (opens confirmation modal) |

## Functions / Actions
- Changing Business Unit → reloads the list by BU.
- Edit icon → opens PROP-060 (Edit Shooting) at `editShooting/{base64(id)}`.
- Delete icon → opens a confirmation modal, calls `deleteShooting/{base64(id)}`.

## Navigation
- Opened from: PROP-019 (Add New Shooting Schedule) or the Photography menu (outside the scope of the current code).
- Navigates to: PROP-060 (Edit Shooting — editShooting).
- Child popup: Delete confirmation modal (no dedicated code, an inline supporting operation).
