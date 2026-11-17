# TXT-001-P3 — Confirm Delete Text/Language

**Type:** Popup (opened from TXT-001)

**Route:** Shared static modal within `index.ctp` (`#texts-delete-modal`); confirmation calls AJAX `TextsController::deleteText()` (`POST /texts/delete-text`) or `TextsController::deleteLanguage()` (`POST /texts/delete-language`) depending on the context the popup was opened from.

**Module:** Texts

## Overview
A shared confirmation dialog for two delete actions: deleting a reusable text (Shared/Profile) or removing a language from a country (only when that language is not in use).

## Detailed Description
No input fields; the message content and warnings (e.g., listing the places where the text is currently assigned) are generated dynamically via JS depending on context.

## Functions / Actions
- **Delete:** sends the corresponding AJAX call (`deleteText` or `deleteLanguage`), refreshes the list on TXT-001.
- **Cancel:** closes the modal without performing the action.

## Navigation
- Opened from: the delete icon on Shared/Profiles data rows, or the delete-language icon on the Languages tab of TXT-001.
- After confirming: closes the modal, refreshes TXT-001 data.
