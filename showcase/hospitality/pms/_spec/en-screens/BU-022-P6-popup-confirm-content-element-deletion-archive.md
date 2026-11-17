# BU-022-P6 — Popup: Confirm Content Element Deletion (Archive)

**Type:** Popup (opened from BU-022, Content Element tab — Superadmin only)

**Route:** Bootstrap modal (`#ota-archive-modal`) within the `channel/content_elements.ctp` element; submits via AJAX to `OtaContentController::archiveElement`.

**Module:** Business Unit

## Overview
A confirmation popup shown before archiving (deleting) a Content Element, warning if the element is currently assigned to any platform or is in use within Text content.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Confirmation message | — | Static text | — | Displays the name of the element to be deleted |
| 2 | Warning: platforms in use | — | Static list | — | Only shown if applicable |
| 3 | Warning: Texts in use | — | Static list | — | Only shown if applicable |

## Functions / Actions
- **Delete/Archive:** submits an AJAX request to archive the content element, removing its links from related platforms/Texts.
- **Cancel:** closes the modal without deleting.

## Navigation
- Opened from: BU-022 (Content Element tab) — Delete icon on each row.
- After submission: remains on BU-022 (`content-elements` tab).
