import { FastifyReply, FastifyRequest } from "fastify";
import { ApplicationFactory } from "src/application/application-factory";

export async function checkSession(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sessionId = request.cookies.sessionId;

  if (!sessionId) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  const userUseCase = ApplicationFactory.userUseCase();

  const user = await userUseCase.getUserBySessionId(sessionId);

  if (!user) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  request.user = user;
}
