#!/usr/bin/env node

require("dotenv").config();
const app = require("./src/server");

// Render provides PORT automatically
const PORT = process.env.PORT || 6000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║                                                            ║");
  console.log("║                🚀 StudySync API Server                     ║");
  console.log("║                                                            ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log(`║  Server:           http://0.0.0.0:${PORT}                   ║`);
  console.log(`║  API Docs:         /api-docs                                ║`);
  console.log(`║  Health Check:     /health                                  ║`);
  console.log(`║  Swagger JSON:     /swagger.json                            ║`);
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log(`║  Environment:      ${process.env.NODE_ENV || "production"}               ║`);
  console.log("╚════════════════════════════════════════════════════════════╝\n");
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("\n🛑 SIGTERM received. Closing server...");
  server.close(() => process.exit(0));
});

process.on("SIGINT", () => {
  console.log("\n🛑 SIGINT received. Closing server...");
  server.close(() => process.exit(0));
});
