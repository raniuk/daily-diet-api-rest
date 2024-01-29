import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", function (table) {
      table.string("id").primary();
      table.string("name", 40).notNullable();
      table.string("email", 50).notNullable();
      table.string("session_id", 50).notNullable();
    })
    .createTable("foods", function (table) {
      table.string("id").primary();
      table.string("name", 50).notNullable();
      table.string("description", 200).notNullable();
      table.boolean("is_on_diet").notNullable();
      table.string("user_id", 50).notNullable();
      table.datetime("created_at").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("foods").dropTable("users");
}
