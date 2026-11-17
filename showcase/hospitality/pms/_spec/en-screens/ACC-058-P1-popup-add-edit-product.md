# ACC-058-P1 — Popup: Add/Edit Product

**Type:** Popup (opened from ACC-058)

**Route:** `AccountController::addProduct($id)` — default `/account/add-product/<id>`

**Module:** Accounting & HR

## Overview
Form for adding a new Product or editing an existing one, using a single shared action for both cases (presence of `id` = edit).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Name | `name` | Text | Yes (`required`) | |
| 2 | Category | `product_category` | Select2 (`ProductCategory` of type product) | Yes (`required`) | |
| 3 | Reference | `reference` | Text | Yes (`required`) | |
| 4 | Barcode | `barcode_image` | Image upload (1:1 ratio, max 1 MB) | No | Shows an image preview |
| 5 | Description | `description` | Textarea | Yes (`required`) | |
| 6 | Photo | `image` / `cropped_image` | Image upload (2:3 ratio, max 1 MB, auto-cropped if the ratio doesn't match) | No | Shows an image preview |
| 7 | Pieces Per Package | `pieces_per_package` | Text | Yes (`required`) | |
| 8 | Currency | `currency` | Select2 (`Currency`) | Yes (`required`) | |
| 9 | Price | `price` | Text | Yes (`required`) | |
| 10 | Status | `status` | Select: Active/Inactive | Yes (`required`) | |
| 11 | Business Units | `business_units[]` | Multi-select checkboxes | Yes (`required`, JS validation) | |

## Functions / Actions
- **Save/Update (label changes between add/edit):** submits POST to the `addProduct` action itself; the server saves the `Product` (`type=product`), handles image/barcode upload and cropping, logs an access record, and redirects to ACC-058 (`products`).
- **Cancel:** returns to ACC-058 (`products`).

## Navigation
- Entered from: ACC-058 (Products) — "Add new" button or the Edit button on each row.
- Navigates to: returns to ACC-058 after saving or canceling.
