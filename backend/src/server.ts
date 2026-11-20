import { createServer } from "node:http";
import { app } from "./app.js";
import { readConfig } from "./config/index.js";
import { getPrisma } from "./lib/prisma.js";

async function main() {
  const { databaseUrl, port } = readConfig();
  const prisma = getPrisma(databaseUrl);

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    await prisma.$disconnect();
    throw new Error("Database connection failed. Check DATABASE_URL and connectivity.");
  }

  const server = createServer(app);
  server.once("close", () => {
    void prisma.$disconnect();
  });
  server.once("error", async (error) => {
    console.error("HTTP server failed:", error.message);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
  server.listen(port, () => console.log(`API listening on port ${port}`));
  const shutdown = () => server.close();
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

main().catch((error: Error) => {
  console.error(error.message);
  process.exitCode = 1;
});
