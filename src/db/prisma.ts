import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/prisma/generated/prisma/client/client";
import { Pool } from "pg";
import { env } from "@/config/env";

const connectionString = env.DATABASE_URL;
if (!connectionString) {
	throw new Error("DATABASE_URL is required");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
	adapter,
	log: env.NODE_ENV === "development" ? ["query"] : [],
});
