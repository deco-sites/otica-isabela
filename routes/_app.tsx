// deno-lint-ignore-file no-explicit-any
import { AppProps } from "$fresh/server.ts";
import GlobalTags from "$store/components/GlobalTags.tsx";
import Theme from "$store/sections/Theme/Theme.tsx";
import { RenderScripts, SCRIPT_CONTEXT } from "../components/Script.tsx";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

const wasm = async () => {
  try {
    const wasmItem = await fetch(
      "/scripts/experimentador/utils/master-tryon.wasm",
    );
    (globalThis as any).objWasm = wasmItem.clone();
    await wasmItem.arrayBuffer();
    (globalThis as any).arquivosCache = true;
  } catch (err) {
    (globalThis as any).arquivosCache = true;
  }
};

function App(props: AppProps) {
  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <GlobalTags />

      <SCRIPT_CONTEXT.Provider value={[]}>
        {/* Rest of Preact tree */}
        <props.Component />

        <RenderScripts />
        {/* Include service worker */}
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
        />
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: `(${wasm})();` }}
        />
      </SCRIPT_CONTEXT.Provider>
    </>
  );
}

export default App;
