# ACC-053 — Public Holidays

**Type:** Full page

**Route:** `AccountController::publicHolidays()` — default `/account/public-holidays`

**Module:** Accounting & HR

## Overview
Manages the list of public holidays (`PublicHoliday`) by country and year — this data is used to calculate overtime (OT) pay multipliers and to drive demand-based pricing impact. Includes a monthly preview calendar with color-coding by demand impact level.

## Detailed Description

List (DataTable `#zero_config`), sorted by `date` ascending, defaulting to a filter of the current month/year and the country matching the user's Business Unit (default Thailand `id=18`):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | Sequential number, computed at runtime |
| 2 | Date | `date` | Displayed as a month/day tag |
| 3 | Description | `description` | Truncated to 50 characters + "..." if longer |
| 4 | Country | `country.name` | Shown only when viewing "all countries" (`is_selected_country = yes`, i.e. not filtered to one specific country via the filter) |
| 5 | Type | `holiday_type` (Official/Observed/Special/Company) | Color-coded by type |
| 6 | OT | `ot_multiplier` (3.0×/2.0×/1.5×/None) | |
| 7 | Demand | `demand_impact` (Peak/High/Medium/Low) | Color-coded by level |
| 8 | Actions | — | Edit, Delete |

Filter:
- **Country** (`country_id`): Thailand/France/Greece, defaults to the user's BU.
- **Year** (`year`): current year through +2 years.
- **Nature** (`nature` → `holiday_type`): Official/Observed/Special/Company, defaults to "All".
- **Salary** (`salary` → `ot_multiplier`): 3.0×/2.0×/1.5×/None, defaults to "All".
- **Demand Impact** (`demand_impact`): Peak/High/Medium/Low, defaults to "All".

Preview calendar (`vm-preview-calendar`): displayed using its own `calendar_month`/`calendar_year` (which can differ from the list filter), coloring each day by that holiday's `demand_impact` (red = Peak, orange = High, blue = Medium, brown = Low) with a color legend below the calendar.

## Functions / Actions
- **Add new:** opens ACC-053-P1 (`addPublicHoliday`).
- **Edit (pencil icon):** opens ACC-053-P2 (`editPublicHoliday/<id base64>`).
- **Delete (trash icon):** opens the `#exampleModal` confirmation modal; on confirm, submits a POST to the `publicHolidays` action itself with `action = delete`, `id`; deletes the `PublicHoliday` record (`_deleteData`).
- **Copy &lt;previous year&gt;:** calls `copyPublicHoliday($country_id)` (no dedicated view, redirects to referer) to copy all holidays from the previous year (keeping the same day/month, shifted to the current year) for the currently filtered country; if a date already exists in the current year it is overwritten. If data for the current year already exists, a warning modal is shown stating it "will be added and displayed alongside existing records" before confirmation; if the previous year has no data, an informational modal states "No public holidays are available."
- **Change preview calendar month (&lt; &gt; buttons):** changes `calendar_month`/`calendar_year` and resubmits the filter form.
- **Search:** submits the full filter set (Country/Year/Nature/Salary/Demand Impact).
- **Change Country (select2 change):** automatically submits the form as soon as a value is selected.

## Navigation
- Entered from: Sidebar > Account & HR > Public Holidays (`active_menu = acc-public-holidays`).
- Navigates to: ACC-053-P1 (Add Public Holiday), ACC-053-P2 (Edit Public Holiday), Delete action (same page, no dedicated view), Copy Public Holiday action (action `copyPublicHoliday`, no dedicated view, redirects to referer).
