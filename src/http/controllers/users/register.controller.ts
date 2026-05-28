import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { PrismaUserRepository } from "@/repositories/prisma-user-repository";
import { RegisterUserCase } from "@/use-cases/register";
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

	try {
		const prismaUserRepository = new PrismaUserRepository();
		const registerUserCase = new RegisterUserCase(prismaUserRepository);

		await registerUserCase.execute({
			name,
			email,
			password,
		});

		return reply.status(201).send("User registered successfully");
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send(error.message);
		}

		return reply.status(500).send("Internal server error"); // TODO: Log error
	}
}
