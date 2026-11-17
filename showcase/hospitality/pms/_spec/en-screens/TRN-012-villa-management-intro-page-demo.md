# TRN-012 — Villa Management Introduction Page (demo)

**Type:** Full page
**Route:** `TrainingController::page()` — `/training/page`
**Module:** TRN = Training

## Overview
A static banner-style page introducing "Villa Management" in general, with left/right navigation buttons and a Stop button; the content is placeholder text (lorem ipsum) and is not tied to any actual Tutorial business data. This appears to be a leftover demo/placeholder screen, with no visible link to it from other screens in the module.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Introduction content | — | Static (hard-coded) text | — | Placeholder content, not sourced from the database |

## Functions / Actions
- **Left/right arrows**: have IDs but no actual JS handler is wired up in this file (no click-handling script for these buttons).
- **Stop**: button is displayed, no JS handler was found attached to it.

## Navigation
- **Entered from:** no link pointing to this page was found from other screens in the Training module; only accessible via a direct URL.
- **Leads to:** none.
