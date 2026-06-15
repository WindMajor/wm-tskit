import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    array: "src/array.ts",
    object: "src/object.ts",
    string: "src/string.ts",
    function: "src/function.ts",
    is: "src/is.ts",
    types: "src/types.ts",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  treeshake: true,
});
