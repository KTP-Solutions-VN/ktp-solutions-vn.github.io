# ACC-059-P1 — Service Vendor Form

**Type:** Popup (opened from ACC-059)

**Route:** `AccountController::addServicesSupplier($tab, $id, $show_page, $payment_detail_id)` — default `/account/add-services-supplier/<tab>/<id>/<show_page>/<payment_detail_id>`

**Module:** Finance & Admin

## Overview
A multi-tab form shared by both adding and editing a "Services" type supplier: supplier information, the list of allocated services, and bank account details. The field structure and behavior are identical to ACC-057-P1, differing only in `Supplier.type = services`.

## Detailed Description

**Suppliers** tab (element `account/services_supplier`) — same fields as ACC-057-P1: Supplier Code (read-only, auto-generated), Supplier Name, Supplier Category (`ProductCategory` of type services), Contact Person, Address, Country, Latitude/Longitude, Google Map Link, Phone Number, Email, Messenger/Messenger ID, Currency, GST (%), Status, Business Units.

**Services** tab (element `account/supplier_service`, shown only when `id` is present): list of the supplier's Service Allocations.

**Bank Account Detail** tab (element `account/service_supplier_bank_detail`, shown only when `id` is present) — same fields as ACC-057-P1: Payment Method, Bank Name, Bank Swift, Currency, Account Name, Account Number, Document (upload), Preference (Preferred/Other).

## Functions / Actions
- **Save (Suppliers tab):** submits POST to the `addServicesSupplier` action itself; saves/creates the `Supplier` (`type=services`), logs an access record, and redirects to this same popup with the newly saved `id`.
- **Save (Bank Account Detail tab):** submits POST, saves the `SupplierBankAccount`, redirects back to the current tab.
- **Cancel:** returns to ACC-059.

## Navigation
- Entered from: ACC-059 (Service Vendors) — "Add new" button or the Edit button on each row.
- Navigates to: returns to itself (`list` tab) after a successful save, or back to ACC-059 on Cancel.
