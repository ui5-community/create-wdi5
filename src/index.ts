import { gray, greenBright, yellowBright } from "colorette"
import { execSync } from "child_process"
import { copyFile, cp } from "fs/promises"

const DEV_DEPS = [
    "@wdio/cli",
    "@wdio/local-runner",
    "@wdio/mocha-framework",
    "@wdio/spec-reporter",
    "wdio-chromedriver-service",
    "wdio-ui5-service",
    "chromedriver"
]

const DEV_DEPS_TS = [...DEV_DEPS, "ts-node", "typescript"]

export async function run() {
    process.argv.find((arg) => arg.includes("ts")) ? await initTS() : await initJS()
}

async function initJS() {
    console.log(gray("≡> copying wdio.conf.js into place..."))
    await copyFile(`${__dirname}/../templates/wdio.conf.js`, `${process.cwd()}/wdio.conf.js`)
    console.log(greenBright("👍 done!"))

    console.log(gray("≡> installing wdio + wdi5 and adding them as dev dependencies..."))
    execSync(`npm i ${DEV_DEPS.join(" ")} --save-dev`, { stdio: "inherit" })
    console.log(greenBright("👍 done!"))

    console.log(gray('≡> adding wdi5 start command ("wdi5") to package.json...'))
    execSync(`npm set-script wdi5 "wdio run wdio.conf.js"`, { stdio: "inherit" })
    console.log(greenBright("👍 done!"))
}

async function initTS() {
    console.log(gray('≡> copying tsconfig.json + wdio.conf.ts into "./test/"...'))
    await cp(`${__dirname}/../templates/test`, `${process.cwd()}/test`, { recursive: true })
    console.log(greenBright("👍 done!"))

    console.log(gray("≡> installing wdio + wdi5 and adding them as dev dependencies..."))
    execSync(`npm i ${DEV_DEPS_TS.join(" ")} --save-dev`, { stdio: "inherit" })
    console.log(greenBright("👍 done!"))

    console.log(
        yellowBright(`\n≡> if your're using eslint, please add the "test"'s tsconfig.json to its' project setting: 
    "project": ["./tsconfig.json", "./test/tsconfig.json"]\n`)
    )

    console.log(gray("≡> adding wdi5 start command to package.json..."))
    execSync(`npm set-script wdi5 "cd test && wdio run wdio.conf.ts"`, { stdio: "inherit" })
    console.log(greenBright("👍 done!"))
}
