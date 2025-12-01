/**
 * Production startup script for Hostinger deployment
 * This ensures NODE_ENV is set to production before starting the server
 */

import { exec } from "child_process";
import fs from "fs";
import path from "path";

// Ensure NODE_ENV is production
process.env.NODE_ENV = "production";

console.log("[Startup] NODE_ENV set to:", process.env.NODE_ENV);
console.log("[Startup] Current working directory:", process.cwd());
console.log("[Startup] Checking for dist/public...");

// Verify build files exist
const distPublicPath = path.resolve(process.cwd(), "dist", "public");
const indexCjsPath = path.resolve(process.cwd(), "dist", "index.cjs");

if (!fs.existsSync(distPublicPath)) {
  console.error("[Startup] ERROR: dist/public not found at", distPublicPath);
  console.error("[Startup] Please run: npm run build");
  process.exit(1);
}

if (!fs.existsSync(indexCjsPath)) {
  console.error("[Startup] ERROR: dist/index.cjs not found at", indexCjsPath);
  console.error("[Startup] Please run: npm run build");
  process.exit(1);
}

console.log("[Startup] Build files verified ✓");
console.log("[Startup] Starting server...\n");

// Import and start the actual server
import("./index.js").catch((err) => {
  console.error("[Startup] Failed to start server:", err);
  process.exit(1);
});
