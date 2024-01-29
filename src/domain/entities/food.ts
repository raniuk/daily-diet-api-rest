export class Food {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly is_on_diet: boolean,
    readonly user_id: string,
    readonly created_at: Date
  ) {}
}
