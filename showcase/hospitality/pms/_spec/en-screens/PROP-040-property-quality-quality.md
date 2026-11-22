# PROP-040 — Listing Quality

**Type:** Full page
**Route:** property/quality
**Module:** PROP = Property Records

## Overview
A page for tracking listing quality and reviews of a property across OTA channels, along with Home Improvement quality tracking and the status of listing redo requests. Can be filtered by Business Unit/Entry Level (Property, Residence, Unit)/Property/OTA channel, logging score/comment entries per OTA, and creating To Do reminder tasks.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 | Yes (class `required`) | Changing the value → updates the query string, saves cookie |
| 2 | Entry Level | `entry_level` | Select2 (Property/Residence/Unit) | Yes | Controls which of the Residence/Unit/Villa fields is displayed |
| 3 | Residence | `residence_id` | Select2 | Yes (when entry level = Residence/Unit) | |
| 4 | Unit | `unit_id` | Select2 | Yes (when entry level = Unit) | |
| 5 | Property | `villa_id` | Select2 | Yes | List of properties for the selected BU |
| 6 | OTA | `ota` | Select2 | Yes | Saves the `property_channel_id` cookie |

### "Listings" Block (per OTA)
| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Date | `date` | Date recorded |
| 2 | User | `user` | Person who recorded it |
| 3 | Comment | `comment` | Comment |
| 4 | Action | — | Edit/Delete icons (open modal `exampleModal1`/`exampleModal`) |

### "Reviews" Block (per OTA)
| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Date | `date` | |
| 2 | Nb of Reviews | `number_of_review` | |
| 3 | Score | `score` | |
| 4 | Comment | `comment` | |
| 5 | Action | — | Edit/Delete icons |

### "Home Improvement" and "Listings (Redo)" Blocks
| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Date | `date` | |
| 2 | Property | `villa_name` | Redo table only |
| 3 | OTA | `ota_name` | Redo table only |
| 4 | User | `user` | |
| 5 | Comment | `comment` | |
| 6 | Action | — | Icon to view the Redo request log (if any), view "Be Redone" status |

### Add/Edit Listing or Review Modal (`#exampleModal1`)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date | `date` | Text (read-only, defaults to today) | Yes | |
| 2 | Nb of Reviews | `number_of_review` | Number | Yes (for Review type) | Shown only when quality_type = review |
| 3 | Score | `score` | Number | Yes (for Review type) | |
| 4 | Comment | `comment` | Textarea | Yes | |

### Delete Confirmation Modal (`#exampleModal`)
Deletes a Listing/Review/Home Improvement record identified by `villa_quality_id`, `villa_quality_type`.

### Add To Do Modal (`#addToDoModal`)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Notice | `notice` | Textarea | Yes (min 2 characters) | |
| 2 | Deadline | `deadline` | Date picker | Yes | |
| 3 | To (Received by) | `received_by` | Select2 (list of users) | Yes | |

The form submits to `controller=ToDo, action=add` with `module=quality` and the relevant context IDs (villa/business_unit/residence/unit/channel/entry_level).

### "Be Redone" Modal (`#showBeRedone`)
Displays the status/history of listing redo requests, and allows canceling a request (`cancel_request`).

## Functions / Actions
- Changing filters (Business Unit/Entry Level/Residence/Unit/Property/OTA) → reloads the corresponding data.
- Add/Edit/Delete Listing, Review, Home Improvement records (via AJAX modals).
- Add a To Do task related to a Quality record.
- View/cancel a "Be Redone" (OTA listing redo) request.
- View the log (if any) of a Redo request (linked to PROP-031/redoLog).

## Navigation
- Opened from: the Listing Quality menu (outside the scope of the current spec).
- Navigates to: no navigation to other pages (all actions occur via in-place AJAX modals); data-related to PROP-031 (Listing Refresh Request).
- Child popup: Add/Edit Listing-Review modal, Delete confirmation modal, Add To Do modal, "Be Redone" modal (not documented as separate codes, being in-place supplementary actions).
