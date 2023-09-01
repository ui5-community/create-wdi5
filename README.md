# ![wdi5 Logo](https://github.com/js-soft/wdi5/raw/main/docs/img/wdi5-logo-small.png) wdi5 quickstart

Fast lane for adding `wdi5` for e2e tests to your UI5 application

## Quickstart

```bash
$> cd your/ui5/app
# for JavaScript projects:
$> npm init wdi5@latest
# for TypeScript projects:
$> npm init wdi5@latest -- --ts
```

Or, if you are working with `yarn`

```bash
$> yarn create wdi5@latest
$> yarn create wdi5@latest -- --ts
```

Or, if you are working with `pnpm`

```bash
$> pnpm create wdi5@latest
$> pnpm create wdi5@latest -- --ts
```

Note that this quickstart command is suited as a complimentary tool [to `yo easy-ui5`!](https://github.com/SAP/generator-easy-ui5)

## How it works

The initializer will…

| for JavaScript                                                                                                                                                                   | for TypeScript                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| install `wdi5` and all required WebdriverIO peer dependencies                                                                                                                    | (&larr; same)                                                                                                                                                                                                                         |
| assume that you're running the UI5 app with the `ui5-tooling` on port 8080                                                                                                       | (&larr; same)                                                                                                                                                                                                                         |
| - add a config file (`wdio.conf.js`) info `$ui5-app/webapp/test/e2e/`<br>- assume that your tests are in `$ui5-app/webapp/test/e2e/**/*` and follow the name pattern `*.test.js` | - add the wdi5 config file (`wdio.conf.ts`) and a TypeScript config file (`tsconfig.json` ) to `$ui5-app/webapp/test/e2e/`<br>- assume that your tests are in `$ui5-app/webapp/test/e2e/**/*` and follow the name pattern `*.test.ts` |
| set an `npm` script named "wdi5" to run `wdi5` <br/>so you can immediately do `npm run wdi5`                                                                                     | (&larr; same)                                                                                                                                                                                                                         |

Note that this is a _minimal_ install for running `wdi5`

- locally
- with `Chrome` as target browser
- plain JavaScript as notation
- `mocha` as the syntax for tests
- `spec` as the output format of the test results

The `wdi5` config is already prepared for

- `--headless`: runs Chrome in headless mode (`npm run wdi5 -- --headless`)
- `--debug`: extends test timeouts and auto-opens Chrome's developer tools pane (`npm run wdi5 -- --debug`)

## Supported Options

You can pass the following _optional_ flags to modify the quickstart of `wdi5`:

- `--configPath <path to config>` custom path where your config file (`wdio.conf.(j|t)s`) should be created
- `--specs <path to specs>` custom path where your specs files are located
- `--baseUrl <application url>` custom url to your application
