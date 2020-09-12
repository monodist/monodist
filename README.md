# monodist

Ideally, this demonstrates changesets

### NPM Registry (GitHub)

Create a `personal access token` for your NPM Registry (GitHub) [(instructions)](https://docs.github.com/en/packages/publishing-and-managing-packages/about-github-packages#about-scopes-and-permissions-for-package-registries).

Add this to your root `.npmrc` (i.e. `~/.npmrc`):

```txt
//npm.pkg.github.com/:_authToken=a123************************************
```

And, add this to your repository root's `.npmrc` (i.e. `<repo>/.npmrc`)

```txt
# use the appropriate scope – for this repo it's `@monodist`
@monodist:registry=npm.pkg.github.com
```

And, set this in your GitHub Action workflow.

Etc.:

- add `"private": true,` to the `package.json` of any package that shouldn't be published
-
