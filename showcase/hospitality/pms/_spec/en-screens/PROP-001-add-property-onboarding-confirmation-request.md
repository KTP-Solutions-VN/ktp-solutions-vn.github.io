# PROP-001 — New Intake Request
**Type:** Full page
**Route:** property/add-onboarding (optional parameter `$id` – ID of an existing Villa Onboarding record)
**Module:** PROP = Property Records

## Overview
Screen for initiating an Onboarding record for a new property (either standalone or a multi-unit Residence). The user selects a validator, then enters each core information field (Property Name, Short Name, Beds24 Name, Owner on VM, Location on VM, etc.) — each field is saved immediately via AJAX on blur. Finally, the user submits the validation request to the selected validator (creating a NoticeBoard notification).

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Choose Validator | `validator_id` | Select2 (list of Users based on role) | Yes | Options depend on the logged-in user's `user_type` (Employee → Superadmin/Admin/BU Manager/Team Leader; Team Leader → Superadmin/Admin/BU Manager; BU Manager/Admin/Superadmin → Superadmin/Admin) |
| 2 | Project Type | `project_type` | Radio (`independent`/`residence`) | Yes | Changing the type re-renders the field table below via JS |
| 3 | Number of Unit | `number_of_unit` | Number (shown only when Project Type = residence) | Yes (when residence) | Limited to 1–20; each unit generates 4 additional field rows |
| 4 | Property Name / Residence Name | `property_name` | Text (maxlength 20 or 25) | Yes | Saved via AJAX on blur |
| 5 | Short Name | `short_name` / `short_name_{i}` | Text (maxlength 5) | Yes | |
| 6 | Beds24 Name | `beds24_name` / `beds24_name_{i}` | Text (maxlength 20/25) | Yes | |
| 7 | Unit Type {i} | `unit_type_{i}` | Text (maxlength 25, residence only) | Yes | Repeated for the number of units |
| 8 | Unit {i} | `unit_{i}` | Text (maxlength 25, residence only) | Yes | |
| 9 | Owner on VM | `owner_vm` | Radio (Yes/No) | Yes | |
| 10 | Location on VM | `location_vm` | Radio (Yes/No) | Yes | |
| 11 | Project Leader (display) | — | Static text | — | = current user |
| 12 | Project Validator (display) | — | Static text | — | = selected validator |
| 13 | Initiated Date / Last Updated Date (display) | — | Static text (current date) | — | |

## Functions / Actions
- "Confirm" button (`#save_button`): hides the validator selection form and displays the project information block plus the onboarding data entry table.
- Each onboarding input field (`.input_field`) on blur, and each Owner/Location radio button on change → calls AJAX `POST /VM/property/saveOnboardingData` to incrementally save each field into the `VillaOnboarding` table (JSON `data`).
- Changing Project Type / Number of Unit → rebuilds the corresponding field table HTML (JS `setHtml`).
- "Request Validation" button (`#request_validation`): validates and submits the form, calling the `addOnboarding` action (POST) to create a `NoticeBoard` + `NoticeBoardDetail` record notifying the validator, then redirects to `onBoardings`.
- "Cancel" button: returns to the Onboarding list (`onBoardings`).

## Navigation
- Opened from: Property Records menu, Intake section (`onBoardings` list, "Add" button).
- Navigates to: after submitting the request, redirects to `property/onBoardings` (outside the scope of PROP-001..016).
- Child popup: none.
