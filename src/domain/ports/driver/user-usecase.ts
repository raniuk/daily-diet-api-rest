import { UserDto } from "src/domain/models/user-dto";

export interface UserUseCase {
  getUserBySessionId(sessionId: string): Promise<UserDto>;

  createUser(user: UserDto): Promise<string>;

  deleteUser(id: string): Promise<void>;
}
