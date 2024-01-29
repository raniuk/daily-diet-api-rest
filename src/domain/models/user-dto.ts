export class UserDto {
  id?: string;
  name: string;
  email: string;
  sessionId: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.sessionId = "";
  }
}
