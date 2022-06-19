# wdi5 quickstart

fast lane for adding `wdi5` for e2e tests to your UI5 application

## quickstart

```js
$> cd your/ui5/app
$> npm init wdi5
```

## how it works

the init will

- install `wdi5`
- add a config file (`wdio.conf.js`) to your current working directory
- set an `npm` script `wdi5` to run `wdi5`

note this is a _minimal_ install for running `wdi5`

- locally
- with `Chrome` as target browser
- plain JavaScript as notation
- `mocha` as the syntax for tests
- `spec` as the output format of the test results

## next

- [ ] add TS support (`wdio.conf.ts`)
