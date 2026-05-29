import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { makeRegisterFactoryUseCase } from "@/use-cases/factories/make-register-use-case";

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
		const { registerUseCase } = makeRegisterFactoryUseCase();

		await registerUseCase.execute({
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
