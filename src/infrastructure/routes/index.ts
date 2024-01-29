import { FastifyInstance } from "fastify";

import { checkSession } from "../../middlewares/check-session";

import {
  createFood,
  deleteFood,
  getFoodById,
  getFoodMetrics,
  getFoodsByUserId,
  updateFood,
} from "../controllers/food-controller";
import { createUser, deleteUser } from "../controllers/user-controller";

export async function appRoute(app: FastifyInstance) {
  app.post("/users", createUser);
  app.delete("/users/:id", deleteUser);

  app.get("/foods", { preHandler: [checkSession] }, getFoodsByUserId);
  app.get("/foods/:id", { preHandler: [checkSession] }, getFoodById);
  app.post("/foods", { preHandler: [checkSession] }, createFood);
  app.put("/foods/:id", { preHandler: [checkSession] }, updateFood);
  app.delete("/foods/:id", { preHandler: [checkSession] }, deleteFood);
  app.get("/foods/metrics", { preHandler: [checkSession] }, getFoodMetrics);
}
