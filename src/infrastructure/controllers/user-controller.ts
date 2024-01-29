import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { ApplicationFactory } from "src/application/application-factory";
import { z } from "zod";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  let sessionId = request.cookies.sessionId;

  if (!sessionId) {
    sessionId = randomUUID();

    reply.setCookie("sessionId", sessionId, {
      path: "/",
      maxAge: 1000 * 60 * 60 * 24,
    });
  }

  const { name, email } = createUserBodySchema.parse(request.body);

  try {
    const userUseCase = ApplicationFactory.userUseCase();

    const userId = await userUseCase.createUser({
      name,
      email,
      sessionId,
    });

    return reply.status(201).send({ id: userId });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({ id: z.string().uuid() });

  const { id } = paramsSchema.parse(request.params);

  try {
    const userUseCase = ApplicationFactory.userUseCase();

    /* const food = await userUseCase.getUserById(id);

    if (!food) {
      return reply.status(404).send({ error: "Food not found" });
    } */

    await userUseCase.deleteUser(id);

    return reply.status(204).send();
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }
}
