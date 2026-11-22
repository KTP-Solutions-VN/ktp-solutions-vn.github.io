# PROP-054 — Report Dispatch Status

**Type:** Full page
**Route:** property/report-status
**Module:** PROP = Property Records

## Overview
Page for tracking the monthly report (Monthly Report) sending status for each Property by Business Unit: sent or not, allows marking a report as "Not Necessary" (creates a report record with `sent=True` without a file), deleting a report record, and sending the report/newsletter email to the owner.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (includes "All" option) | Yes (class `required`) | Changing value → reloads |

### Displayed Columns
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Property Name | `villa.name` | |
| 2 | Owner | `owner_name` | |
| 3 | Report Name | `name` | |
| 4 | Start | `start_date` | |
| 5 | End | `end_date` | |
| 6 | Sent On | `sent_on` | |
| 7 | Action | — | Delete icon, "Not Necessary" button (hidden `action=not_necessary`) |
| 8 | Post | — | Button to send email to the owner (`email_owner`) |

### Delete Confirmation Modal
Confirms deletion of a `MonthlyReport` record by `report_id`.

## Functions / Actions
- Changing Business Unit → reloads the list by BU.
- "Not Necessary" button — creates/marks a `MonthlyReport` record as sent (`sent = True`) even without an actual report file, used for a Property that does not need a report for that month.
- Delete icon — opens a confirmation modal, deletes the `MonthlyReport` record.
- "Post"/send email button (`email_owner`) — sends the monthly report/newsletter email to the owner in the Owner's language (using `EmailTemplate` + `MonthlyNewsLetter`).

## Navigation
- Opened from: owner reports menu (outside the scope of the current code).
- Navigates to: No navigation to another page; related to PROP-018 (Owner Bulletins), PROP-053 (Owner Reports by Unit) data.
- Child popup: Delete confirmation modal (no dedicated code, an inline supporting operation).
