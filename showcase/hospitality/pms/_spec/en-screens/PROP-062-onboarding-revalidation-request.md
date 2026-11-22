# PROP-062 — Intake Revalidation

**Type:** Full page
**Route:** property/edit-on-boarding/:id, opened from PROP-020 (Property Intake)
**Module:** PROP = Property Records

## Overview
Page for reviewing already-entered Onboarding data (Property/Unit) in a Field/Entry/Prepared by/Validated by table format, allowing selection of a different Validator and resending a validation request (creating a new `NoticeBoard` notification) for the Villa Onboarding record.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Validator | `validator_id` | Hidden/Select (chosen via UI) | Yes | The person to whom the new validation request is sent |
| 2 | Field/Entry Data Table | `data[<field>]` | Text (displayed, editable) | No | Each row: field name, entered value, entered by + date, validated by + date (read-only if already validated) |
| 3 | Number of Unit | `number_of_unit` | Hidden | — | Number of Units (if the Property has multiple units) |

## Functions / Actions
- "Save"/"Send" button — submits the form, creates a `NoticeBoard` + `NoticeBoardDetail` record sending a validation request to the selected Validator (default deadline +5 days), shows a flash message, then redirects to PROP-020 (Property Intake).
- Validate individual fields (AJAX `validateOnBoarding`) — marks a field as approved by the current user; once all fields are approved, the Onboarding record status changes to "completed".

## Navigation
- Opened from: PROP-020 (Property Intake).
- Navigates to: PROP-020 (Property Intake) after saving.
- Child popup: None.
