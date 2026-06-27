# 2026-06-27 - Favorite places map page options

Context: want a "favorite places" map page (marker + notes per place, like a personal Google Maps) embedded in the Hugo blog at sungatae.com, hosted on GitHub Pages, routed via Route 53.

## No-code / low-code

**Google My Maps**
- Pros: free, zero code, drag pins, notes/photos per pin, exports as an iframe to drop into a Hugo page.
- Cons: looks like Google Maps (hard to match site design), no styling control, editing happens in the My Maps UI rather than in the repo.

**uMap**
- Open source alternative to My Maps, built on OSM data. Free hosted instance or self-host. Exports as GeoJSON, so no lock-in.
- Cons: same iframe-embed styling limitation, more utilitarian UI.

## Code it yourself, lightweight

**Leaflet.js + OpenStreetMap tiles**
- Small, well-documented JS lib. Render markers from a data file in a Hugo layout/shortcode.
- Pros: free, no API key for basic OSM tiles, big plugin ecosystem (clustering, custom icons), fully custom styling.
- Cons: OSM tile usage policy expects low-traffic personal use (fine for a blog, but worth knowing); default look is more generic than Mapbox-style maps.

## Code it yourself, modern/polished

**MapLibre GL JS + Protomaps (PMTiles)** - top pick for this setup
- MapLibre is the open-source fork of Mapbox GL JS (post license-change). Protomaps lets you generate a single static `.pmtiles` file scoped to just the region you care about (e.g. Toronto/Vancouver only), served straight from static storage. No tile server, no backend.
- Pros: free, open source, no API key, no usage-based billing risk, fits a static-site-on-GitHub-Pages setup conceptually (nothing server-side at all), fully custom styling.
- Cons: more setup (generating the pmtiles extract, wiring up MapLibre + pmtiles JS plugin). If the region extract is large, better to host the `.pmtiles` file on something like Cloudflare R2 (free egress) rather than in the repo directly, since GitHub Pages/repos get awkward past ~100MB files without Git LFS (soft repo limit ~1GB).
- Reference: Simon Willison did essentially this exact use case - personal point-of-interest map, MapLibre + PMTiles, built with Vite, deployed on GitHub Pages. Good template to follow.

**Mapbox GL JS**
- Pros: most polished out-of-the-box styling, great docs, Mapbox Studio for drag-and-drop styling, generous free tier (50,000 map loads/month, 100,000 directions requests, 50,000 static images monthly as of 2026).
- Cons: requires an API token and credit card on file. No user-configurable spending caps - if traffic spikes unexpectedly, charges accumulate without an automatic stop. Not a huge risk for a personal blog, but worth knowing since there's no backend gating requests.

## Hugo integration pattern (applies regardless of library choice)

- Store places in `data/places.yaml` (or per-place content files with `lat`/`lng`/`notes` in front matter).
- Build a custom layout or shortcode for the map page that loops over that data at build time and bakes the marker list into the page as JSON, alongside a `<script>` that initializes the map.
- Adding a new place = add an entry, commit, push. No separate database or API to maintain - consistent with how GitHub Pages already serves whatever Hugo builds.

## Recommendation

Given the DIY-from-scratch approach used elsewhere (e.g. the IG Archive landing page in raw HTML/no frameworks) and the goal of no server / no recurring cost / fits a static site: **MapLibre + Protomaps** is the best fit. Google My Maps is the fastest path if speed matters more than design control.

Next step (if picked up later): sketch the actual Hugo data file + MapLibre/PMTiles page template.

## Implemented (2026-06-27): Google My Maps, full-bleed at /map

Went with Google My Maps for speed. Map covers the full viewport below the nav.

### Shortcode vs. custom layout
- A **shortcode** renders inside the article body (`#container` > `#main.outer` > `.article-entry`), which imposes max-width, padding, and centering, plus the post `<h1>`/date/nav. Wrong tool for full-bleed — you'd fight the theme CSS.
- A **custom layout** replaces the whole page template: drop the article wrapper and lay out `head -> header -> map fills the rest`. Picked this.

### Files
- `layouts/_default/map.html` — full-bleed layout. `<body>` is a `100vh` flex column: `#header` takes its natural height, `#map-main` (`flex: 1`) fills the rest, iframe is `100%` of that. Styling is self-contained in a `<style>` block scoped under `body.map-page` so it can't leak site-wide. Reuses the theme's `head.html`/`header.html` partials. Map ID read via `.Params.mid`.
- `content/map.md` — front matter only: `layout: "map"` + `mid: "<map id>"` (no `title`/body needed beyond `title: "Map"`).
- `hugo.toml` — added `map` nav menu item (weight 30; bumped `ig` to 40).
- (Removed an earlier `layouts/shortcodes/googlemap.html` once the layout approach replaced it.)

### Getting the map ID
My Maps -> ⋮ next to title -> "Embed on my site" (also confirms the map is public, required or it renders blank for visitors) -> copy the `mid=...` value into `content/map.md`.

### Notes
- Editing pins happens in the My Maps UI and is live — no rebuild needed; the repo only stores the map ID.
- Map sits flush against the nav (true full-bleed). Padding/border is a one-line tweak in the layout `<style>`.
- Library-agnostic page wiring: switching to MapLibre + Protomaps later means swapping the iframe in `map.html` for the map init; the `content/map.md` + menu wiring stays.

### Why `content/map.md` is needed (content vs. layout)
In Hugo, content files declare *what pages exist*; layouts declare *how they look*. A layout alone renders nothing. `map.md` does three things the layout can't:
1. **Creates the URL.** `/map/` exists only because there's a content file at `content/map.md`. Without it, `layouts/_default/map.html` is an unused template — nothing tells Hugo to build the page.
2. **Selects the layout.** `layout: "map"` links the page to `map.html`. Without it, Hugo falls back to the default `single.html` (the boxed-in article template).
3. **Holds the data.** `mid: "..."` is read by the layout via `.Params.mid`. Template stays generic; content file supplies the map ID. Same split as the video posts: each `index.md` supplies a `youtubeId`, the theme supplies the rendering.
