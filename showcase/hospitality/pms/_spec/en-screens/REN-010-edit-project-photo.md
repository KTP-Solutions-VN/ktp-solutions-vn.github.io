# REN-010 — Edit Progress Photo

**Type:** Full page
**Route:** renovation/editPhoto/:id + dashed-style route: renovation/edit-photo/:id (id passed as base64)
**Module:** REN = Refurbishment

## Overview
Form for editing an existing progress photo in the project's photo gallery: the photo can be replaced, or only the caption updated.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Photo | `photo` | Image upload (jpg/jpeg/png) | No | If no new photo is selected, the existing `image_name` is kept |
| 2 | Caption | `legend` | Text | Yes | Pre-filled with the current value |

## Functions / Actions
- **Update**: saves the `RenovationPhoto` record (new photo if provided, otherwise the existing photo is kept) along with the caption.

## Navigation
- Entered from: the "Edit" icon in the photo gallery on REN-003 — Project Timeline.
- Leads to: after successfully saving, returns to REN-003 — Project Timeline.
