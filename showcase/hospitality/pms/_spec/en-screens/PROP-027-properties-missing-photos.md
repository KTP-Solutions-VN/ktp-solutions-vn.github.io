# PROP-027 — Properties Missing Photos

**Type:** Full page
**Route:** property/photography/missing-photos (a custom route configured in Routes.php, mapped to the `photographyMissingPhotos` action)
**Module:** PROP = Properties

## Overview
Screen listing properties without a usable photo set, or missing photos of standard areas (bedroom, living room, etc.), categorized by priority level, supporting quick planning of catch-up shoots.

## Detailed Description

### Filter
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `id` (query) | Select | No | |
| 2 | Search | `q` | Text | No | Searches by property/residence/unit name |
| 3 | Apply button | — | Submit (GET) | — | |

### Summary KPIs
| # | Field Name | Field Code | Notes |
|---|---|---|---|
| 1 | Properties with issues | `summary.missing_properties` | |
| 2 | High priority | `summary.high_priority` | |
| 3 | Partial photo sets | `summary.partial_sets` | |
| 4 | Outdated sets | `summary.outdated_sets` | |

### List Table
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | `row.property`, `property_meta` | Text | No | |
| 2 | Photo Set (status) | `row.status`, `status_key` | Icon + text | No | |
| 3 | Missing / Issue | `row.issues[]` (label, class) | List of tags | No | E.g. missing bedroom photo, off-standard photo, etc. |
| 4 | Priority | `row.priority`, `priority_key` | Badge (high/medium/low) | No | |
| 5 | Next Action | `row.next_action` | Text | No | Emphasized when priority = high |
| 6 | Actions | — | 3 icon buttons | — | Plan shoot / Upload photos / View photo set |

Paginated 25 rows per page (`pagination`).

## Functions / Actions
- "Plan Photo Shoot" button (top of page) → navigates to PROP-026 (`Property::photography`).
- "Plan shoot" icon on each row → `Property::photography?villa_id=...`.
- "Upload photos" icon → `Photos::property/{villa_id}`.
- "View photo set" icon → `Photos::detail/{villa_id}/{set_key}`.
- "Apply" button — filters by Business Unit/Search.
- Previous/Next pagination navigation.

## Navigation
- Opened from: PROP-026 (Photography Planning) — breadcrumb/menu.
- Navigates to: `Property::photography` (PROP-026), `Photos::property`, `Photos::detail` (outside this scope).
- Child popup: none.
