import { UserDto } from "src/domain/models/user-dto";
import { UserRepository } from "src/domain/ports/driven/user-repository";
import { UserUseCase } from "src/domain/ports/driver/user-usecase";

export class UserUseCases implements UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async getUserBySessionId(sessionId: string): Promise<UserDto> {
    const user = await this.userRepository.getBySessionId(sessionId);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      sessionId: user.session_id,
    };
  }

  async createUser(user: UserDto) {
    const findUser = await this.userRepository.getByEmail(user.email);

    if (findUser) {
      throw new Error("User already exists");
    }

    const id = await this.userRepository.create({
      id: "",
      name: user.name,
      email: user.email,
      session_id: user.sessionId,
    });

    return id;
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }
}
