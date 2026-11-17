# CMS-005 — Common Text Page (CMS Content Navigation Menu)

**Type:** Full page

**Route:** `CmsController::commonText()` — default `/cms/common-text`

**Module:** Website Content (CMS)

## Overview
An intermediate menu-style page consisting of buttons that lead to each group of screens for managing shared website content (not tied to a specific villa), such as Why Us, Concierge, Logo, Destination, Contact Form, Services, I Wish, Insights, Destination Global, Common Texts (Collection), and Arrival. The screen itself contains no data or input form.

## Detailed Description
No data table/form. The content consists only of 11 link buttons arranged in a grid:

| # | Button Name | Navigates To (URL) | Notes |
|---|---|---|---|
| 1 | Why Us | `why-us` | CMS-006 |
| 2 | Concierge | `concierges` | CMS-018 |
| 3 | Logo | `logos` | CMS-009 |
| 4 | Destination | `destination` | CMS-012 |
| 5 | Contact Form | `contact-form` | CMS-016 |
| 6 | Services | `cms-services-list` | CMS-003 |
| 7 | I Wish | `i-wish` | CMS-028 (out of scope for this document) |
| 8 | Insights | `insights` | CMS-026 (out of scope for this document) |
| 9 | Destination Global | `destination-global` | CMS-014 |
| 10 | Common Texts | `collection-common-text` | CMS-024 (out of scope for this document) |
| 11 | Arrival | `arrival` | CMS-030 (out of scope for this document) |

## Functions / Actions
- **Click each button:** navigates (full-page) to the corresponding content management screen (not a popup/AJAX action).

## Navigation
- Accessed from: Settings menu (breadcrumb "Settings").
- Navigates to: CMS-006, CMS-009, CMS-012, CMS-016, CMS-003, CMS-014, and other screens out of scope for this document (I Wish, Insights, Collection Common Text, Arrival).
