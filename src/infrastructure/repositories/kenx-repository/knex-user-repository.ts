import { randomUUID } from "node:crypto";

import { User } from "src/domain/entities/user";
import { UserRepository } from "src/domain/ports/driven/user-repository";
import { knex } from "./knex-database-config";

export class KnexUserRepository implements UserRepository {
  async getBySessionId(session_id: string): Promise<User> {
    const user = await knex("users").where({ session_id }).first();

    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await knex("users").where({ email }).first();

    return user;
  }

  async create({ name, email, session_id }: User) {
    const id = randomUUID();

    await knex("users").insert({
      id,
      name,
      email,
      session_id,
    });

    return id;
  }

  async delete(id: string) {
    await knex("users").where({ id }).delete();
  }
}
