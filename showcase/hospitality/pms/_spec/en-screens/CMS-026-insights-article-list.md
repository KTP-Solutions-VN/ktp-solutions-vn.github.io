# CMS-026 — Travel Journal

**Type:** Full page

**Route:** `CmsController::insights($action, $id)` — default `/cms/insights/:action/:id`

**Module:** Web Publishing

## Overview
List screen for "Travel Journal" articles (global article/news-style content, not tied to a specific villa) under the CMS's Shared Content Blocks section. From here, articles can be added, edited, or deleted.

## Detailed Description

List (data table):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | (computed, incrementing variable `$i`) | |
| 2 | Title | `GuestCollectionInsight.title` | |
| 3 | Actions | — | 2 buttons: Edit, Delete |

Data is fetched in full (`find('all')`, no conditions, no sorting, no pagination, no filter) from the `GuestCollectionInsight` table.

## Functions / Actions
- **Add New:** "Add New" button (`<a href="insights-edit">`) → opens CMS-027 (add mode).
- **Edit (per row):** link `action => insights-edit, $id` → opens CMS-027 (edit mode) for the corresponding article.
- **Delete (per row):** link `action => insights, delete, $id` → calls back into the `insights` action with `$action='delete'`, `$id`; the controller deletes the record (`_deleteData('GuestCollectionInsight', 'id', $id)`), shows a success/error Flash message, then redirects back to this same list screen.

## Navigation
- Accessed from: Settings menu → Shared Content Blocks (`CmsController::commonText`), the "Travel Journal" button/link.
- Navigates to: CMS-027 (Journal Article Editor).
- Related: the "Journal" tab in the property CMS collection tabs screen (CMS-023, `plugins/VillaManagement/src/Template/Cms/collection_tabs.ctp`) displays this list of global Insights for assignment to/removal from a specific villa — that tab uses a separate element (`Element/cms/insights.ctp`) and the AJAX action `CmsController::updateInsightAjax()` to save the selection (not this screen's `insights` action), only reading the shared `GuestCollectionInsight` data.
