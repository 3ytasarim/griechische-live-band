// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    server: {
      // Allow access via the Cloudflare quick-tunnel used for temporary preview sharing.
      allowedHosts: [".trycloudflare.com"],
    },
    optimizeDeps: {
      // These deep TanStack imports aren't discovered by Vite's dependency scanner (unlike
      // motion/lucide-react, which already get pre-bundled), so dev mode serves each of their
      // internal files as a separate unbundled request — very slow over a high-latency
      // connection like the Cloudflare tunnel. Forcing them into optimizeDeps collapses that
      // into a handful of pre-bundled chunks.
      // NOTE: don't add any "@tanstack/react-start*" / "@tanstack/start-*" packages here —
      // they transitively touch Node's AsyncLocalStorage (async_hooks), which breaks when
      // esbuild pre-bundles it for the browser. Only these two are safe to force-bundle.
      include: ["@tanstack/react-router", "@tanstack/react-query"],
    },
  },
});
