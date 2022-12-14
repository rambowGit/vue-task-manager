module.exports = {
  root: true,
  env: {
    node: true,
		es2021: true,
		browser: true
  },
	globals: {
		M: "writable"
	},
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/airbnb",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "vue/no-unused-components": "off",
    quotes: ["error", "double"],
    "comma-dangle": "off",
    "no-unused-vars": "off",
    "max-len": "off",
    "no-param-reassign": "off",
    "no-tabs": 0,
    "no-trailing-spaces": 0,
		indent: ["off", 2],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
