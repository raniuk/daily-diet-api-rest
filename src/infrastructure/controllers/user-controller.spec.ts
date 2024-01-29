import request from "supertest";
import { app } from "../../app";

describe("User (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create user", async () => {
    const response = await request(app.server)
      .post("/users")
      .send({ name: "John Doe", email: "john@mail.com" })
      .expect(201);

    await request(app.server)
      .delete("/users/" + response.body.id)
      .expect(204);

    const cookies = response.get("Set-Cookie");

    expect(cookies).toEqual(
      expect.arrayContaining([expect.stringContaining("sessionId")])
    );
  });
});
