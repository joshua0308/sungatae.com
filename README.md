## Getting Started

If you cloned this project, you need to download the submodules.
```
git submodule init
git submodule update
```

### Run locally
```
hugo server

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
hugo server
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
