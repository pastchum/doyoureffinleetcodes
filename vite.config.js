import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          // Copy the manifest from "public/" to the build root.
          src: "public/manifest.json",
          dest: ".",
        },
        {
          // Copy the DNR rules file from "public/" to the build root.
          src: "public/rules1.json",
          dest: ".",
        },
      ],
    }),
  ],
  build: {
    outDir: "build", // or any folder you prefer
    rollupOptions: {
      input: {
        // "main" is your index.html (the extension popup or UI entry point)
        main: "./index.html",
        // "background" is your background script entry in TypeScript.
        background: resolve(__dirname, "src/background.js"),
      },
      output: {
        // The filenames for different entry points.
        // If the chunk is named "background", the output becomes "background.js".
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
