import { app } from "./app";

import { env } from "./config/env";

async function bootstrap() {
	await app.listen({ port: env.PORT, host: "0.0.0.0" });
	console.log(`Server is running on port ${env.PORT}`);
}

bootstrap();
