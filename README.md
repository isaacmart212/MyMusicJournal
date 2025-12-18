# VinylLog

VinylLog is a personal web application for tracking, rating, and reviewing music albums. Inspired by **Letterboxd**, it emphasizes a clean visual grid, diary-style logging, and thoughtful reviews — but for music.

The project currently focuses on **manual album logging** as a first-class experience, with future plans to integrate external music APIs.

---

## Features (Current)

### Manual Album Logging

* Add albums manually with:

  * Album title
  * Artist
  * Release year
  * Cover art URL
* Log listens with:

  * Rating (1–5 or 1–10 scale)
  * Written review / notes
  * Date listened
  * Favorite (heart) toggle

### Diary / Grid View

* View all logged albums in a visual grid
* Sort by:

  * Most recent listens
  * Highest rated
* Hover states display rating and favorite status (Letterboxd-style)

### Single-User Focus

* Designed for personal use
* Simple data model without social features (for now)

---

## Tech Stack

* **Frontend / Backend**: Next.js

  * Unified frontend and API routes
* **Database**: Supabase (PostgreSQL)

  * Relational schema for albums and reviews
* **Styling**: Tailwind CSS

  * Rapid iteration and clean grid-based layouts

---

## Data Model

### `albums`

Stores album metadata so it can be reused across logs.

| Field        | Type | Description     |
| ------------ | ---- | --------------- |
| id           | UUID | Primary key     |
| title        | Text | Album title     |
| artist       | Text | Artist name     |
| image_url    | Text | Album cover URL |
| release_year | Text | Year released   |

### `reviews`

Stores individual listening logs.

| Field       | Type        | Description       |
| ----------- | ----------- | ----------------- |
| id          | UUID        | Primary key       |
| album_id    | Foreign Key | References albums |
| rating      | Integer     | Numeric rating    |
| review_text | Text        | Written review    |
| listened_at | Date        | Date listened     |
| favorite    | Boolean     | Favorite / heart  |

---

## UI Overview

### Home / Profile Page

* “Recent Listens” section
* Main album grid
* Hover effects reveal ratings and favorites

### Logging Modal

* Large album art preview
* Inputs for:

  * Rating
  * Date listened
  * Review text
* Save action persists data to the database

---

## Roadmap

### Phase 1 — Manual Logging (Current)

* Album CRUD
* Review logging
* Sorting and grid layout

### Phase 2 — UX Polish

* Improved hover states and transitions
* Better mobile layout
* Empty states and loading indicators

### Phase 3 — Spotify Integration (Coming Soon)

* Spotify authentication
* Import saved albums
* Search Spotify’s catalog for metadata
* Optional syncing with listening history

> Spotify integration is intentionally deferred to keep the core experience simple and stable first.

---

## Inspiration

* Letterboxd (visual diary + rating system)
* Personal music journaling
* Album-first listening culture

---

## Status

This project is under active development and currently intended for **personal use**.
Architecture and design choices are made with future extensibility in mind.