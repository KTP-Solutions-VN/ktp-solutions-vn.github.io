# BU-022-P1 — Popup: Add/Edit Booking Platform

**Type:** Popup (opened from BU-022, Booking Platform tab)

**Route:** Static Bootstrap modal (`#platformModal`) within `channels.ctp`; submits via POST to `BusinessUnitController::channels('platforms')`.

**Module:** Business Unit

## Overview
A shared popup for adding and editing a Booking Platform, including name, illustrative image, and logo.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Platform Name | `platform_name` | Text | Yes | |
| 2 | Image | `image` / `cropped_image` | Image file (2:1 crop ratio, ≤1MB) | No | Uploaded to the `villas` folder |
| 3 | Logo | `logo` / `cropped_logo` | Image file (1:1 crop, ≤1MB) | No | Uploaded to the `chanels-logo` folder |
| 4 | Action (hidden) | `platform_action` | Hidden (`add`/`edit`) | — | |
| 5 | ID (hidden) | `platform_id` | Hidden | — | Present only when editing |

## Functions / Actions
- **Save:** saves the `BookingPlatform` record, logs the activity.
- **Cancel:** closes the modal without saving.

## Navigation
- Opened from: BU-022 (Booking Platform tab) — "Add new" button, Edit icon on each row.
- After submission: remains on BU-022 (`platforms` tab).
