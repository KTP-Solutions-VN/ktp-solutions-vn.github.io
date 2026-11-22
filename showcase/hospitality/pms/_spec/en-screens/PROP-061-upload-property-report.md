# PROP-061 — Add Monthly Report

**Type:** Full page
**Route:** property/upload-report
**Module:** PROP = Property Records

## Overview
Page for searching and uploading a report (Monthly Report) file for a specific Property, while also displaying the list of previously uploaded reports so that they can be emailed to the owner.

## Detailed Description

### Search Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | Yes (class `required`) | |
| 2 | Property | `villa_id` | Select2 | Yes (class `required`) | List of Properties for the selected BU |

### New Report Upload Form
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Report Name | `name` | Text | Yes (class `required`) | |
| 2 | Start Date | `start_date` | Datepicker | Yes | |
| 3 | End Date | `end_date` | Datepicker | Yes | |
| 4 | File | `url` | File upload | Yes | |

### Displayed Columns — Uploaded Report List
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Property Name | `villa_name` | |
| 2 | Owner | `owner_name` | |
| 3 | Report Name | `name` | |
| 4 | Start | `start_date` | |
| 5 | End | `end_date` | |
| 6 | Sent On | `sent_on` | |
| 7 | Action | — | Download/view file |
| 8 | Post | — | Send report email to owner (`email_owner`) |

## Functions / Actions
- Select Business Unit + Property → "Search" loads the list of existing reports for that Property.
- "Upload"/"Save" button — submits the form to upload a new report file, creates a `MonthlyReport` record.
- "Post" button on each row — sends the report email to the corresponding owner.

## Navigation
- Opened from: owner reports menu (outside the scope of the current code).
- Navigates to: No navigation to another page; related to PROP-018 (Owner Bulletins), PROP-053/054/055 (BU Reports/Report Status/Report Ready) data.
- Child popup: None.
