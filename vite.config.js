import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import publicAssetsPlugin from "./src/data/publicAssetsPlugin.js";
import buildInfoPlugin from "./src/data/buildInfoPlugin.js";

export default defineConfig({
  plugins: [react(), tailwindcss(), publicAssetsPlugin(), buildInfoPlugin()],
});
