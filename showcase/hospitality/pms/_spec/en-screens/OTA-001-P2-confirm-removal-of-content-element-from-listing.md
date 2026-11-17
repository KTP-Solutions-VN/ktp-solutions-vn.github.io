# OTA-001-P2 — Confirm Removal of Content Element from Listing

**Type:** Popup (opened from OTA-001)

**Route:** Static modal within `listing.ctp`; confirmation calls AJAX `OtaContentController::removeAssignment()` — `POST /ota-content/remove-assignment`

**Module:** Website Content (CMS) = OTA Content

## Overview
A confirmation dialog shown before removing a Content Element from the listing section of the current OTA (this does not delete the Content Element from the system, only unassigns it).

## Detailed Description
No input fields; the dialog only displays the name of the element to be removed and a confirmation message.

## Functions / Actions
- **Delete/Confirm:** sends the `removeAssignment` AJAX request with `platform_id` and `element_id`, sets `is_assigned = false`, and refreshes the table on OTA-001.
- **Cancel:** closes the modal.

## Navigation
- Opened from: the delete icon on each row of the table on OTA-001.
- After confirmation: closes the modal and refreshes OTA-001.
