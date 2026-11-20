import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";

let client: PrismaClient | undefined;

export function getPrisma(databaseUrl: string): PrismaClient {
  client ??= new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseUrl, connectionTimeoutMillis: 10000 }),
  });
  return client;
}
