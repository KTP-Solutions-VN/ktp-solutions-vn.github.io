# VID-001 — Video Library

**Type:** Full page

**Route:** `VideosController::index()` — default `/videos`

**Module:** Videos

## Overview
A page for managing all operational videos (guide videos by property or by country), displayed as a card grid with previews, filterable by tab, Business Unit/property or country, video type, and marking which video is shown on the Guest Portal.

## Detailed Description

Filters & tabs:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Tab | `category` | Tab: Property videos / Country videos | — | Switching tabs also changes the filters below |
| 2 | Business Unit | `video-bu-filter` | Select | No | Shown only on the Property tab |
| 3 | Property | `video-property-filter` | Select (dependent on Business Unit) | No | Shown only on the Property tab |
| 4 | Country | `video-country-filter` | Select | No | Shown only on the Country tab |
| 5 | Video type | `video-type-chips` | Multi-select chips (Discover the villa/Arrival/Departure/Equipment/Troubleshooting, or Marketing/Rules/Local Guide/Training) | No | Categories differ by tab |
| 6 | Search | `video-search-input` | Text search | No | Searches by title/description |

Information shown on each video card: preview, language, duration, video type, title, description, applicable property/country, tone (Factual/Humoristic), Guest Portal status, author & date, and Download/Edit/Delete buttons (Edit/Delete shown only if `can_manage`).

## Functions / Actions
- **New video:** opens the VID-001-P1 popup (Add video).
- **Edit (pencil icon):** opens the VID-001-P2 popup (Edit video) with the corresponding video's data.
- **Delete (trash icon):** opens the VID-001-P4 delete confirmation popup.
- **Play (play icon on the card):** opens the VID-001-P3 popup (View video) to play the video directly in the modal (streamed via the `play` action).
- **Download:** downloads the video file (`download` action, no view).
- **Guest Portal toggle (Property videos only):** directly turns the Guest Portal representative video for that property on/off via AJAX `toggleGuestPortal` (each property has only 1 Guest Portal video).

## Navigation
- Accessed from: Setting menu → Video Library.
- Navigates to: VID-001-P1 (Add), VID-001-P2 (Edit), VID-001-P3 (View), VID-001-P4 (Delete confirmation).
