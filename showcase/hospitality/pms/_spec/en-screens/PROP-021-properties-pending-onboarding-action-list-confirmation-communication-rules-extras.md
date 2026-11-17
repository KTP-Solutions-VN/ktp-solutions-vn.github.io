# PROP-021 — Properties Pending Onboarding Action List (Confirmation/Communication/Rules/Extras)

**Type:** Full page
**Route:** property/onboarding
**Module:** PROP = Properties

## Overview
Screen listing properties currently open (status = Open), filterable by Business Unit, providing quick access to 4 supplementary Onboarding actions per property: Villa Confirmation, Villa Communication, Villa Rules, Villa Extra. Includes a delete confirmation modal and a Duplicate Property modal.

## Detailed Description

### Filter
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 (includes "All" option) | No | Changing the value → redirects to `onboarding?id=...`, saves cookie |

### Displayed Columns (`#zero_config` table)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property Type | `villa_type_id` | Text (mapped to VillaType name) | No | |
| 2 | Area | `area_id` | Text (mapped to Area name, via VillaLocation) | No | |
| 3 | Name | `name` | Text | No | |
| 4 | Owner | `owner.family_name` | Text | No | Via Owner contain |
| 5 | Status | `status` | Text | No | |
| 6 | Action | — | 4 icon buttons | — | Shown only when the user is not a Team Leader/Employee |

The list is sorted by `villa_type_id`, `area_id`, `name` (multisort).

## Functions / Actions
- "Villa Confirmation" icon (checkmark) → links to the `confirmation/{base64(villa_id)}` action.
- "Villa Communication" icon (chat bubble) → links to the `communication/{base64(villa_id)}` action.
- "Villa Rules" icon (list) → opens a modal (data-whatever) linked to the `villa-rules/{base64(villa_id)}` action.
- "Villa Extra" icon (plus sign) → links to the `villa-extras/{base64(villa_id)}` action.
- Property delete confirmation modal (`#exampleModal`) — the Delete button calls `property/delete/{base64(id)}`.
- "Duplicate Property" modal (`#exampleModal1`) — select the source Property (`villa_id`) and enter the new Property name (`name`, validated for duplicates via AJAX `checkVillaName`); submits via AJAX `duplicateProperty`, and auto-reloads the page after 5 seconds on success.
- Changing Business Unit → redirects to `onboarding?id=...`.

## Navigation
- Opened from: the Property menu (outside the scope of the current spec).
- Navigates to: `confirmation`, `communication`, `villa-rules`, `villa-extras`, `property/delete`, `duplicateProperty` (actions outside the scope of PROP-017..031).
- Child popup: Delete confirmation modal and Duplicate Property modal (not documented as separate codes, being minor supplementary scope rather than the focus of PROP-021).
