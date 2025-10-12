const { defineConfig, globalIgnores } = require("eslint/config")

const tsParser = require("@typescript-eslint/parser")
const typescriptEslint = require("@typescript-eslint/eslint-plugin")
const js = require("@eslint/js")

const { FlatCompat } = require("@eslint/eslintrc")

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

module.exports = defineConfig([
    {
        extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),

        languageOptions: {
            parser: tsParser,

            parserOptions: {
                project: ["./tsconfig.json"]
            }
        },

        plugins: {
            "@typescript-eslint": typescriptEslint
        }
    },
    globalIgnores(["templates/**/*", "**/.eslintrc.js", "bin/**/*"])
])
