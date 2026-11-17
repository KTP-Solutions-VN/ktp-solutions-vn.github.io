# PROP-028 — Photography Scores

**Type:** Full page
**Route:** property/photography/scores (a custom route configured in Routes.php, mapped to the `photographyScores` action)
**Module:** PROP = Properties

## Overview
A table for scoring the quality of each photo set against 3 criteria — Angles/Colours/Composition (1-3 star scale) — allowing inline scoring (via AJAX) and displaying the average score, sortable by lowest/highest score.

## Detailed Description

### Filter
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `id` (query) | Select | No | |
| 2 | Search | `q` | Text | No | Searches by property/residence/unit |
| 3 | Sort | `sort` | Select (Lowest score first / Highest score first) | No | Defaults to `lowest` |
| 4 | Apply button | — | Submit (GET) | — | |

### Summary KPIs
| # | Field Name | Field Code | Notes |
|---|---|---|---|
| 1 | Average score | `summary.average_score` | |
| 2 | Scored photo sets | `summary.scored_sets` | |
| 3 | Need attention | `summary.need_attention` | Score < 2 |
| 4 | Strong packs | `summary.strong_packs` | Score ≥ 2.5 |

### "Photo Pack Score Overview" Table
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | `row.property`, `property_meta` | Text | No | |
| 2 | Photographer | `row.photographer` | Text (link to PROP-025 filtered by photographer) | No | |
| 3 | Angles/Colours/Composition | `row.angles_score`, `colours_score`, `composition_score` | Clickable stars (1-3), updated instantly via AJAX | No | POST `Photos::updateQualityScore` |
| 4 | Average | `row.average_score` | Text (x.x / 3) | No | Auto-updates when a star rating is set |
| 5 | Assessed | `row.assessed_at`, `assessed_by` | Text | No | |
| 6 | Actions | — | "View photo set" icon | — | `Photos::detail/{villa_id}/{set_key}` |

Paginated 25 rows per page.

## Functions / Actions
- Clicking a star (1-3) in the Angles/Colours/Composition column → sends AJAX POST `Photos::updateQualityScore` (fields: `photo_set_id`, `criterion`, `score`), updating the UI in place (stars, average score, overall KPIs) without reloading the page.
- "Apply" button — filters by Business Unit/Search/Sort.
- "View photo set" icon → views the photo set detail.
- Previous/Next pagination navigation.

## Navigation
- Opened from: PROP-026 (Photography Planning) — breadcrumb/menu.
- Navigates to: PROP-025 (photographer name link), `Photos::detail` (outside this scope).
- Child popup: none.
