#!/usr/bin/env node

/**
 * Local Development Bootstrap
 * This file only loads environment variables
 * and imports the main server.
 * The actual app.listen() lives in src/server.js
 */

require("dotenv").config();

// Importing server automatically starts it
require("./src/server");

process.on("SIGTERM", () => {
  console.log("\n🛑 SIGTERM received. Shutting down...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("\n🛑 SIGINT received. Shutting down...");
  process.exit(0);
});
