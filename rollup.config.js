import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import {uglify} from "rollup-plugin-uglify";
import pkg from "./package.json";

const input = "out/build/main.js";
const umdOutput = {
    name: "WebDicom",
    file: pkg.browser,
    format: "umd",
    sourcemap: true,
};
const esOutput = {
    file: pkg.module,
    format: "es",
    sourcemap: true,
};

export default [
    // browser-friendly UMD build, minified
    {
        input: input,
        output: umdOutput,
        context: "window",
        plugins: [
            resolve(),
            commonjs(),
            //uglify(),
            sourcemaps(),
        ]
    },
    // ES module build for bundlers.
    {
        input: input,
        output: esOutput,
        external: ["tslib"],
        plugins: [
            sourcemaps(),
        ]
    }
];
