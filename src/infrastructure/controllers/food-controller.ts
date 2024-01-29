import { FastifyReply, FastifyRequest } from "fastify";
import { ApplicationFactory } from "src/application/application-factory";
import { z } from "zod";

export async function getFoodsByUserId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sessionSchema = z.object({ id: z.string().uuid() });

  const { id } = sessionSchema.parse(request.user);

  try {
    const foodUseCase = ApplicationFactory.foodUseCase();

    const food = await foodUseCase.getFoodsByUser(id);

    if (!food) {
      return reply.status(404).send({ error: "Food not found" });
    }

    return reply.status(200).send(food);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }
}

export async function getFoodById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sessionSchema = z.object({ id: z.string().uuid() });

  const { id } = sessionSchema.parse(request.params);

  try {
    const foodUseCase = ApplicationFactory.foodUseCase();

    const food = await foodUseCase.getFoodById(id);

    return reply.status(200).send(food);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }
}

export async function createFood(request: FastifyRequest, reply: FastifyReply) {
  const sessionSchema = z.object({ id: z.string().uuid() });

  const { id } = sessionSchema.parse(request.user);

  const createFoodBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    isOnDiet: z.boolean(),
  });

  const { name, description, isOnDiet } = createFoodBodySchema.parse(
    request.body
  );

  if (!request.user) {
    return reply.status(500).send({ message: "User not exist" });
  }

  try {
    const foodUseCase = ApplicationFactory.foodUseCase();

    const foodId = await foodUseCase.createFood({
      name,
      description,
      isOnDiet,
      userId: id,
    });

    return reply.status(201).send({ id: foodId });
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }
}

export async function updateFood(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({ id: z.string().uuid() });

  const { id } = paramsSchema.parse(request.params);

  const updateFoodBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    isOnDiet: z.boolean(),
  });

  const { name, description, isOnDiet } = updateFoodBodySchema.parse(
    request.body
  );

  try {
    const foodUseCase = ApplicationFactory.foodUseCase();

    const food = await foodUseCase.getFoodById(id);

    if (!food) {
      return reply.status(404).send({ error: "Food not found" });
    }

    await foodUseCase.updateFood({
      id,
      name,
      description,
      isOnDiet,
      userId: food.userId,
    });

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }
}

export async function deleteFood(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({ id: z.string().uuid() });

  const { id } = paramsSchema.parse(request.params);

  try {
    const foodUseCase = ApplicationFactory.foodUseCase();

    const food = await foodUseCase.getFoodById(id);

    if (!food) {
      return reply.status(404).send({ error: "Food not found" });
    }

    await foodUseCase.deleteFood(id);

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }
}

export async function getFoodMetrics(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sessionSchema = z.object({ id: z.string().uuid() });

  const { id } = sessionSchema.parse(request.user);

  try {
    const foodUseCase = ApplicationFactory.foodUseCase();

    const foodMetrics = await foodUseCase.getFoodMetrics(id);

    return reply.status(200).send(foodMetrics);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }
}
