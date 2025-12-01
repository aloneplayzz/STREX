import { build as viteBuild } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

async function buildForVercel() {
  console.log("Building frontend for Vercel...");
  
  await viteBuild({
    plugins: [react()],
    root: path.resolve(projectRoot, "client"),
    resolve: {
      alias: {
        "@": path.resolve(projectRoot, "client", "src"),
        "@shared": path.resolve(projectRoot, "shared"),
        "@assets": path.resolve(projectRoot, "attached_assets"),
      },
    },
    build: {
      outDir: path.resolve(projectRoot, "dist/public"),
      emptyOutDir: true,
    },
  });
  
  console.log("Frontend built successfully!");
}

buildForVercel().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
