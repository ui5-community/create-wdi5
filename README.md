# ![wdi5 Logo](https://github.com/js-soft/wdi5/raw/main/docs/img/wdi5-logo-small.png) wdi5 quickstart

fast lane for adding `wdi5` for e2e tests to your UI5 application

## quickstart

```js
$> cd your/ui5/app
$> npm init wdi5
```

## how it works

the init will

- install `wdi5` and all required WebdriverIO peer dependencies
- add a config file (`wdio.conf.js`) to your current working directory,  
  assuming that your tests are in `$ui5-app/webapp/test/**/*`  
  and follow the name pattern `*.test.js`
- set an `npm` script named "wdi5" to run `wdi5`  
  so you can immediately do `npm run wdi5`

note this is a _minimal_ install for running `wdi5`

- locally
- with `Chrome` as target browser
- plain JavaScript as notation
- `mocha` as the syntax for tests
- `spec` as the output format of the test results

## next

- [ ] add TS support (`wdio.conf.ts`)
