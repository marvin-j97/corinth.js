const dts = require("rollup-plugin-dts").default;

const config = {
  input: "build/index.d.ts",
  output: {
    file: "index.d.ts",
    format: "umd",
    name: "Corinth",
  },
  plugins: [dts()],
};

export default config;
