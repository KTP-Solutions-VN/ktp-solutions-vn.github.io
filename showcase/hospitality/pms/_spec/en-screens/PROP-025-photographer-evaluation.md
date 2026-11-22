# PROP-025 — Photographer Ratings

**Type:** Full page
**Route:** property/photography/photographer-evaluation (a custom route configured in Routes.php, mapped to the `photographerEvaluation` action)
**Module:** PROP = Property Records

## Overview
A dashboard summarizing photography performance by photographer, aggregating the scores of photo sets rated against the Angles/Colours/Composition criteria, compared against the regional benchmark score for a selected period and region.

## Detailed Description

### Filter
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Region | `region` (query string) | Select (list of regions + "all") | No | Defaults to `all` |
| 2 | Period | `period` (query string) | Select (list of predefined periods) | No | Defaults to `last_90_days` |
| 3 | Photographer | `photographer` (query string) | Select (list of photographers + "all") | No | Defaults to `all`, depends on region/period |
| 4 | Apply button | — | Submit (GET) | — | |

### Summary KPIs
| # | Field Name | Field Code | Notes |
|---|---|---|---|
| 1 | Regional average | `summary.regional_average` | Regional average score |
| 2 | Photo sets scored | `summary.scored_sets` | Number of photo sets scored |
| 3 | Best performer | `summary.best_performer` | Highest-scoring photographer |
| 4 | Below benchmark | `summary.below_benchmark` | Number below the benchmark |

### "Performance by Photographer" Table
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Rank | `row.rank` | Number | No (display) | Special badge for rank 1 |
| 2 | Photographer | `row.photographer`, `photographer_initials` | Text + initials avatar | No | |
| 3 | Sets | `row.sets` | Number | No | |
| 4 | Angles/Colours/Composition | `row.angles_average`, `colours_average`, `composition_average` | Star rating (1-3 stars) | No | |
| 5 | Average | `row.average_score` | Text (x.x / 3) | No | Color-coded by level (high/mid/low) |
| 6 | Benchmark Comparison | `row.comparison_percent`, `comparison_width` | Percentage bar above/below benchmark | No | |

### "Regional Benchmark" Block (sidebar)
Displays: Regional average, Best criterion (with score), Weakest criterion (with score), based on `benchmark`.

## Functions / Actions
- "Apply" button — re-filters data by Region/Period/Photographer (GET request, updates the URL).
- No data-writing actions on this screen (report viewing only).
- If photo storage (`photoStorageReady()`) is not ready, a "Photo storage pending review" warning is displayed.

## Navigation
- Opened from: PROP-026 (Shoot Scheduler) — breadcrumb; PROP-028 (Image Quality Review) — photographer name link on each score row.
- Navigates to: `Property::photography` (breadcrumb "Shoot Scheduler" — PROP-026).
- Child popup: none.
