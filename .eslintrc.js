module.exports = {
    root: true,
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["./tsconfig.json"]
    },
    plugins: ["@typescript-eslint"],
    ignorePatterns: ["templates/**/*", ".eslintrc.js", "bin/**/*"]
}