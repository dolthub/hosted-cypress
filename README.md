# hosted-cypress

A suite of Cypress tests that runs against Hosted DoltDB (hosted.doltdb.com)

![Run all Cypress tests](<https://github.com/dolthub/hosted-cypress/workflows/Tests%20(Hosted%20Prod)/badge.svg>)

## Installation

```bash
$ yarn && yarn compile
```

> Note: If you're running the Cypress tests on the [Apple M1 ARM Architecture](https://www.cypress.io/blog/2021/01/20/running-cypress-on-the-apple-m1-silicon-arm-architecture-using-rosetta-2), you may need to install Rosetta before running the tests:

```bash
$ softwareupdate --install-rosetta --agree-to-license
```

## Running the tests

You can either run our Cypress suite against our deployed production (`hosted.doltdb.com`), deployed development (`hosteddoltdb.hosteddev.ld-corp.com`) or against the local webserver (`localhost:3001`).

To run the tests against production, you can simply run these commands:

```bash
# runs tests using the full UI in Chrome against prod (recommended)
$ yarn cy-open

# runs tests against prod (default browser is Electron)
$ yarn cy-run

# runs tests headless against prod (using Chrome)
$ yarn cy-chrome
```

To run the tests against the local webserver, make sure you have the server running. _(Please note: this option is only currently available for our DoltHub devs. If you want to add a test to our suite, please file [an issue](https://github.com/dolthub/hosted-cypress/issues/new) or [pull request](https://github.com/dolthub/hosted-cypress/pulls) so we can add the appropriate `data-cy` tag.)_

Then, to run the Cypress tests against the local server:

```bash
# runs tests in Chrome against local server
$ yarn cy-open-local

# runs tests against local server
$ yarn cy-run-local

# runs specific tests against local server
$ yarn cy-run-local --spec 'cypress/integration/publicPaths/render/homepage/*'
```

### Private paths

To run the tests in the `privatePaths` folder you need to put the test username and password in a Cypress env file. Only DoltHub devs have access to this information and can run these tests locally. This file should not be checked in. The file should look like this:

```json
// cypress.env.json
{
  "TEST_USERNAME": "xxx",
  "TEST_PASSWORD": "xxx"
}
```

## Writing tests

See the [dolthub-cypress README](https://github.com/dolthub/dolthub-cypress/blob/main/README.md) for more information about writing tests.
