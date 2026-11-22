# BU-003 — Edit Operating Unit

**Type:** Full page

**Route:** `BusinessUnitController::edit($id)` — default `/business-unit/edit/{id_base64}`

**Module:** Operating Units

## Overview
A form for editing an existing business unit's information — the same set of fields as BU-002 (Add), pre-populated with data from the existing record.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit Name | `name` | Text | Yes | |
| 2 | Short Name | `short_name` | Text | Yes | |
| 3 | Phone Number | `phone_number` | Text | No | |
| 4 | Email | `email` | Email | Yes | |
| 5 | Address | `address` | Text | No | |
| 6 | Beds24 API Key | `beds_24_api_key` | Text | No | |
| 7 | Country | `country_id` | Select | Yes | Default value = current country |
| 8 | Region/State | `region_id` | Select | Yes | List of Regions is pre-queried based on the current `country_id` |
| 9 | Default Currency | `currency_id` | Select | Yes | |
| 10 | Legal Entity | `company_id` | Select | No | |
| 11 | Legal Entity Branch | `subsidiary_id` | Select | No | List of branches is pre-queried based on the current `company_id` |
| 12 | Default Airbnb | `default_airbnb` | Select | Yes | |
| 13 | Ownership Type | `ownership` | Select (`Azura Stays` / `Partner`) | Yes | |
| 14 | Avatar Image | `image` / `cropped_image` | Image file (crop) | No | If no new image is selected, the existing image is retained |
| 15 | Logo | `logo` | Image file | No | If no new image is selected, the existing logo is retained |

## Functions / Actions
- **Save:** updates the `BusinessUnit` record, logs the activity, displays a success flash message, and navigates back to BU-001.
- **Cancel/Back:** returns to BU-001 without saving.
- If the `id` is invalid or the record cannot be found: an error is displayed and the user is returned to the previous page.

## Navigation
- Opened from: BU-001 (Edit icon on each row).
- After saving: returns to BU-001.
