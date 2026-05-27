import Fastify from "fastify";
import { registerRoute } from "./http/routes";

export const app = Fastify();

app.register(registerRoute);
