# CS-006-P1 — Add/Edit/Delete Residence Popup

**Type:** Popup (opened from CS-006)

**Route:** Bootstrap Modal (`#exampleModal`, `multipart/form-data` form) within `residences.ctp`; submits to the same action `CommonSettingController::residences()`; loads Region/District/Area based on the parent level via AJAX `getData()` — `/common-setting/get-data`.

**Module:** CS = Common Lookup Settings

## Overview
A shared popup for Adding/Editing/Deleting a Residence, comprising 4 cascading geographic selection levels, contact information, and a cover image upload.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country | `country` | Select | Yes | Cascades to load Region |
| 2 | Region | `region` | Select (dependent on Country) | Yes | Cascades to load District |
| 3 | District | `district` | Select (dependent on Region) | Yes | Cascades to load Area |
| 4 | Area | `area` | Select (dependent on District) | Yes | |
| 5 | Residence Internal Name | `name` | Text | Yes | |
| 6 | Official Name | `official_name` | Text | No | |
| 7 | Residence Phone Number | `residence_phone_number` | Text | Yes | |
| 8 | Residence Email | `residence_email` | Email | Yes | Validates email format |
| 9 | Residence Code | `residence_code` | Text, max 3 characters | No | `maxlength="3"` |
| 10 | Residence Image | `image` | File upload (drag-and-drop or file picker), JPG/PNG, recommended 3:2 ratio | No | Includes a button to remove the selected/current image (`remove_image`); server verifies the actual MIME type before saving |
| 11 | Action (hidden) | `action` | Hidden | — | |
| 12 | ID (hidden) | `id` | Hidden | — | |

## Functions / Actions
- **Save/Update/Delete:** submits `popup_form` (multipart, supports file upload); if the combination of Country+Region+District+Area+Name duplicates another record, an error is shown and the record is not saved.
- **Remove selected/existing photo:** removes the image selected in the popup or marks the current image for removal when editing.
- **Cancel:** closes the modal.

## Navigation
- Opened from: CS-006 (Residence list).
- After submission: returns to CS-006 with a flash message.
