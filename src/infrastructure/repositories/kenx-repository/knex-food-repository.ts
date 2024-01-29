import { randomUUID } from "node:crypto";

import { Food } from "src/domain//entities/food";
import { FoodRepository } from "src/domain//ports/driven/food-repository";
import { knex } from "./knex-database-config";

export class KnexFoodRepository implements FoodRepository {
  async getById(id: string): Promise<Food> {
    const food = await knex("foods").where({ id }).first();

    return food;
  }

  async getByUserId(user_id: string): Promise<Array<Food>> {
    const foods = await knex("foods")
      .where({ user_id })
      .orderBy("created_at", "desc");

    return foods;
  }

  async create(food: Food) {
    const id = randomUUID();

    await knex("foods").insert({
      id,
      name: food.name,
      description: food.description,
      is_on_diet: food.is_on_diet,
      user_id: food.user_id,
      created_at: food.created_at,
    });

    return id;
  }

  async update(food: Food) {
    await knex("foods")
      .where({ id: food.id })
      .update({
        ...food,
      });
  }

  async delete(id: string) {
    await knex("foods").where({ id }).delete();
  }

  async getFoodsOnOffDiet(user_id: string, is_on_off_diet: boolean) {
    const totalFoodsOnOffDiet = await knex("foods")
      .where({ user_id, is_on_diet: is_on_off_diet })
      .count("id")
      .first();

    return Number(totalFoodsOnOffDiet?.count ?? 0);
  }
}
