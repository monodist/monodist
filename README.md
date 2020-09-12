# monodist

This is a demonstration repo that proves out:

1. a monorepo using [pnpm](https://pnpm.js.org/)
2. a private NPM registry hosted on GitHub
3. changesets using [@atlassian/changesets](https://github.com/atlassian/changesets)
4. CI through GitHub actions to tie this all together

## Usage

### For a new package

Create a new package, and version it to "0.0.0" in its `package.json`, and apply a change (`pnpm change` in the repo root).

### For an existing package

Make a change, **do not manually update the version**, and apply a change (`pnpm change` in the repo root).

Then open a PR and merge to `master`.

## GitHub Actions Workflows

There are two workflows:

### [master-pr.yaml](./..github/workflows/master-pr.yml)

This runs when a PR to `master` is created. It runs a `build-test-lint` which does as the name implies, and also ensures that there are changeset changes (using [@atlassian/changesets](https://github.com/atlassian/changesets))

### [master-push.yaml](./..github/workflows/master-push.yml)

This runs when a push to `master` happens (e.g. a PR is merged into master). It runs two jobs (in parallel):

1. a `changeset` job, which updates the `CHANGELOG.md`s and package versions as appropriate, publishes to the GitHub NPM registry, and pushes the new commits (and tags) to the repository, and
2. a `build-test-lint` job which does as its name implies.

Read more about why we optimistically run the `changeset` early, below.

## Issues / Considerations

### Changeset race condition

Because a `push` to `master` kicks off:

- integration workflow (e.g. build / test / lint)
- `pnpx changeset version`
- `pnpx changeset publish`
- `git push origin master`
- `git push --follow-tags`

And there is currently no support for [preventing parallel workflows with GitHub Actions](https://github.community/t/prevent-parallel-workflows/16370/7), there is a race condition when merging multiple branches into `master` in rapid succession will cause the slower merges to conflict when running `git push origin master` and push the wrong tags when running `git push --follow-tags`.

This is because `pnpx changeset version` and `pnpx changeset publish` each produce a commit on top of `master`, and won't reflect any intermediate commits. For example:

Consider the situation where `97dd2ae` is the master before a commit.

- merge of `feature/a` produces a new `HEAD` for `master` (formerly `97dd2ae`) as `0657719`
- the GitHub Action workflow for `push:master` begins on `0657719`
- merge of `feature/b` produces a new `HEAD` for `master` (formerly `97dd2ae`) as `08ee9ae`
- the GitHub Action workflow for `push:master` begins on `0657719`
- the commits from `version` and `publish` for `0657719` (the resultant `HEAD` of merging `feature/a`) are pushed back to `master` as `0fa08cc` (correctly).
- the commits from `version` and `publish` for `08ee9ae` (the resultant `HEAD` of merging `feature/b`) are _attempted to be_ pushed back to `master` as `0fa08cc` (incorrectly, causing a conflict _and_ perhaps overwriting tags from `0fa08cc` - the _versioned_ and _published_ `HEAD` from `feature/a`).

The solutions to this problem are:

1. don't use GitHub Actions
2. optimistically run `pnpx changeset version` and `pnpx changeset publish` **first**, before any other integration workflow runs
3. acknowledge the problem, and don't merge to `master` if we're currently running a workflow on it.
4. use a solution like [@softprops/turnstyle](https://github.com/softprops/turnstyle) as a mutex for actions

The second approach simply narrows the span of time the race condition could present itself, it _does not_ solve the race condition.

References:

- [Prevent parallel workflows?](https://github.community/t/prevent-parallel-workflows/16370/7)
- [How to limit concurrent workflow runs](https://github.community/t/how-to-limit-concurrent-workflow-runs/16844)

## TODOs

- [commitlint + git hook](https://github.com/conventional-changelog/commitlint)
- act upon a [release](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#release) event to _distribute_ a release to (e.g.) a Docker Image, Netlify, Google Firebase, etc.
