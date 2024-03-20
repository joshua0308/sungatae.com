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
The blog is deployed to Github Pages. 

### Create new post
```
hugo new posts/my-first-post.md
```

### Customizing a theme

> When you use a theme cloned from its git repository, do not edit the theme’s files directly. Instead, theme customization in Hugo is a matter of overriding the templates made available to you in a theme. This provides the added flexibility of tweaking a theme to meet your needs while staying current with a theme’s upstream.
