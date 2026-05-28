import Fastify from "fastify";
import { registerRoute } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./config/env";

export const app = Fastify();

app.register(registerRoute);

app.setErrorHandler((error, _request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: "Validation errors",
			error: error.issues.map((issue) => issue.message),
		});
	}

	if (env.NODE_ENV !== "production") {
		console.error(error);
	} else {
		// TODO: Here you can log the error to a file or send it to a third-party service like Sentry/DataDog
		console.error(error);
	}
	return reply.status(500).send("Internal server error");
});
