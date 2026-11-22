# VID-001-P4 — Confirm Video Deletion

**Type:** Popup (opened from VID-001)

**Route:** Static modal within `index.ctp` (`#video-confirm-modal`); confirmation calls AJAX `VideosController::delete($id)` — `POST /videos/delete/:id`

**Module:** Video Guides

## Overview
A shared confirmation dialog before permanently deleting a video from the library (including deletion of the physical file and related Guest Hub/country assignments).

## Detailed Description
No input fields; only displays the name of the video to be deleted and a confirmation message.

## Functions / Actions
- **Delete:** sends the AJAX call to delete the video, deletes the physical file on the server, deletes related `VideoCountries`/`VillaGuestPortalVideos` records, refreshes the video grid on VID-001.
- **Cancel:** closes the modal without performing the action.

## Navigation
- Opened from: the Delete icon on each video card at VID-001.
- After confirming: closes the modal, refreshes the VID-001 video grid.
