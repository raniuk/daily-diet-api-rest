import request from "supertest";
import { app } from "../../app";

describe("Food (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get foods by user", async () => {
    const userResponse = await request(app.server)
      .post("/users")
      .send({ name: "James Roe", email: "james@mail.com" })
      .expect(201);

    const cookies = userResponse.get("Set-Cookie");

    const foodResponse = await request(app.server)
      .post("/foods")
      .set("Cookie", cookies)
      .send({
        name: "Cake",
        description: "lorem ipsum",
        isOnDiet: true,
        userId: userResponse.body.id,
      })
      .expect(201);

    const foods = await request(app.server).get("/foods").set("Cookie", cookies).expect(200);

    expect(foods.body).toHaveLength(1);

    await request(app.server)
      .delete("/foods/" + foodResponse.body.id)
      .set("Cookie", cookies)
      .expect(204);

    await request(app.server)
      .delete("/users/" + userResponse.body.id)
      .expect(204);
  });

  it("should be able to get food by id", async () => {
    const userResponse = await request(app.server)
      .post("/users")
      .send({ name: "James Roe", email: "james@mail.com" })
      .expect(201);

    const cookies = userResponse.get("Set-Cookie");

    const foodResponse = await request(app.server)
      .post("/foods")
      .set("Cookie", cookies)
      .send({
        name: "Cake",
        description: "lorem ipsum",
        isOnDiet: true,
        userId: userResponse.body.id,
      })
      .expect(201);

    await request(app.server)
      .get("/foods/" + foodResponse.body.id)
      .set("Cookie", cookies)
      .expect(200);

    await request(app.server)
      .delete("/foods/" + foodResponse.body.id)
      .set("Cookie", cookies)
      .expect(204);

    await request(app.server)
      .delete("/users/" + userResponse.body.id)
      .expect(204);
  });

  it("should be able to create food", async () => {
    const userResponse = await request(app.server)
      .post("/users")
      .send({ name: "James Roe", email: "james@mail.com" })
      .expect(201);

    const cookies = userResponse.get("Set-Cookie");

    const foodResponse = await request(app.server)
      .post("/foods")
      .set("Cookie", cookies)
      .send({
        name: "Cake",
        description: "lorem ipsum",
        isOnDiet: true,
        userId: userResponse.body.id,
      })
      .expect(201);

    await request(app.server)
      .delete("/foods/" + foodResponse.body.id)
      .set("Cookie", cookies)
      .expect(204);

    await request(app.server)
      .delete("/users/" + userResponse.body.id)
      .expect(204);
  });

  it("should be able to update food", async () => {
    const userResponse = await request(app.server)
      .post("/users")
      .send({ name: "James Roe", email: "james@mail.com" })
      .expect(201);

    const cookies = userResponse.get("Set-Cookie");

    const foodResponse = await request(app.server)
      .post("/foods")
      .set("Cookie", cookies)
      .send({
        name: "Cake",
        description: "lorem ipsum",
        isOnDiet: true,
        userId: userResponse.body.id,
      })
      .expect(201);

    await request(app.server)
      .put("/foods/" + foodResponse.body.id)
      .set("Cookie", cookies)
      .send({
        name: "Lime juice",
        description: "lorem ipsum",
        isOnDiet: false,
        userId: userResponse.body.id,
      })
      .expect(200);

    await request(app.server)
      .delete("/foods/" + foodResponse.body.id)
      .set("Cookie", cookies)
      .expect(204);

    await request(app.server)
      .delete("/users/" + userResponse.body.id)
      .expect(204);
  });

  it("should be able to delete food", async () => {
    const userResponse = await request(app.server)
      .post("/users")
      .send({ name: "James Roe", email: "james@mail.com" })
      .expect(201);

    const cookies = userResponse.get("Set-Cookie");

    const foodResponse = await request(app.server)
      .post("/foods")
      .set("Cookie", cookies)
      .send({
        name: "Cake",
        description: "lorem ipsum",
        isOnDiet: true,
        userId: userResponse.body.id,
      })
      .expect(201);

    await request(app.server)
      .delete("/foods/" + foodResponse.body.id)
      .set("Cookie", cookies)
      .expect(204);

    await request(app.server)
      .delete("/users/" + userResponse.body.id)
      .expect(204);
  });

  it("should be able to get food metrics", async () => {
    const userResponse = await request(app.server)
      .post("/users")
      .send({ name: "James Roe", email: "james@mail.com" })
      .expect(201);

    const cookies = userResponse.get("Set-Cookie");

    const foodResponse = await request(app.server)
      .post("/foods")
      .set("Cookie", cookies)
      .send({
        name: "Cake",
        description: "lorem ipsum",
        isOnDiet: true,
        userId: userResponse.body.id,
      })
      .expect(201);

    const foodMetrics = await request(app.server)
      .get("/foods/metrics")
      .set("Cookie", cookies)
      .expect(200);

    expect(foodMetrics.body.totalFoods).toEqual(1);

    await request(app.server)
      .delete("/foods/" + foodResponse.body.id)
      .set("Cookie", cookies)
      .expect(204);

    await request(app.server)
      .delete("/users/" + userResponse.body.id)
      .expect(204);
  });
});
