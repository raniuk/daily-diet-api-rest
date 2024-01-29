import { Food } from "src/domain/entities/food";

export interface FoodRepository {
  getById(id: string): Promise<Food>;

  getByUserId(user_id: string): Promise<Array<Food>>;

  create(user: Food): Promise<string>;

  update(user: Food): Promise<void>;

  delete(id: string): Promise<void>;

  getFoodsOnOffDiet(user_id: string, is_on_off_diet: boolean): Promise<number>;
}
