# MNT-012 — Maintenance Service Matrix (Category / Subcategory / Issue)

**Type:** Full page (contains multiple inline popups/modals for actions)
**Route:** maintenance/maintenanceServices (+ ajax `maintenance/maintenanceMatrix` for pagination/search)
**Module:** Maintenance

## Overview
Screen for managing the maintenance issue classification structure across 3 levels: **Category** (`GardenService.type = maintenance`) → **Subcategory** (`MaintenanceSubcategory`) → **Issue/Problem** (problem option, `MaintenanceProblemOption`, linked to a priority level). Supports drag-and-drop reordering of categories/subcategories, search/filtering, and add-edit-delete for all 3 levels directly on the page via modals.

## Detailed Description

### Matrix Table (loaded via ajax `maintenanceMatrix`)
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Category | `cat_name`, `cat_icon` | `GardenService` of type maintenance |
| 2 | Subcategory | `sub_name`, `sub_icon` | `MaintenanceSubcategory` |
| 3 | Issue/Problem | `option` | `MaintenanceProblemOption.problem_option` |
| 4 | Priority | `priority_name`, `priority_color`, `priority_heading` | Can be changed quickly directly on the table (`option_priority`) |
| 5 | Status | `status` | active/inactive |

### Filters/Search
| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Keyword | `search` | Text | Searches by issue name, subcategory, category |
| 2 | Category | `category` | Select | Filters by `GardenService.id` |
| 3 | Priority | `priority` | Select | Filters by `MaintenancePriority.id` |
| 4 | Page | `page` | Pagination (limit 10) | |

### Popup 1 — Add/Edit Category (`form_type = category`)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Category Name | `name` | Text | Yes | Duplicate check via ajax `checkMaintenanceDuplicate` |
| 2 | Description | `description` | Textarea | No | |
| 3 | Image | `image`/`cropped_image` | Image upload (crop) | No | |
| 4 | Business Unit | `business_units[]` | Multi-select checkbox | Yes | |
| 5 | Status | `status` | Select (active/inactive) | Yes | |

### Popup 2 — Add/Edit Subcategory (`form_type = subcategory`)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Parent Category | `category_id` | Select/context | Yes | |
| 2 | Subcategory Name | `name` | Text | Yes | `slug` auto-generated; duplicate check within the same category |
| 3 | Icon | `image`/`cropped_image` | Image upload (crop) | No | |
| 4 | Status | `status` | Select (active/inactive) | Yes | |

### Popup 3 — Add/Edit Issue/Problem (`form_type = option`)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Parent Category / Subcategory | `category_id`, `subcategory_id` | Context | Yes | |
| 2 | Issue Name | `name` (→ `problem_option`) | Text | Yes | Duplicate check within the same subcategory |
| 3 | Priority | `priority` | Select | Yes | |
| 4 | Status | `status` | Select (active/inactive) | Yes | |

## Functions / Actions
- **Add Category/Subcategory/Issue**: opens the corresponding modal, submits via ajax to `addMaintenanceService` (differentiated by `form_type`).
- **Edit**: opens the modal pre-populated with existing data (`record_id`), submits via the same `addMaintenanceService` action.
- **Delete Issue**: `deleteMaintenanceService`.
- **Delete Subcategory**: `deleteSubCategory` (also deletes all associated issues).
- **Drag-and-drop Reorder Categories**: ajax `upadteCategoryPosition`.
- **Drag-and-drop Reorder Subcategories**: ajax `upadteSubCategoryPosition`.
- **Quick Priority Change** on the table: `form_type = option_priority`.
- **Search/Filter/Pagination**: calls `maintenanceMatrix` again (ajax, returns JSON).

## Navigation
- Entered from: Settings/Maintenance menu in the sidebar.
- Navigates to: no navigation to other pages — all CRUD operations across the 3 levels are performed in-place via modal/ajax.

## Notes
- The two files `add_maintenance_service.ctp` and `edit_maintenance_service.ctp` (actions `addMaintenanceService` GET, `editMaintenanceService`) are legacy standalone views that are no longer linked from the interface (fully replaced by the modals on this screen) — not documented as separate screens.
