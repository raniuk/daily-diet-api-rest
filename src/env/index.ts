import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3000),
  DATABASE_CLIENT: z.string().default("pg"),
  DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  const errorMessage = "Invalid environment variables";

  console.error(errorMessage, _env.error.format());

  throw new Error(errorMessage);
}

export const env = _env.data;
