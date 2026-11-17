# PROP-039 — Property Additional Guest Services (Villa Extra)

**Type:** Full page
**Route:** property/villa-extras/:villa_id (villa_id passed base64-encoded), opened from PROP-021 ("Villa Extra" icon)
**Module:** PROP = Properties

## Overview
Page for declaring descriptions of additional guest services/amenities for a property, by language: kids' services, vehicle rental, chef, breakfast, deliveries, excursions, and other extras. Data is stored in the `VillaExtra` table, with each field serialized by language code.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language`/`language_why_here` | Select (en/fr/zh) | Yes (class `required`) | Changing the language → JS reloads the content for the saved language |
| 2 | Kids | `kids` | Textarea (multilingual) | No | |
| 3 | Vehicle Rental | `vehicle_rental` | Textarea (multilingual) | No | |
| 4 | Chef | `chef` | Textarea (multilingual) | No | |
| 5 | Breakfast | `breakfast` | Textarea (multilingual) | No | |
| 6 | Deliveries | `deliveries` | Textarea (multilingual) | No | |
| 7 | Excursions | `excursions` | Textarea (multilingual) | No | |
| 8 | Other Extras | `other_extras` | Textarea (multilingual) | No | |

## Functions / Actions
- "Save" button (`why_here_form_1`) — submits the form, saving to the `VillaExtra` table (inserts if no record exists for `villa_id`, otherwise updates), displays a success/error flash message, then redirects back to the same page.
- Changing the language — updates the textareas with the content saved for that language (JS, no page reload).

## Navigation
- Opened from: PROP-021 (Properties Pending Onboarding Action List) — "Villa Extra" icon.
- Navigates to: none (saves in place and redirects back to itself).
- Child popup: none.
