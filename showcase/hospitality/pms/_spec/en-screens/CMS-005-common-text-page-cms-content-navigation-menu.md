# CMS-005 — Shared Content Blocks

**Type:** Full page

**Route:** `CmsController::commonText()` — default `/cms/common-text`

**Module:** Web Publishing

## Overview
An intermediate menu-style page consisting of buttons that lead to each group of screens for managing shared website content (not tied to a specific villa), such as Book-Direct Benefits, Concierge Showcase, Partner Badges, Destination Guides, Enquiry Forms, Service Showcase, Experience Wishlist, Travel Journal, Aggregator Destinations, Themed Site Snippets, and Getting-There Guides. The screen itself contains no data or input form.

## Detailed Description
No data table/form. The content consists only of 11 link buttons arranged in a grid:

| # | Button Name | Navigates To (URL) | Notes |
|---|---|---|---|
| 1 | Book-Direct Benefits | `why-us` | CMS-006 |
| 2 | Concierge Showcase | `concierges` | CMS-018 |
| 3 | Partner Badges | `logos` | CMS-009 |
| 4 | Destination Guides | `destination` | CMS-012 |
| 5 | Enquiry Forms | `contact-form` | CMS-016 |
| 6 | Service Showcase | `cms-services-list` | CMS-003 |
| 7 | Experience Wishlist | `i-wish` | CMS-028 (out of scope for this document) |
| 8 | Travel Journal | `insights` | CMS-026 (out of scope for this document) |
| 9 | Aggregator Destinations | `destination-global` | CMS-014 |
| 10 | Themed Site Snippets | `collection-common-text` | CMS-024 (out of scope for this document) |
| 11 | Getting-There Guides | `arrival` | CMS-030 (out of scope for this document) |

## Functions / Actions
- **Click each button:** navigates (full-page) to the corresponding content management screen (not a popup/AJAX action).

## Navigation
- Accessed from: Settings menu (breadcrumb "Settings").
- Navigates to: CMS-006, CMS-009, CMS-012, CMS-016, CMS-003, CMS-014, and other screens out of scope for this document (Experience Wishlist, Travel Journal, Themed Site Snippets, Getting-There Guides).
