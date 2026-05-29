import type { FastifyInstance } from "fastify";
import { registerController } from "../controllers/users/register.controller";
import { userListController } from "../controllers/users/list.controller";
import { userDetailController } from "../controllers/users/detail.controller";
import { authenticateController } from "../controllers/auth/authenticate.controller";

export async function registerRoute(app: FastifyInstance) {
	app.post("/users", registerController);
	app.get("/users", userListController);
	app.get("/users/:id", userDetailController);

	app.post("sessions", authenticateController);
}
