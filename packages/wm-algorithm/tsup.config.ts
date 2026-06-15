import { glob } from "glob";
import { defineConfig } from "tsup";

const lcFiles = glob.sync("src/lc*.ts");

const lcEntries = Object.fromEntries(
  lcFiles.map((file) => [file.replace(/^src\/|\.ts$/g, ""), file])
);

export default defineConfig({
  entry: { ...lcEntries, index: "src/index.ts" },
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
});
