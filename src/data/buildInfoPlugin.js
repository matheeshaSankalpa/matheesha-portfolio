import { execFileSync } from "node:child_process";
import process from "node:process";

// Identify the deployed source without relying on a cached Vercel alias.
export default function buildInfoPlugin() {
  let root;
  return {
    name: "portfolio-build-info",
    configResolved(config) {
      root = config.root;
    },
    generateBundle() {
      const commit =
        process.env.VERCEL_GIT_COMMIT_SHA ||
        execFileSync("git", ["rev-parse", "HEAD"], {
          cwd: root,
          encoding: "utf8",
        }).trim();
      this.emitFile({
        type: "asset",
        fileName: "build-info.json",
        source: JSON.stringify({ commit }) + "\n",
      });
    },
  };
}
