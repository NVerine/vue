module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential"],
    rules: {
        'no-console': 'off',
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "vue/no-use-v-if-with-v-for": "off",
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "indent": ["error", 2],

        // override default options for rules from base configurations
        // "comma-dangle": ["error", "always"],
        "no-cond-assign": ["error", "always"]
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};
