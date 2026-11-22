# PROP-056 — Shoot History

**Type:** Full page
**Route:** property/logs
**Module:** PROP = Property Records

## Overview
Page for looking up the log of completed Photography activities, filterable by Business Unit, Entry Level (Property/Residence/Unit), and the specific Residence/Unit/Property. Displays activity type, name, date, and comments.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 | Yes (class `required`) | Changing value → updates the query, saved to cookie |
| 2 | Entry Level | `entry_level` | Select2 (Property/Residence/Unit) | Yes | Controls display of the corresponding field |
| 3 | Residence | `residence_id` | Select2 | Yes (when Entry Level applies) | |
| 4 | Unit | `unit_id` | Select2 | Yes (when Entry Level applies) | |
| 5 | Property | `villa_id` | Select2 | Yes (when Entry Level = Property) | |

### Displayed Columns
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Type | `type` | Photography activity type |
| 3 | Name | `name` | |
| 4 | Date | `date` | |
| 5 | Comment | `comment` | |
| 6 | Actions | — | View details icon |

## Functions / Actions
- Changing filters (Business Unit/Entry Level/Residence/Unit/Property) → reloads the corresponding log list.
- Actions icon on each row → view details of the related Photography activity (related to PROP-026 Photography Plan, PROP-028 Photo Quality Score).

## Navigation
- Opened from: Shoots menu (outside the scope of the current code).
- Navigates to: No navigation to another page within scope (only filters data in place); related to PROP-026, PROP-027, PROP-028 data.
- Child popup: None.
