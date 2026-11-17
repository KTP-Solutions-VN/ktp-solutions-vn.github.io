# VID-001-P1 — Add New Video

**Type:** Popup (opened from VID-001)

**Route:** Static modal within `index.ctp` (`#video-add-modal`); saves via `VideosController::add()` — `POST /videos/add` (multipart/form-data)

**Module:** Videos

## Overview
A form for uploading a new video into the library, assigned to a specific property or to one/multiple countries, along with classification and descriptive metadata.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Category | `category` | Segmented control: Property video / Country video | Yes | |
| 2 | Business Unit | (selected to filter property) | Select | Yes (if Property) | Not sent directly to the server |
| 3 | Property | `villa_id` | Select (dependent on Business Unit) | Yes (if Property) | |
| 4 | Country | `country_ids[]` | Multi-select checkboxes | Yes (if Country, minimum 1) | |
| 5 | Video type | `video_type` | Single-select pill list (differs by category) | Yes | Property: Discover the villa/Arrival/Departure/Equipment/Troubleshooting; Country: Marketing/Rules/Local Guide/Training |
| 6 | Guest Portal video | `guest_portal` | Checkbox | No | Applies to Property only; each property has only 1 video, enabling a new one replaces the old one |
| 7 | Video file | `video_file` | File upload (drag-and-drop or browse) | Yes | MP4/MOV/WEBM format, up to 500MB |
| 8 | Title | `title` | Text (max 255 characters) | Yes | |
| 9 | Description | `description` | Textarea | No | |
| 10 | Language | `language_id` | Select | No | |
| 11 | Tone | `tone` | Segmented control: Factual / Humoristic | No | Defaults to Factual |
| 12 | Date | `video_date` | Date picker | No | Defaults to the current date |

## Functions / Actions
- **Add to library:** uploads the file to `webroot/files/videos/{id}`, saves the `Videos` record, syncs country assignment (`VideoCountries`) or Guest Portal assignment (`VillaGuestPortalVideos`), refreshes the video grid on VID-001.
- **Cancel:** closes the modal without saving.

## Navigation
- Opened from: the "New video" button on VID-001.
- After saving: closes the modal, refreshes the VID-001 video grid.
