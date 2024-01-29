import { FoodDto } from "src/domain/models/food-dto";
import { FoodMetricDto } from "src/domain/models/food-metric-dto";

export interface FoodUseCase {
  getFoodById(id: string): Promise<FoodDto>;

  getFoodsByUser(userId: string): Promise<Array<FoodDto>>;

  createFood(food: FoodDto): Promise<string>;

  updateFood(food: FoodDto): Promise<void>;

  deleteFood(id: string): Promise<void>;

  getFoodMetrics(userId: string): Promise<FoodMetricDto>;
}
