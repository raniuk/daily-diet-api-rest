import { FoodDto } from "src/domain/models/food-dto";
import { FoodRepository } from "src/domain/ports/driven/food-repository";
import { FoodUseCase } from "src/domain/ports/driver/food-usecase";

export class FoodUseCases implements FoodUseCase {
  constructor(private foodRepository: FoodRepository) {}

  async getFoodById(id: string) {
    const food = await this.foodRepository.getById(id);

    return {
      id: food.id,
      name: food.name,
      description: food.description,
      isOnDiet: food.is_on_diet,
      userId: food.user_id,
      createdAt: food.created_at,
    };
  }

  async getFoodsByUser(userId: string) {
    let foods: Array<FoodDto> = [];
    const foodsResult = await this.foodRepository.getByUserId(userId);

    foodsResult.forEach((food) => {
      foods.push({
        id: food.id,
        name: food.name,
        description: food.description,
        isOnDiet: food.is_on_diet,
        userId: food.user_id,
        createdAt: food.created_at,
      });
    });

    return foods;
  }

  async createFood(food: FoodDto) {
    const foodId: string = await this.foodRepository.create({
      id: "",
      name: food.name,
      description: food.description,
      is_on_diet: food.isOnDiet,
      user_id: food.userId,
      created_at: food.createdAt ?? new Date(),
    });

    return foodId;
  }

  async updateFood(food: FoodDto) {
    if (!food.id) {
      throw new Error("foodId is empty");
    }

    await this.foodRepository.update({
      id: food.id,
      name: food.name,
      description: food.description,
      is_on_diet: food.isOnDiet,
      user_id: food.userId,
      created_at: food.createdAt ?? new Date(),
    });
  }

  async deleteFood(id: string) {
    await this.foodRepository.delete(id);
  }

  async getFoodMetrics(userId: string) {
    const foodsByUser = await this.foodRepository.getByUserId(userId);

    const totalFoods = foodsByUser.length;

    let foodOnDiet = true;
    const totalFoodsOnDiet = await this.foodRepository.getFoodsOnOffDiet(
      userId,
      foodOnDiet
    );

    const totalFoodsOffDiet = await this.foodRepository.getFoodsOnOffDiet(
      userId,
      !foodOnDiet
    );

    const { bestOnDietSequence } = foodsByUser.reduce(
      (acc, food) => {
        acc.onDietSequence = food.is_on_diet ? acc.onDietSequence + 1 : 0;

        if (acc.onDietSequence > acc.bestOnDietSequence) {
          acc.bestOnDietSequence = acc.onDietSequence;
        }

        return acc;
      },
      { bestOnDietSequence: 0, onDietSequence: 0 }
    );

    return {
      totalFoods,
      totalFoodsOnDiet,
      totalFoodsOffDiet,
      bestOnDietSequence,
    };
  }
}
