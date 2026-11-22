# BU-016 — New Office Location

**Type:** Full page

**Route:** `BusinessUnitController::addOffice()` — default `/business-unit/add-office`

**Module:** Operating Units

## Overview
A form for adding a new office: name, Business Unit, affiliated departments, address, map coordinates, and illustrative image.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Office Name | `name` | Text | Yes | |
| 2 | Business Unit | `business_unit_id` | Select (select2) | Yes | Only displays Business Units the current user has permission for |
| 3 | Department | `department_id[]` | Checkbox (multiple) | Yes | List of staff roles (excludes certain system roles) |
| 4 | Address | `address` | Text | Yes | |
| 5 | Latitude | `latitude` | Text | Yes | |
| 6 | Longitude | `longitude` | Text | Yes | |
| 7 | Google Maps URL | `map_url` | Text | Yes | |
| 8 | Image | `image` / `cropped_image` | Image file (3:2 crop ratio, ≤1MB) | No | Uploaded to the `office-image` folder |

## Functions / Actions
- **Save:** saves the `Office` record, logs the activity.
- **Cancel:** returns to BU-015 without saving.

## Navigation
- Opened from: BU-015 (Office Locations) — "Add new" button.
- After saving: redirects back to BU-015.
