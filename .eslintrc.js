module.exports = {
    "extends": "airbnb-base",
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        "indent": ["error", 4],
        "no-unused-vars": ["warn", { "vars": "local", "args": "none"}],
        "no-plusplus": 0,
        "max-len": ["warn", 180],
        "one-var": 0,
        "no-console": "off",
        "arrow-body-style": "off",
    },
};