import { prisma } from "@/db/prisma";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function userDetailController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const paramsSchema = z.object({
		id: z.string().uuid(),
	});

	const { id } = paramsSchema.parse(request.params);

	if (!id) {
		return reply.status(404).send("User not found");
	}

	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});
	return reply.status(200).send(user);
}
