import { Knex, knex as setupKnex } from "knex";
import { env } from "src/env";

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: env.DATABASE_URL,
  searchPath: ["knex", "public"],
};

export const knex = setupKnex(config);
