# BOOK-073 — Season Management

**Type:** Full page (the add/edit/delete/copy popups are all part of the same view, not separate files)
**Route:** Booking/seasons (default: `/booking/seasons`)
**Pretty route:** no dedicated route found in config/Routes.php (uses the default route)
**Module:** Booking

## Overview
Page for declaring and managing rate seasons (Season: Low/Mid/High/Peak, etc.) by Region — each region has its own set of seasons shared by all villas within it. Supports manual declaration via a table, visual drag-and-drop on a timeline, quick text entry ("Smart Season Input"), and copying a season set from another region.

## Detailed Description

### Region Filter
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Region | `regions` | Select | Yes | Defaults to the region of the business unit the user currently has selected; changing the region and clicking **Load** reloads all seasons for that region (`seasons?region_id=...`) |

### "Replicate from Another Region" Block (copying seasons from another region)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Copy from | `copy_form`/`copy_from` | Select | Yes | List of regions that already have seasons declared (`copy_from`) |
| 2 | Copy to | `copy_to` | Select | Yes | List of regions that have no seasons yet (`copy_regions`) |

The **Preview** button calls the `getPreviewData` AJAX endpoint to show a preview of the content to be copied in a popup; the **Apply Copy** button calls the `copySeasonData` action (with a "Copy Season" confirmation popup before execution) to copy the entire season set from the source region to the target region.

### "Smart Season Input" Block (quick text entry)
A textarea that allows pasting/typing a quick list of seasons in the format `Season name: start date - end date` (one season per line). The **Interpret & Auto-Fill Gaps** button parses the entered content, automatically fills gaps between adjacent seasons (extending the preceding/following season, with odd days favoring the preceding season) and populates the table/timeline below; the **Clear** button clears the entered content.

### "Visual Season Timeline" Block (visual drag-and-drop)
Displays the seasons as colored blocks on a monthly timeline; the edges of a block can be dragged to adjust the season's start/end date; **← Previous / Next →** buttons scroll through months.

### Season List Table
| # | Column | Notes |
|---|---|---|
| 1 | Name | Season name (Low/Mid/High/Peak, etc.) |
| 2 | Start Date | Start date |
| 3 | End Date | End date |
| 4 | Duration | Number of days in the season |
| 5 | Auto-Fix | Note if the season was just automatically extended/shifted by the system due to deletion of an adjacent season (e.g. "Extended from ..."/"Moved from ...") |
| 6 | Actions | Edit icon (inline edit on the row), Delete icon (opens a gap-handling popup), Add icon (inserts a new season row right after the current row) |

### Delete Season Popup (handling the resulting gap)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Handling Method | `extend_season_type` | Radio (Extend the previous season / Extend the next season / Fix cut off date) | Yes | |
| 2 | Cut off date | `cut_off_date` | Date picker | Required if "Fix cut off date" is selected | The preceding season will end and the following season will start on this date |

## Functions / Actions
- **Load** — reloads the season table for the selected region
- **Preview** / **Apply Copy** — preview and execute copying seasons from another region (`copySeasonData` action, with a "Copy Season" confirmation popup)
- **Interpret & Auto-Fill Gaps** / **Clear** — process the quick text entry
- Drag block edges on the timeline to adjust season dates
- Add-row icon — inserts a new season into the table
- Edit icon — edit the season name/dates directly on the row
- Delete icon — opens a confirmation popup, choose how to handle the gap, submits with `action=delete`
- **Save** button (main form `#rates_form`) — saves all season changes for the region (bulk add/update); if an old season is found to be fully covered by a new one, the system automatically deletes the old season and warns via a flash message ("Fully covered season is ...")

## Navigation
- Opened from: BOOK-066 (Seasons button)
- Navigates to: no navigation to another page; all actions are handled directly on this page via popups/AJAX (`copySeasonData`, `getPreviewData`, `saveSeasons`, `saveInputData`)
