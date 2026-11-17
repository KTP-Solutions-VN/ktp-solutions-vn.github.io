# VID-001-P2 — Edit Video

**Type:** Popup (opened from VID-001)

**Route:** Static modal within `index.ctp` (`#video-edit-modal`); saves via `VideosController::edit($id)` — `POST /videos/edit/:id` (multipart/form-data)

**Module:** Videos

## Overview
Edits the metadata of an existing video in the library and optionally replaces the video file; the category/property/video type assigned initially (Property video) cannot be changed, but the list of countries (Country video) can be edited.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text (max 255 characters) | Yes | |
| 2 | Description | `description` | Textarea | No | |
| 3 | Language | `language_id` | Select | No | |
| 4 | Tone | `tone` | Segmented control: Factual / Humoristic | No | |
| 5 | Country | `country_ids[]` | Multi-select checkboxes | Yes (if Country video) | Shown only for Country-type videos |
| 6 | Replace video | `video_file` | File upload (optional) | No | If left empty, the existing file is kept |
| 7 | Date | `video_date` | Date picker | No | |

Hidden fields retaining their original values: `category`, `villa_id`, `video_type`, `duration_seconds`.

## Functions / Actions
- **Save changes:** updates the `Videos` record; if a new file is uploaded, saves the replacement file and deletes the old one; re-syncs `VideoCountries` if it is a Country video.
- **Cancel:** closes the modal without saving.

## Navigation
- Opened from: the Edit icon on each video card (shown only for users with manage permission) on VID-001.
- After saving: closes the modal, refreshes the VID-001 video grid.
