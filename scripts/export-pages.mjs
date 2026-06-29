import { copyFile, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const dist = join(root, "dist");

async function copyDir(source, target) {
  await mkdir(target, { recursive: true });
  const entries = await readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = join(source, entry.name);
    const targetPath = join(target, entry.name);

    if (entry.isDirectory()) {
      await copyDir(sourcePath, targetPath);
    } else if (entry.isFile()) {
      await mkdir(dirname(targetPath), { recursive: true });
      await copyFile(sourcePath, targetPath);
    }
  }
}

await rm(join(root, "_astro"), { recursive: true, force: true });
await rm(join(root, "es"), { recursive: true, force: true });
await rm(join(root, "games"), { recursive: true, force: true });
await copyDir(dist, root);
await writeFile(join(root, ".nojekyll"), "");

console.log("GitHub Pages static files exported to repository root.");
