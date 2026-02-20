# Contributing guide

## Setup the development environment

This project utilizes dev containers and tasks to help you start development immediately, no any setup is required to start, just plug and play.

All development tools are ready to use without any installation or configurations, including the databases, and any other tool required for development.

To start, just open the repo in your favorite IDE, we recooment VS code, a message pops up to ask you open the project in a container, approve it.

once the project opens, wheather inside a dev container or not, a task is going to start immediately to prepare the development environment for you, including enabling Corepack, and installing dependencies for all apps.

You'll also notice that IDE is automatically tailored for this project, including the extensions and other tools.

Before yyou start, be sure you have docker installed in your machine by running `docker -v`

## manual setup

If, for any reason, you cannot open the project inside dev containers, which includes all the tools you need to start the development immediatly, you may want to setup the project manually, here is a guide to achive it:

- The project is tested in debian-based Linux distributions, other OSs have not tested yet.
- install a version of NodeJS that satisfys the engins section in package,json, we recommend using the LTS version, currenty `v24.13.1`.
- enable and activate corepack, by running `corepack enable && corepack prepare --activate`
- setup pnpm and add it to system paths by running `pnpm setup`, you don't need to install pnpm yourself, as Corepack will automatically download and install it for you.
- run `pnpm install` in the root dir of the project, you don't need to run it inside every app, as we use PNPM workspaces to manage that automatically.
- install the database engine, we recommend using a container instead of installing it in your host directly, open the compose file to know the exact version that is guaranteed to be compatible with the one that the project uses.

## Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

- add a clear description to the problem you're fixing.

- any new feature you add must be unit tested and well documented, run the full test suite to ensure that all tests pass.

- submit your PR in a new [git branch](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

## Commit Message Format

We follow [conventional commits](https://conventionalcommits.org/) style, which is used in mega projects like Angular and gatsbyjs.

- commit message consists of a header, an optional body and an optional footer, with a blank line between them.
- the header includes a summary title, the action type and an optional scope
- the body including extra description.
- the footer includes the issue this commit fixes (ex: fixes #22) and may start with `BREAKING CHANGE` note.
- the scope is a project or a package or a sub-workspace.
  - multiple scopes should be separated with ', '.
  - partial scope may be used `(scope:section), for example: `fix(CMS:server)` commit is to fix a bug in the server section for the project CMS.
- commit types dovetails with [SemVer](https://semver.org/)

```
type(scope): title

body

footer
```

**types:**

- fix: a commit that fixes a bug, correlates with PATCH in SemVer.
- feat: introduces a new feature, correlates with MINOR in SemVer.
- BREAKING CHANGE: introduces a breaking API change, correlating with MAJOR in SemVer.
- docs: documentation improvement.
- lint: applying linting rules.
- test: add or modify a test.
- build: configurations that affects the building processes.
- refactor: changes that don't fix a bug, add a new feature or apply linting.
- init: initiate a new scope, i.e create a new project or package.

other commit types may be introduced, but they must be added to the contributing guide first.

if the commit introduces a BREAKING CHANGE, add '!', i.e: `type(scope)!: title`, and describe what your commit breaks in the first line in the body, in this form:
`BREAKING CHANGE: description...`

**examples:**

adding a new feature:

`feat: allow provided config object to extend other configs`

introducing a BREAKING CHANGE:

`refactor!: drop support for Node 6`

improving docs, in the scope: CMS
`docs(CMS): correct spelling of CHANGELOG`

## code style

We use linters such as [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to format the code base, following [Google style Guides](https://google.github.io/styleguide/)..

run the script `pnpm run lint` to check and auto fix format issues.

each scope has it's own lint script, and the root workspace has a general lint script that affects all scopes inside it.

it is recommended to set up your IDE to format the changed file on each file save,

we provide a project-level settings for VScode that enables this feature for you, but you need to install IDE extensions for these linters.

if the source code is not properly formatted, or the CI couldn't auto fix all issues, it will fail and the PR cannot be merged.
