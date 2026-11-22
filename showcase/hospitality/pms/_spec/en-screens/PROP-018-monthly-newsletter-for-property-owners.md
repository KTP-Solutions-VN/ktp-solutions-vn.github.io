# PROP-018 — Owner Bulletins

**Type:** Full page
**Route:** property/monthly-report
**Module:** PROP = Property Records

## Overview
Screen for managing monthly newsletters sent to Business Units, organized by month/year and language. Supports adding, copying, editing, and deleting newsletters; a single newsletter can be assigned to multiple Business Units at once (each Business Unit may use only one newsletter per period + language combination).

## Detailed Description

### Filters / Toolbar
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Period (month + year) | `month`, `year` (hidden, set via a calendar-style month picker UI) | Custom month/year dropdown | No | Future months cannot be selected; stored in the `monthly_newsletter_month`/`monthly_newsletter_year` cookies |
| 2 | Language | `language` | Select (list of `Language`) | No | Stored in the `monthly_newsletter_lang` cookie |
| 3 | Business Unit | `business_unit` | Select (includes empty "All Business Units") | No | Stored in the `property_business_unit_id` cookie; changing the value auto-submits the search |

### Newsletter List (`mm-entry` card)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | No. | — | Number | No | |
| 2 | Newsletter Name | `name` | Text | No (display) | |
| 3 | Updated On / By | `formatted_date`, `updated_by_name` | Text | No | |
| 4 | Language | `language` | Text (badge) | No | |
| 5 | Applicable Business Units | `business_unit_ids` (maps buId→rowId) | List of pills | No | Each newsletter can apply to multiple BUs (each BU has its own record in the `MonthlyNewsLetter` table, grouped by identical content) |
| 6 | Newsletter Content | `text` | Content textarea (truncated, with a "Read full newsletter" button) | No | |

## Functions / Actions
- "Add Newsletter" button → opens modal `#exampleModal1` (Add New Newsletter): fields for Period, Language, Name, a Business Unit checkbox list (`business_unit_ids[]`, disabling BUs that already have a newsletter for the same period + language), and Text (content, with word count).
- "Edit" button (pencil icon) on each newsletter → opens modal `#exampleModal3` (Edit): similar to Add, but includes `original_bu_map` to compare added/removed BUs.
- "Copy" button (copy icon) → creates a new duplicate with the same content (name suffixed with "-Copy") via AJAX POST to the `monthlyReport` action, submitting `save`.
- "Delete" button (trash icon) → opens confirmation modal `#exampleModal` (deletes all related records per `business_unit_ids`).
- Add submit (`save`): saves one `MonthlyNewsLetter` record per selected Business Unit.
- Edit submit (`edit`): updates/adds/deletes records based on the selected BU list compared to `original_bu_map`.
- Delete submit (`delete`): deletes records per `all_ids`.

## Navigation
- Opened from: the Property Records menu (outside the scope of the current spec).
- Navigates to: no navigation — all CRUD actions occur in place, redirecting back to `monthlyReport` after saving.
- Child popup: Add modal (`#exampleModal1`), Edit modal (`#exampleModal3`), Delete confirmation modal (`#exampleModal`) — all shared modals within the same file, not documented as separate codes per the defined scope (only PROP-030 has a separately coded child popup).
