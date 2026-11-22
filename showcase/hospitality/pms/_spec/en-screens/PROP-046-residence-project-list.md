# PROP-046 — Residences & Projects

**Type:** Full page
**Route:** property/residence-enquiry
**Module:** PROP = Property Records

## Overview
Page listing Residences/Projects that contain at least one open Property, filterable by Business Unit. Displays district, internal/official name, Residence code, and information for the Owner with the most Properties in that Residence.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 (includes "All" option, supports Zone) | Yes (class `required`) | Changing value → reloads, saved to cookie |

### Displayed Columns
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | No. | — | Text | — | |
| 2 | District | `district_name` | Text | — | Via Residence→District contain |
| 3 | Internal (Name) | `name` | Text | — | Residence internal name |
| 4 | Official (Name) | `official_name` | Text | — | Residence official name |
| 5 | Code | `residence_code` | Text | — | |
| 6 | Owner | `owner_name` | Text | — | Owner with the most Properties in the Residence |
| 7 | Phone | `owner_phone_number` | Text | — | |
| 8 | Email | `owner_email` | Text | — | |
| 9 | Actions | — | "View" icon | — | Opens PROP-047 |

## Functions / Actions
- Changing Business Unit → reloads the Residence list.
- "View" icon (`fa-eye`) → opens PROP-047 (Residence Profile) at `viewResidenceEnquiry/:residence_id/:business_unit_id`.

## Navigation
- Opened from: Property Records menu (outside the scope of the current code).
- Navigates to: PROP-047 (Residence Profile).
- Child popup: None.
