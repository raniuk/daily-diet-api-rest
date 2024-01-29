export class FoodDto {
  id?: string;
  name: string;
  description: string;
  isOnDiet: boolean;
  userId: string;
  createdAt?: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    isOnDiet: boolean,
    userId: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isOnDiet = isOnDiet;
    this.userId = userId;
    this.createdAt = new Date();
  }
}
