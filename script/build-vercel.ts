import { build as viteBuild } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildForVercel() {
  console.log("Building frontend for Vercel...");
  await viteBuild({
    configFile: path.resolve(__dirname, "..", "vite.config.ts"),
  });
  console.log("Frontend built successfully!");
}

buildForVercel().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
