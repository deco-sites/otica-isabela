/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="deno.ns" />
/// <reference lib="esnext" />

import { start } from "$fresh/server.ts";
import plugins from "deco-sites/std/plugins/mod.ts";
import partytownPlugin from "partytown/mod.ts";
import manifest from "./fresh.gen.ts";
import decoManifest from "./manifest.gen.ts";

await start(manifest, {
  plugins: [
    ...plugins(
      {
        //@ts-ignore Um erro bizarro acontecendo quando remove o ts-ignore
        manifest: decoManifest,
      },
    ),
    partytownPlugin(),
  ],
});
