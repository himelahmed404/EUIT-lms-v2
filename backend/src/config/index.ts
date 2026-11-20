import "dotenv/config";

export function readConfig() {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    throw new Error("Set DATABASE_URL in backend/.env before starting the server.");
  }
  const port = Number(process.env.PORT ?? 4000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer from 1 through 65535.");
  }
  return { databaseUrl, port };
}
