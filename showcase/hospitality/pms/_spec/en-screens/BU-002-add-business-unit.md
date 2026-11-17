# BU-002 — Add Business Unit

**Type:** Full page

**Route:** `BusinessUnitController::add()` — default `/business-unit/add`

**Module:** Business Unit

## Overview
A form for adding a new business unit, including contact information, geographic location, legal-entity configuration, default currency, and avatar/logo images.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit Name | `name` | Text | Yes | Minimum 2 characters |
| 2 | Short Name | `short_name` | Text | Yes | Minimum 2 characters |
| 3 | Phone Number | `phone_number` | Text | No | |
| 4 | Email | `email` | Email | Yes | |
| 5 | Address | `address` | Text | No | |
| 6 | Beds24 API Key | `beds_24_api_key` | Text | No | Connection key for the Beds24 OTA |
| 7 | Country | `country_id` | Select | Yes | Dynamically loads the list of Regions for the selected country (AJAX) |
| 8 | Region/State | `region_id` | Select | Yes | Depends on the selected country |
| 9 | Default Currency | `currency_id` | Select | Yes | |
| 10 | Legal Entity | `company_id` | Select | No | |
| 11 | Legal Entity Branch | `subsidiary_id` | Select | No | Dynamically loads based on the selected legal entity (AJAX) |
| 12 | Default Airbnb | `default_airbnb` | Select | Yes | List of channels whose name contains "Airbnb" |
| 13 | Ownership Type | `ownership` | Select (`Azura Stays` / `Partner`) | Yes | |
| 14 | Avatar Image | `image` / `cropped_image` | Image file (crop) | No | Uploaded to the `villas` folder, supports cropping before saving |
| 15 | Logo | `logo` | Image file | No | Uploaded to the `business-unit-logo` folder |

## Functions / Actions
- **Save:** validates the data, uploads the image/logo, saves the `BusinessUnit` record, logs the activity, displays a success flash message, and navigates back to BU-001.
- **Cancel/Back:** returns to BU-001 without saving.
- Duplicate business unit name is checked via the `checkBusinessUnit` action (AJAX, not a separate screen).

## Navigation
- Opened from: BU-001 ("Add new" button).
- After saving: returns to BU-001.
