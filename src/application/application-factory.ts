import { RepositoryFactory } from "src/infrastructure/repositories/repository-factory";

import { FoodUseCases } from "src/application/usecases/food-usecases";
import { UserUseCases } from "src/application/usecases/user-usecases";

export class ApplicationFactory {
  private static userRepository = RepositoryFactory.userRepository();
  private static foodRepository = RepositoryFactory.foodRepository();

  public static userUseCase() {
    const userUseCase = new UserUseCases(this.userRepository);

    return userUseCase;
  }

  public static foodUseCase() {
    const foodUseCase = new FoodUseCases(this.foodRepository);

    return foodUseCase;
  }
}
