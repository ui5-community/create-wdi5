import { execSync } from "child_process"
import { gray, greenBright, yellowBright } from "colorette"
import { copyFile } from "fs/promises"

const DEV_DEPS = [
    "@wdio/cli@7",
    "@wdio/local-runner@7",
    "@wdio/mocha-framework@7",
    "@wdio/spec-reporter@7",
    "wdio-chromedriver-service",
    "wdio-ui5-service",
    "chromedriver"
]

const DEV_DEPS_TS = [...DEV_DEPS, "ts-node", "typescript"]

export async function run() {
    process.env.DEBUG && console.info("//> process.argv:")
    process.env.DEBUG && console.info(process.argv)
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
    execSync(`npm pkg set scripts.wdi5="wdio run wdio.conf.js"`, { stdio: "inherit" })
    console.log(greenBright("👍 done!"))
}

async function initTS() {
    console.log(gray('≡> copying tsconfig.json into "./test/"...'))
    await copyFile(`${__dirname}/../templates/test/tsconfig.json`, `${process.cwd()}/test/tsconfig.json`)
    console.log(gray('≡> copying wdio.conf.ts into "./"...'))
    await copyFile(`${__dirname}/../templates/wdio.conf.ts`, `${process.cwd()}/wdio.conf.ts`)
    console.log(greenBright("👍 done!"))

    console.log(gray("≡> installing wdio + wdi5 and adding them as dev dependencies..."))
    execSync(`npm i ${DEV_DEPS_TS.join(" ")} --save-dev`, { stdio: "inherit" })
    console.log(greenBright("👍 done!"))

    console.log(
        yellowBright(`\n≡> if your're using eslint, please add the "test"'s tsconfig.json to its' project setting: 
    "project": ["./tsconfig.json", "./test/tsconfig.json"]\n`)
    )

    console.log(gray("≡> adding wdi5 start command to package.json..."))
    execSync(`npm pkg set scripts.wdi5="wdio run wdio.conf.ts"`, { stdio: "inherit" })
    console.log(greenBright("👍 done!"))
}
