import { User } from "src/domain/entities/user";

export interface UserRepository {
  getBySessionId(sessionId: string): Promise<User>;

  getByEmail(email: string): Promise<User>;

  create(user: User): Promise<string>;

  delete(userId: string): Promise<void>;
}
