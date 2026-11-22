# VID-001-P3 — Video Guide Player

**Type:** Popup (opened from VID-001)

**Route:** Static modal within `index.ctp` (`#video-player-modal`); content is played via `VideosController::play($id)` — `GET /videos/play/:id` (streams the file, with access-permission checks by Business Unit/country scope)

**Module:** Video Guides

## Overview
A popup that plays the selected video directly (HTML5 video player) without leaving the list page.

## Detailed Description
No input fields; only displays the video title and the HTML5 video player (default browser controls).

## Functions / Actions
- **Play/Pause/Seek:** controls video playback (native `<video>` element functionality).
- **Close (x):** closes the modal, stops playback.

## Navigation
- Opened from: the Play button on each video card at VID-001.
- On close: returns to VID-001.
