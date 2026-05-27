import { prisma } from "@/db/prisma";
import bcrypt from "bcrypt";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function registerController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { name, email, password } = registerBodySchema.parse(request.body);

	const userExists = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (userExists) {
		return reply.status(409).send();
	}

	const passwordHash = await bcrypt.hash(password, 10);

	await prisma.user.create({
		data: {
			name,
			email,
			password_hash: passwordHash,
		},
	});

	return reply.status(201).send("User registered successfully");
}
