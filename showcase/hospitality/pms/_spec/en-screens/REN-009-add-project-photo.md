# REN-009 — Add Project Photo

**Type:** Full page
**Route:** renovation/addPhoto/:renovation_id + dashed-style route: renovation/add-photo/:renovation_id (id passed as base64)
**Module:** REN = Renovation

## Overview
Form for uploading a renovation progress photo with a caption, saved to the project's photo gallery (displayed back on REN-003).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Photo | `photo` | Image upload (jpg/jpeg/png) | Yes | Saved to `RenovationPhoto.image_name` |
| 2 | Caption | `legend` | Text | Yes | |

## Functions / Actions
- **Save**: uploads the photo and saves the `RenovationPhoto` record linked to `renovation_id`, with `created_by` set to the current user.

## Navigation
- Entered from: the "+ Add Photo" button on REN-003 — Renovation Project Follow-up.
- Leads to: after successfully saving, returns to REN-003 — Renovation Project Follow-up.
