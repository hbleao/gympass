import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { makeAuthenticateFactoryUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticateController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, password } = authenticateBodySchema.parse(request.body);

	try {
		const { authenticateUseCase } = makeAuthenticateFactoryUseCase();

		await authenticateUseCase.execute({
			email,
			password,
		});

		return reply.status(200).send();
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(400).send(error.message);
		}

		return reply.status(500).send("Internal server error"); // TODO: Log error
	}
}
