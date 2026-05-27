import { prisma } from "@/db/prisma";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function userListController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const users = await prisma.user.findMany();
	return reply.status(200).send(users);
}
