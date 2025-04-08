import { defineConfig } from "$fresh/server.ts";
import { plugins } from "deco/plugins/deco.ts";
import partytownPlugin from "partytown/mod.ts";
import manifest from "./manifest.gen.ts";
import tailwind from "./tailwind.config.ts";

export default defineConfig({
  plugins: [
    ...plugins({
      manifest,
      // deno-lint-ignore no-explicit-any
    }),
    partytownPlugin(),
  ],
});
