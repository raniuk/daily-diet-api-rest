import { randomUUID } from "crypto";
import { KnexUserRepository } from "src/infrastructure/repositories/kenx-repository/knex-user-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UserUseCases } from "./user-usecases";

let userRepository: KnexUserRepository;
let userUseCase: UserUseCases;

describe("Create user use case", () => {
  beforeEach(() => {
    userRepository = new KnexUserRepository();
    userUseCase = new UserUseCases(userRepository);
  });

  it("should to create", async () => {
    const userId: string = await userUseCase.createUser({
      name: "Jeen",
      email: "jeen@mail.com",
      sessionId: randomUUID(),
    });

    expect(userId).toEqual(expect.any(String));

    await userUseCase.deleteUser(userId);
  });
});
