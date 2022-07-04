# ![wdi5 Logo](https://github.com/js-soft/wdi5/raw/main/docs/img/wdi5-logo-small.png) wdi5 quickstart

fast lane for adding `wdi5` for e2e tests to your UI5 application

## quickstart

```js
$> cd your/ui5/app
# for JavaScript projects:
$> npm init wdi5
# for TypeScript projects:
$> npm init wdi5 -- --ts
```

Note that specifically for the TypeScript projects, this quickstart command is suited as a complimentary tool [to `yo easy-ui5 ts-app`!](https://github.com/ui5-community/generator-ui5-ts-app)

## how it works

the init will…

| for JavaScript                                                                                                                                                                  | for TypeScript                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| install `wdi5` and all required WebdriverIO peer dependencies                                                                                                                   | (&larr; same)                                                                                                                                                                                                                                        |
| assume that you're running the UI5 app with the `ui5-tooling` on port 8080                                                                                                      | (&larr; same)                                                                                                                                                                                                                                        |
| - add a config file (`wdio.conf.js`) to your current working directory<br />- assume that your tests are in `$ui5-app/webapp/test/**/*` and follow the name pattern `*.test.js` | - add config files (`wdio.conf.ts`, `tsconfig.json` ) to a folder `test` in your current working directory (respecting existing content in `test`)<br />- assume that your tests are in `$ui5-app/test/**/*` and follow the name pattern `*.test.ts` |
| set an `npm` script named "wdi5" to run `wdi5` <br/>so you can immediately do `npm run wdi5`                                                                                    | (&larr; same)                                                                                                                                                                                                                                        |

note this is a _minimal_ install for running `wdi5`

- locally
- with `Chrome` as target browser
- plain JavaScript as notation
- `mocha` as the syntax for tests
- `spec` as the output format of the test results

The `wdi5` config is already prepared for

- `--headless`: runs Chrome in headless mode (`npm run wdi5 -- --headless`)
- `--debug`: extends test timeouts and auto-opens Chrome's developer tools pane (`npm run wdi5 -- --debug`)

## next

- [ ] provide initial test file (skeleton) for JS + TS
