# OTA-001-P1 — Pick Listing Elements

**Type:** Popup (opened from OTA-001)

**Route:** Static modal within `listing.ctp`; saves the selection via AJAX `OtaContentController::assignElements($platformId)` — `POST /ota-content/assign-elements/:platformId`

**Module:** Web Publishing = Channel Content

## Overview
A dialog that lists all Content Elements currently available ("Available for") to the current OTA, grouped by scope, allowing the user to check items to add them to (or remove them from) the listing section.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Selected Content Element | `assignment_element[]` | Checkbox (each row: name, group, length) | No | Elements currently assigned (is_assigned) are pre-checked |

If no Content Element is available, a message is displayed instructing the user to enable "Available for" on the Content Elements tab.

## Functions / Actions
- **Save:** sends the `assign_elements` AJAX request, synchronizes the assignment status (is_assigned) and order for each scope, refreshes the table on OTA-001, and displays a success toast.
- **Cancel/Close (x):** closes the modal without saving.

## Navigation
- Opened from: the "Select Content Elements" button on OTA-001.
- After saving: closes the modal and refreshes the content of OTA-001.
