import { gray, greenBright } from "colorette"
import { execSync } from "child_process"
import { copyFile } from "fs/promises"

const DEV_DEPS = [
    "@wdio/cli",
    "@wdio/local-runner",
    "@wdio/mocha-framework",
    "@wdio/spec-reporter",
    "wdio-chromedriver-service",
    "wdio-ui5-service",
    "chromedriver"
]

export async function run() {
    console.log(gray("≡> copying wdio.conf.js into place..."))
    await copyFile(`${__dirname}/../templates/wdio.conf.js`, `${process.cwd()}/wdio.conf.js`)
    console.log(greenBright("👍 done!"))

    console.log(gray("≡> installing wdio + wdi5 and adding them as dev dependencies..."))
    execSync(`npm i ${DEV_DEPS.join(" ")} --save-dev`, { stdio: "inherit" })
    console.log(greenBright("👍 done!"))

    console.log(gray("≡> adding wdi5 start command to package.json..."))
    execSync(`npm set-script wdi5 "wdio run wdio.conf.js"`, { stdio: "inherit" })
    console.log(greenBright("👍 done!"))
}
