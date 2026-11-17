# PROP-019 — Add New Photo Shoot Schedule

**Type:** Full page
**Route:** property/new-shooting
**Module:** PROP = Properties

## Overview
Form for creating a new photo shoot schedule (Photography) for a Property/Residence/Unit, selecting a photographer (Service Provider of the photography type), the shoot date, and notes. This is the legacy version of the feature, independent from the new "Photography Planning" workflow (PROP-026).

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 | Yes (class `required`) | Changing the value reloads Residence/Unit/Property/Photographer for that BU via AJAX |
| 2 | Entry Level | `entry_level` | Select2 (Residence/Unit/Property) | Yes | Controls which fields are displayed below |
| 3 | Residence | `residence_id` | Select2 | Yes (when entry_level=residence) | Shown/hidden based on entry_level |
| 4 | Unit | `unit_id` | Select2 | Yes (when entry_level=unit) | Shown/hidden based on entry_level |
| 5 | Property | `villa_id` | Select2 | Yes (when entry_level=property) | Shown/hidden based on entry_level |
| 6 | Photographer | `service_provider_id` | Select2 (ServiceProvider of type villa_services_id=6) | Yes | List filtered by Business Unit |
| 7 | Shoot Date | `date` | Text (date picker) | No | Converted to `Y-m-d` on submit |
| 8 | Comment | `comment` | Textarea | Yes (class `required`) | |

## Functions / Actions
- "Save" button — submits the form, saving to the `Photography` table (and `PhotographDetail` if entry_level=property); automatically sets `created_by` to the logged-in user's name.
- "Cancel" button (`type=reset`) — resets the form.
- After saving, displays a success/error flash message and redirects to `Property::shootings`.
- Changing Business Unit automatically triggers 3 AJAX calls: `common/getBusinessUnitVilla`, `property/getResidence`, `common/getUnits`, `property/getPhotographer` to reload the dependent dropdowns.

## Navigation
- Opened from: PROP-026 (Photography Planning) — "New Photo Shoot" button; can also be opened directly from the legacy Photography menu.
- Navigates to: `Property::shootings` (photo shoot schedule list — outside the scope of the current spec) after saving.
- Child popup: none.
