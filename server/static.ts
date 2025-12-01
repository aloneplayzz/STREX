import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Multiple path resolution strategies for Hostinger compatibility
  
  // Strategy 1: Relative to current working directory (most reliable for Hostinger)
  let distPath = path.resolve(process.cwd(), "dist", "public");
  
  // Strategy 2: Relative to __dirname (dist folder location during bundled execution)
  if (!fs.existsSync(distPath)) {
    distPath = path.resolve(__dirname, "public");
  }
  
  // Strategy 3: Parent directory of __dirname
  if (!fs.existsSync(distPath)) {
    distPath = path.resolve(__dirname, "..", "dist", "public");
  }

  console.log(`[Static Server] Attempting to serve from: ${distPath}`);
  
  if (!fs.existsSync(distPath)) {
    console.error(`[Static Server] ERROR: Could not find build directory`);
    console.error(`[Static Server] Tried: ${distPath}`);
    console.error(`[Static Server] cwd: ${process.cwd()}`);
    console.error(`[Static Server] __dirname: ${__dirname}`);
    
    // Try to list what files exist
    try {
      const cwd = process.cwd();
      const files = fs.readdirSync(cwd);
      console.error(`[Static Server] Files in cwd: ${files.join(", ")}`);
    } catch (e) {
      console.error(`[Static Server] Could not list files in cwd`);
    }
    
    throw new Error(
      `Could not find the build directory at ${distPath}. Make sure to run 'npm run build' before starting the server.`,
    );
  }

  console.log(`[Static Server] Successfully found build directory`);
  console.log(`[Static Server] Serving static files from: ${distPath}`);

  // Serve static files with cache headers for performance
  app.use(express.static(distPath, {
    maxAge: "1d",
    etag: false,
  }));

  // Serve index.html for all routes that don't match static files (SPA routing)
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.sendFile(indexPath);
    } else {
      console.error(`[Static Server] index.html not found at: ${indexPath}`);
      res.status(404).send("Not Found - index.html missing");
    }
  });
}
