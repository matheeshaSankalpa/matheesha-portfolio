import { existsSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

// Public images stay at their original URLs. Only filenames are bundled.
// New gallery images are still discovered automatically.
export default function publicAssetsPlugin() {
  const virtualId = "virtual:portfolio-assets";
  const resolvedId = "\0" + virtualId;
  let publicDirectory;
  const naturalOrder = new Intl.Collator("en", {
    numeric: true,
    sensitivity: "base",
  });

  function collect(folder) {
    const files = [];
    function walk(directory) {
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) walk(path);
        else if (/\.(jpe?g|png|webp|avif)$/i.test(entry.name)) {
          files.push(
            "/" + relative(publicDirectory, path).replaceAll("\\", "/"),
          );
        }
      }
    }
    const directory = join(publicDirectory, folder);
    if (existsSync(directory)) walk(directory);
    return files.sort(naturalOrder.compare);
  }

  return {
    name: "portfolio-public-assets",
    configResolved(config) {
      publicDirectory = config.publicDir;
    },
    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },
    load(id) {
      if (id !== resolvedId) return;
      return (
        "export const workImages = " +
        JSON.stringify(collect("work")) +
        ";\n" +
        "export const illustrationImages = " +
        JSON.stringify(collect("illustrations")) +
        ";"
      );
    },
    configureServer(server) {
      function refresh(file) {
        const normalized = file.replaceAll("\\", "/");
        if (!normalized.startsWith(publicDirectory.replaceAll("\\", "/") + "/"))
          return;
        const module = server.moduleGraph.getModuleById(resolvedId);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: "full-reload" });
      }
      server.watcher.on("add", refresh).on("unlink", refresh);
      server.httpServer?.once("close", () => {
        server.watcher.off("add", refresh).off("unlink", refresh);
      });
    },
  };
}
