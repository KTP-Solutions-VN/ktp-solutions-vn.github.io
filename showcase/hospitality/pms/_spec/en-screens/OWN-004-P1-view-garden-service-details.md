# OWN-004-P1 — Garden Visit Detail

**Type:** Popup (opened from OWN-004)

**Route:** `/Owner/gardenView/{id}` (controller `Owner`, action `gardenView($id)`)

**Module:** Owner Relations (Admin)

## Overview

A read-only detail page for a completed garden job on a villa, showing the service, the person who performed it, the start/end time, and the cleaning date. Opened from the "View Details" icon in the Garden tab of screen OWN-004.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa | `villa.name` | Text (readonly) | — | Displayed in the page title |
| 2 | Garden Service | `garden_service.name` | Text (readonly) | — | |
| 3 | Performed By | `operators_name` | Text (readonly) | — | Concatenated from the gardener list |
| 4 | Start Time | `actual_start_time` | Text (readonly) | — | |
| 5 | End Time | `actual_end_time` | Text (readonly) | — | |
| 6 | Cleaning Date | `date` | Date (readonly) | — | Format `d M y` |
| 7 | Planned | `is_planned` (displayed as `planned`) | Text (Yes/No, readonly) | — | |

## Functions / Actions

- View-only information; no edit button.

## Navigation

- Opened from: OWN-004 (Garden tab, eye icon "View Details" on each data row).
- Does not navigate further to any other sub-screen.
