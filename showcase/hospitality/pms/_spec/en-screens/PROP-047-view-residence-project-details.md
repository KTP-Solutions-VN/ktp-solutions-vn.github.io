# PROP-047 — Residence Profile

**Type:** Full page
**Route:** property/view-residence-enquiry/:residence_id/:business_unit_id
**Module:** PROP = Property Records

## Overview
Page showing detailed information for a Residence/Project: internal/official name, location (Country-Region-District-Area), the full list of Properties belonging to the Residence, and the list of Owners/Managers with contact information, grouped by each Owner.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Internal Residence Name | `name` | Text (read-only) | — | |
| 2 | Official Residence Name | `official_name` | Text (read-only) | — | |
| 3 | Country-Region-District-Area | `country_name`/`region_name`/`district_name`/`area_name` | Text (read-only) | — | Concatenated string |
| 4 | List of Properties | `owners[].villa[]` | Text list (read-only) | — | List of Property names grouped by each Owner |
| 5 | Owner N – Phone – Email | `owners[].name`/`phone_number`/`email` | Text (read-only) | — | Repeated per number of Owners (N = 1, 2, ...) |
| 6 | Manager N – Phone – Email | `owners[].manager[]` | Text (read-only) | — | Only shown if the Property has an assigned Manager (`manager_id` json) |

## Functions / Actions
- View-only information, no data entry form or save button.
- If `residence_id` is invalid or no data is found → error flash message and redirect back to PROP-046.

## Navigation
- Opened from: PROP-046 (Residences & Projects) — "View" icon.
- Navigates to: None (view-only page).
- Child popup: None.
