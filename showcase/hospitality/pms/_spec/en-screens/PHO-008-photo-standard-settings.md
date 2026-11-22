# PHO-008 — Photo Requirements

**Type:** Full page

**Route:** `PhotosController::settings()` — default route `/photos/settings`

**Module:** Photo Library

## Overview
Configures the required number of photos for each area (area/flag) by villa type (Property Type) and number of bedrooms (1–8 BR). This data is the reference source for the "Completeness Against Standard" table in PHO-007.

## Detailed Description

Filter:
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property Type | `villa_type_id` | Dropdown (`villaTypes`) | Yes | Selects a villa type to load/save the corresponding standard; defaults to the first type |

Standard table (`standardAreas`), each row is one area:
| # | Column Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Area / Flag (icon + name + note) | `areas[i][area_code]` (hidden), `areas[i][area_name]`, `areas[i][area_note]` | Text input (icon auto-detected from the area's name/code); standard areas (drone, exterior, pool_day, pool_night, living, dining, kitchen, bedrooms_bathrooms) cannot have their name/note edited (`readonly`) | Yes (name) | Custom-added areas can be freely edited/deleted |
| 2 | Required photo count for 1BR–8BR | `areas[i][requirements][1..8]` | Number input (0–999) | No | The "Total Required Photos" row auto-sums each column (readonly) |

## Functions / Actions
- **Load**: select a different Property Type and reload the corresponding standard table (GET).
- **Add Area**: add a new area row (client-side, not saved until Save is clicked).
- **Delete a custom area**: applies only to areas not part of the standard list.
- **Reset**: reloads the page, discarding unsaved changes.
- **Save Photo Standard**: saves the entire table via AJAX (`settings`, POST submit); shows a success/error message inline without leaving the page.
- **Navigation tabs**: Photo Albums (PHO-002), Shared Spaces (PHO-003), Requirements (current screen).

## Navigation
- Accessed from: PHO-002 / PHO-003 / PHO-004 / PHO-006 / PHO-007 (the "Settings" tab on the Photo Library module's shared navigation bar).
- Navigates to: no further navigation (a standalone configuration screen); the data saved here is used by PHO-007 to compute Completeness Against Standard.
