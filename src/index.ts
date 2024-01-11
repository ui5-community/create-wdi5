import { execSync } from "child_process"
import { gray, greenBright, yellowBright } from "colorette"
import path from "path"
import fs from "fs/promises"

enum PackageManager {
    npm = "npm",
    pnpm = "pnpm",
    yarn = "yarn"
}

const DEV_DEPS = [
    "@wdio/cli",
    "@wdio/local-runner",
    "@wdio/mocha-framework",
    "@wdio/spec-reporter",
    "wdio-ui5-service@2"
]

const DEV_DEPS_TS = [...DEV_DEPS, "ts-node", "typescript", "@openui5/types"]
let configPath = "./webapp/test/e2e/"
let fullConfigPath: string
let BASE_URL = "http://localhost:8080/index.html"
let SPECS: string
let relativeTestDir = "./webapp/test/e2e/"
let absoluteTestDir: string
let ts = false // whether we're working in TS land

export async function run() {
    process.env.DEBUG && console.info("//> process.argv:")
    process.env.DEBUG && console.info(process.argv)

    ts = process.argv.find((arg) => arg.includes("ts")) ? true : false

    // respect --configPath cmd line arg
    if (process.argv.find((arg) => arg.includes("configPath"))) {
        const index = process.argv.findIndex((arg) => arg.includes("configPath")) + 1
        configPath = process.argv[index]
        configPath = configPath.endsWith(path.sep) ? configPath : configPath + path.sep
    }

    fullConfigPath = path.resolve(process.cwd(), configPath)
    const rootDirExists = await fs.access(fullConfigPath).then(
        () => true,
        () => false
    )
    if (!rootDirExists) {
        process.env.DEBUG && console.info(`//> created ${fullConfigPath}`)
        await fs.mkdir(fullConfigPath, { recursive: true })
    }

    // respect --specs cmd line arg
    if (process.argv.find((arg) => arg.includes("specs"))) {
        const index = process.argv.findIndex((arg) => arg.includes("specs")) + 1
        relativeTestDir = process.argv[index]
        relativeTestDir = relativeTestDir.endsWith(path.sep) ? relativeTestDir : relativeTestDir + path.sep
    }

    absoluteTestDir = path.resolve(process.cwd(), relativeTestDir)
    const testDirExists = await fs.access(absoluteTestDir).then(
        () => true,
        () => false
    )
    if (!testDirExists) {
        await fs.mkdir(absoluteTestDir, { recursive: true })
    }

    if (ts) {
        SPECS = "./**/*.test.ts"
        await initTS()
    } else {
        SPECS = "./**/*.test.js"
        await initJS()
    }
}

async function initJS() {
    const wdioConf = path.resolve(fullConfigPath, "wdio.conf.js")
    console.log(gray(`≡> copying wdio.conf.js into "${configPath}"`))
    await fs.copyFile(`${__dirname}/../templates/wdio.conf.js`, wdioConf)
    await _replacePlaceholder(wdioConf)
    console.log(greenBright("👍 done!"))

    console.log(gray(`≡> copying sample test files into "${relativeTestDir}"...`))
    await copySamples()
    console.log(greenBright("👍 done!"))

    console.log(gray("≡> installing wdio + wdi5 and adding them as dev dependencies..."))
    _installDevDependencies(DEV_DEPS)
    console.log(greenBright("👍 done!"))

    console.log(gray('≡> adding wdi5 start command ("wdi5") to package.json...'))
    _addWdi5Script(`${configPath}wdio.conf.js`)
    console.log(greenBright("👍 done!"))
}

async function initTS() {
    console.log(gray(`≡> copying tsconfig.json into "${relativeTestDir}"...`))
    await fs.copyFile(`${__dirname}/../templates/test/tsconfig.json`, path.resolve(absoluteTestDir, "tsconfig.json"))

    const wdioConf = path.resolve(fullConfigPath, "wdio.conf.ts")
    console.log(gray(`≡> copying wdio.conf.ts into "${configPath}"`))
    await fs.copyFile(`${__dirname}/../templates/wdio.conf.ts`, wdioConf)
    await _replacePlaceholder(wdioConf)
    console.log(greenBright("👍 done!"))

    console.log(gray(`≡> copying sample test files into "${relativeTestDir}"...`))
    await copySamples(true) //> "true" indicating TS land
    console.log(greenBright("👍 done!"))

    console.log(gray("≡> installing wdio + wdi5 and adding them as dev dependencies..."))
    _installDevDependencies(DEV_DEPS_TS)
    console.log(greenBright("👍 done!"))

    console.log(
        yellowBright(`\n≡> if your're using eslint, please add the "test"'s tsconfig.json to its' project setting:
    "project": ["./tsconfig.json", "${relativeTestDir}tsconfig.json"]\n`)
    )

    console.log(gray("≡> adding wdi5 start command to package.json..."))
    _addWdi5Script(`${configPath}wdio.conf.ts`, true)
    console.log(greenBright("👍 done!"))
}

async function copySamples(ts = false) {
    await fs.copyFile(
        `${__dirname}/../templates/test/sample.test.${ts ? "ts" : "js"}`,
        path.resolve(absoluteTestDir, `sample.test.${ts ? "ts" : "js"}`)
    )
}

async function _replacePlaceholder(wdioConf: string) {
    if (process.argv.find((arg) => arg.includes("specs"))) {
        const index = process.argv.findIndex((arg) => arg.includes("specs")) + 1
        SPECS = process.argv[index]
    }

    if (process.argv.find((arg) => arg.includes("baseUrl"))) {
        const index = process.argv.findIndex((arg) => arg.includes("baseUrl")) + 1
        BASE_URL = process.argv[index]
    }

    const data = await fs.readFile(wdioConf)
    let fileString = data.toString()
    fileString = fileString.replace(/%specs%/g, SPECS)
    fileString = fileString.replace(/%baseUrl%/g, BASE_URL)
    await fs.writeFile(wdioConf, fileString)
}

function _getUsedPackageManager(): PackageManager {
    const alternativeManagers = [PackageManager.pnpm, PackageManager.yarn]
    const defaultManager = PackageManager.npm

    const { npm_config_user_agent } = process.env
    const parts = npm_config_user_agent?.split(" ")
    const engines = parts?.filter((part) => part.includes("/")).map((part) => part.split("/")[0])

    for (const manager of alternativeManagers) {
        if (engines?.includes(manager)) {
            return manager
        }
    }
    return defaultManager
}

function _installDevDependencies(deps: string[]): void {
    const builder = {
        npm: (p: string) => `npm install ${p} --save-dev`,
        pnpm: (p: string) => `pnpm install ${p} --save-dev`,
        yarn: (p: string) => `yarn add ${p} -dev`
    }

    const packageManager = _getUsedPackageManager()
    const cmd = builder[packageManager](deps.join(" "))
    execSync(cmd, { stdio: "inherit" })
}

function _addWdi5Script(fileName: string, ts: boolean = false): void {
    const builder = {
        npm: (f: string) => `npm pkg set scripts.wdi5="wdio run ${f}${ts ? appendTsNodeOpts() : ""}"`,
        // pnpm doesn't support the pgk command. we have to rely on a remote package to add scripts to package.json
        pnpm: (f: string) => `pnpx npm-add-script -k wdi5 -v "wdio run ${f}${ts ? appendTsNodeOpts() : ""}"`,
        // yarn doesn't support pgk and has no npx equivalent. npx requires confirmation with "y"
        yarn: (f: string) => `echo y | npx npm-add-script -k wdi5 -v "wdio run ${f}${ts ? appendTsNodeOpts() : ""}"`
    }

    const packageManager = _getUsedPackageManager()
    const cmd = builder[packageManager](fileName)
    execSync(cmd, { stdio: "inherit" })
}

function appendTsNodeOpts() {
    return ""
    // return ` --autoCompileOpts.tsNodeOpts.project=test/tsconfig.json`
}
