import { KnexFoodRepository } from "./kenx-repository/knex-food-repository";
import { KnexUserRepository } from "./kenx-repository/knex-user-repository";

export class RepositoryFactory {
  public static userRepository() {
    const userRepository = new KnexUserRepository();

    return userRepository;
  }

  public static foodRepository() {
    const foodRepository = new KnexFoodRepository();

    return foodRepository;
  }
}
