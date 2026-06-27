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

### Customizing a theme

> When you use a theme cloned from its git repository, do not edit the theme’s files directly. Instead, theme customization in Hugo is a matter of overriding the templates made available to you in a theme. This provides the added flexibility of tweaking a theme to meet your needs while staying current with a theme’s upstream.
