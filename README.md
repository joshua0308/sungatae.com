## Getting Started

If you cloned this project, you need to download the submodules.
```
git submodule init
git submodule update
```

### Run locally
```
hugo server --disableFastRender

# include drafts
hugo server -D

# automatically redirect to the page you last modified
hugo server --navigateToChanged
```

### Build
```
hugo
```

### Run locally
```
hugo server --disableFastRender
```

### Deploy
The blog is built with Hugo and deployed to GitHub Pages using the workflow in `.github/workflows/hugo.yaml`.

The GitHub Action:
- installs Hugo and Dart Sass
- checks out the repo and submodules
- builds the site into `public/`
- deploys the generated site via `actions/deploy-pages@v4`

DNS for `sungatae.com` is managed separately in AWS Route 53, while the repository deploys the site to GitHub Pages.

### Create new post
```
hugo new posts/my-first-post.md
```

### Add a video post

Create `content/videos/YYYYMMDD-short-title/index.md`. For example, `content/videos/20261018-kpop-house-dj-mix/index.md`:

```markdown
---
title: "kpop house dj mix (a20 lite, lisa, newjeans, tuide)"
date: 2026-10-18T12:00:00-07:00
draft: false
youtubeId: HZWC4d5d_E0
categories:
- DJ
---

{{< youtube HZWC4d5d_E0 >}}
```

Use the video's title and the date you want shown on the site, including the timezone offset. Hugo excludes future-dated posts until that time, and the site needs to rebuild for them to appear. Set `draft: true` to keep an unfinished post unpublished.

The YouTube ID is the part after `youtu.be/` or the `v=` parameter in a YouTube watch URL. For `https://youtu.be/HZWC4d5d_E0?si=...`, use only `HZWC4d5d_E0`. Put the same ID in both `youtubeId` (used for the thumbnail) and the `youtube` shortcode (used for the player). No thumbnail download is needed.

Keep `DJ` for DJ sets, or change the category as appropriate. Add an optional description below the shortcode using Markdown.

Preview with `hugo server` and open `/videos/` to check the thumbnail, title, and date. Open the post to check the embedded player. Video posts appear in the Videos grid, newest first; the homepage lists only posts from `content/posts/`.

Run `hugo` to check the build, then commit and push through the normal GitHub Pages deployment workflow described above.

### Image carousel

Use the `carousel` shortcode to show images one at a time inside a post. Put the images in the post's folder alongside its `index.md`:

```text
content/posts/my-post/
├── index.md
└── images/
    ├── overview.png
    └── details.png
```

Add this to `index.md` where you want the carousel to appear:

```go
{{< carousel images="images/overview.png,images/details.png" label="Project screenshots" >}}
```

`images` is required. Supply a comma-separated list of paths relative to the post folder. Images appear in the order you list them, so reorder the paths to change the sequence. Spaces around each path are allowed. Wildcards and absolute paths are not supported. Missing images cause the Hugo build to fail with an error identifying the path.

`label` is optional and describes the carousel for screen readers. It defaults to `Image gallery`.

Readers can use the Previous and Next buttons, swipe or scroll horizontally, or focus the image area and use the left and right arrow keys. Clicking an image opens the full-size version in a new tab. Images fit within the carousel without cropping and have no visible captions. With only one image, the navigation controls are hidden.

The carousel uses a custom shortcode and plain CSS and JavaScript, with no additional libraries:

- `layouts/shortcodes/carousel.html`: image paths and slide markup.
- `static/css/carousel.css`: layout, image sizing, and controls.
- `static/js/carousel.js`: button navigation, arrow keys, and image counter.
- `layouts/partials/head.html`: loads carousel CSS and JavaScript on pages using the shortcode.

### Customizing a theme

> When you use a theme cloned from its git repository, do not edit the theme’s files directly. Instead, theme customization in Hugo is a matter of overriding the templates made available to you in a theme. This provides the added flexibility of tweaking a theme to meet your needs while staying current with a theme’s upstream.

### Add a project

Create `content/projects/<project-id>/index.md`. The folder name is the stable project ID and becomes `/projects/<project-id>/`. Keep it unchanged when renaming a project's title.

```yaml
---
title: "My project"
description: "A short explanation of what it does."
status: active
weight: 10
# Optional, site-relative image path:
# screenshot: /projects/my-project/images/screenshot.png
# screenshotAlt: "Describe what the screenshot shows"
# links:
#   - label: Try it
#     url: https://example.com
#   - label: Source
#     url: https://github.com/example/project
---
```

Status must be `active` or `archived`. The projects index shows active projects first and sorts by weight within each status, lowest first. Empty status groups are hidden.

Write the project page using whichever sections have content: Why I built it, How it works, Architecture, How it evolved, Lessons learned, What's next, and Release notes. The table of contents comes from the headings. Keep release notes as dated headings, newest first. Don't backdate releases from blog publication dates.

Project brand icons: add an `icon.svg`, `icon.png`, or `icon.webp` to the project's folder alongside `index.md`. The project list displays it at 28×28 pixels beside the name. Icons are decorative because the project name already labels the link. Projects without an icon show their name normally.

The main stylesheet lives in `assets/css/custom.css`. Hugo fingerprints it so browsers load new styling after each change. Use full rendering locally so project icon additions update the index immediately.

### Connect posts and projects

Add a project's folder ID to a blog post's front matter:

```yaml
projects:
  - budgies
```

This automatically adds the project to the post's **Related posts** section and the post to the project's **Related posts** section. Add multiple IDs to associate a post with multiple projects. Project pages list associated posts newest first. No reverse entry is needed.

### Link additional related posts manually

Add `relatedPosts` to any blog post or project page's front matter:

```yaml
relatedPosts:
  - /posts/building-my-own-expense-tracker
  - /posts/freelancing
  - /projects/budgies
```

These links appear after automatic project connections in the **Related posts** section, in the order listed. Duplicate links and links to the current page are omitted; hidden pages are excluded. Missing paths produce build warnings. Manual `relatedPosts` connections are one-way; `projects` connections link both ways.

### Color theme

The site follows the visitor's system light or dark preference by default. The navigation's light mode / dark mode button overrides it and remembers the choice in local storage. The shared palette is in `assets/css/custom.css`; `assets/js/theme.js` applies the preference before the stylesheet loads to avoid a flash. Without JavaScript, CSS still follows the system preference. Embedded maps and videos use their provider's appearance.
