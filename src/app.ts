import Fastify, { type FastifyInstance } from "fastify";
import z, { ZodError } from "zod";
import { prisma } from "./db/prisma";

export const app = Fastify();

app.get("/health", async (request, reply) => {
	return reply.status(200).send("Healthy");
});

app.post("/users", async (request, reply) => {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { name, email, password } = registerBodySchema.parse(request.body);

	await prisma.user.create({
		data: {
			name,
			email,
			password_hash: password,
		},
	});

	return reply.status(201).send("User registered successfully");
});

app.get("/users", async (request, reply) => {
	const users = await prisma.user.findMany();
	return reply.status(200).send(users);
});
