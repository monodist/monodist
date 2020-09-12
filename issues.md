# Issues

### Version race condition

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

Issues:

- [Prevent parallel workflows?](https://github.community/t/prevent-parallel-workflows/16370/7)
- [How to limit concurrent workflow runs](https://github.community/t/how-to-limit-concurrent-workflow-runs/16844)
