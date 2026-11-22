# PROP-053 — Owner Reports by Unit

**Type:** Full page
**Route:** property/bu-reports
**Module:** PROP = Property Records

## Overview
Page for looking up the list of monthly newsletters/reports (Monthly Report) sent to owners, filterable by Business Unit and Month. Data is sourced from the `MonthlyReport` table (contains Villa, Owner).

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (includes "All" option, supports Zone) | Yes (class `required`) | Changing value → submits, saved to cookie |
| 2 | Month | `month` | Select2 (Jan-Dec) | Yes (class `required`) | Combined with the current year to form `month-yy` for the query |

### Displayed Columns
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Property Name | `villa.name` | Via Villa contain |
| 2 | Owner | `villa.owner.first_name`/`family_name` | Via Villa→Owner contain |
| 3 | Report Name | `name` | |
| 4 | Start | `start_date` | |
| 5 | End | `end_date` | |
| 6 | Sent On | `sent_on` | |
| 7 | Action | — | View/download report icon |

## Functions / Actions
- Select Business Unit + Month then submit (POST) → loads the corresponding list of sent monthly reports.
- Action icon on each row → view/download the corresponding report file (related to PROP-018 Monthly Report, PROP-024 Payment Report).

## Navigation
- Opened from: owner reports menu (outside the scope of the current code).
- Navigates to: No navigation to another page (only filters data in place); related to PROP-018 (Owner Bulletins) data.
- Child popup: None.
