# Easy Generator

A monorepo that hosts multiple workspaces (apps and libs) and managed by [NX](nx.dev) and PNPM workspaces.

## project structure

- **libs:**

  contains libraries and plugins.

- **apps:**

  contains the applications.

  To explore the project graph and the dependency between the apps and local libs, run `nx graph`

## contributing

please read our [contributing guide](/CONTRIBUTING.md) and [code of conduct](/CODE_OF_CONDUCT.md)

- every scope has its own README.md and docs.

## Easy Generator apps

please refer to the guide for each app separately.

- [Backend](apps/easy-generator-backend/README.md)
- [Frontend](apps/easy-generator-UI/README.md)

## Going production

### Using containers

First, be sure Docker is installed in your machine by running `docker -v`.

from the project's root run `docker compose -f 'docker-compose.yml' up -d --build 'easy-generator-ui'`, which automatically setup the database and launches the backend and frontend for you.

Navigate to `http://localhost:3000` for UI and `http://localhost:5000` for API.

> You can change the desired ports in `.env`.

> The APIs are versioned using semver strategy.

### Without containers

You'll need to setup a database before launching the app, you can either use the docker compose to start the service `db`, or setup it manually.

in case of manual setup, you may need to change the db credentials in the .env file.

Change the database host to `localhost:5400` in `apps/easy-generator-backend/.env`

Start the backend by running `pnpm start:be` and `pnpm start:ui`.

The project uses incremential builds and caching mechanisms to speed up the building phases while developing,
if you faced any issues, try cleaning the caches and resetting the daemon by running `pnpm clean`

All commands should run from the project's root, you don't need to navigate to each app dir to start it.

## Releasing

run `nx release` and `nx release publish` to publish private packages (if any).

## Unit testing (in progress)

We use jest for running unit testing, to start the unit testing run one of the following commands:

- `pnpm test`: run all tests
- `pnpm test:unit`: run unit tests only
- `pnpm test:e2e`: run e2e tests only
- `pnpm test:changed`: only test the files affected by last changes
- `pnpm test:failed`: only re-run the last failed tests

## Demo

<img src="./assets/demo/1- home.png">
<img src="./assets/demo/2- register.png">
<img src="./assets/demo/3- register with data.png">
<img src="./assets/demo/4- login.png">
<img src="./assets/demo/5- logedin user.png">

### Videos:

<video src="./assets/demo/demo.mp4"></video>

if you cannot play the video directly, see it [here](./assets/demo/demo.mp4)
