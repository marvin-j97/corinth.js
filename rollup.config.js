import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

const config = {
  input: "build/index.js",
  output: {
    file: "dist/corinthjs.js",
    format: "umd",
    name: "Corinth",
  },
  plugins: [
    commonjs(),
    resolve({
      only: ["haxan"],
    }),
  ],
};

export default config;
