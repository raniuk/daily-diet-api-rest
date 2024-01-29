import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";

import { KnexFoodRepository } from "src/infrastructure/repositories/kenx-repository/knex-food-repository";
import { KnexUserRepository } from "src/infrastructure/repositories/kenx-repository/knex-user-repository";
import { FoodUseCases } from "./food-usecases";
import { UserUseCases } from "./user-usecases";

let userRepository: KnexUserRepository;
let userUseCase: UserUseCases;

let foodRepository: KnexFoodRepository;
let foodUseCase: FoodUseCases;

describe("CRUD food use cases", () => {
  beforeEach(() => {
    userRepository = new KnexUserRepository();
    userUseCase = new UserUseCases(userRepository);

    foodRepository = new KnexFoodRepository();
    foodUseCase = new FoodUseCases(foodRepository);
  });

  it("should to CRUD food", async () => {
    const userId: string = await userUseCase.createUser({
      name: "Julia",
      email: "julia@mail.com",
      sessionId: randomUUID(),
    });

    expect(userId).toEqual(expect.any(String));

    const foodId: string = await foodUseCase.createFood({
      name: "Cake",
      description: "lorem ipsum",
      isOnDiet: true,
      userId: userId,
    });

    expect(foodId).toEqual(expect.any(String));

    const userFoods = await foodUseCase.getFoodsByUser(userId);

    expect(userFoods.length).toEqual(1);

    const food = await foodUseCase.getFoodById(foodId);

    expect(food.name).toEqual("Cake");

    await foodUseCase.updateFood({
      id: foodId,
      name: "Orange juice",
      description: "lorem ipsum",
      isOnDiet: false,
      userId,
    });

    const foodMetrics = await foodUseCase.getFoodMetrics(userId);

    expect(foodMetrics.totalFoods).toEqual(1);
    expect(foodMetrics.totalFoodsOnDiet).toEqual(0);
    expect(foodMetrics.totalFoodsOffDiet).toEqual(1);
    expect(foodMetrics.bestOnDietSequence).toEqual(0);

    await foodUseCase.deleteFood(foodId);

    await userUseCase.deleteUser(userId);
  });
});
