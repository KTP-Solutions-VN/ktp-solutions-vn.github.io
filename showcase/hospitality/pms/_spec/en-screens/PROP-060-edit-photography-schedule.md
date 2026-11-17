# PROP-060 — Edit Photography Schedule (Edit Shooting)

**Type:** Full page
**Route:** property/edit-shooting/:req_id (req_id passed base64-encoded), opened from PROP-059 (Edit icon)
**Module:** PROP = Properties

## Overview
Page for editing an existing Photography schedule: change Business Unit, applicable level (Property/Residence/Unit), Photographer (Service Provider), planned shooting date, comment. Data is saved to the `Photography` table (linked to `PhotographDetail` when the level is Property).

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 | Yes (class `required`) | |
| 2 | Entry Level | `entry_level` | Select2 (Property/Residence/Unit) | Yes | Controls display of the corresponding field below |
| 3 | Residence | `residence_id` | Select2 | Yes (when Entry Level = Residence) | |
| 4 | Unit | `unit_id` | Select2 | Yes (when Entry Level = Unit) | |
| 5 | Property | `villa_id` | Select2 | Yes (when Entry Level = Property) | |
| 6 | Service Provider (Photographer) | `service_provider_id` | Select2 | Yes | Filtered by Business Unit and Photography service type |
| 7 | Date | `date` | Datepicker | No | Planned shooting date |
| 8 | Comment | `comment` | Textarea | Yes (class `required`) | |

## Functions / Actions
- "Save" button — submits the form, updates the `Photography` record by `req_id`; if Entry Level = Property, `residence_id`/`unit_id` are reset to 0 and `villa_id` is written to `PhotographDetail`, otherwise the corresponding `residence_id`/`unit_id` is updated.
- Changing Entry Level → JS shows/hides the corresponding Residence/Unit/Property field.

## Navigation
- Opened from: PROP-059 (Photography Schedule List) — Edit icon.
- Navigates to: None (redirects back to the list after a successful save).
- Child popup: None.
