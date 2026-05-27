import { describe, expect, it } from "vitest";

import { buildApp } from "@/http/app";
import type {
	CreateUserInput,
	UserDTO,
	UserRepository,
} from "@/repositories/user-repository";

class InMemoryUserRepository implements UserRepository {
	private users: UserDTO[] = [];
	private nextId = 1;

	async findByEmail(email: string): Promise<UserDTO | null> {
		const user = this.users.find((u) => u.email === email);
		return user ?? null;
	}

	async create(data: CreateUserInput): Promise<UserDTO> {
		const now = new Date();
		const user: UserDTO = {
			id: this.nextId++,
			name: data.name,
			email: data.email,
			createdAt: now,
			updatedAt: now,
		};

		this.users.push(user);
		return user;
	}
}

describe("POST /users", () => {
	it("cria um usuário válido", async () => {
		const app = buildApp({
			userRepository: new InMemoryUserRepository(),
		});

		await app.ready();

		const response = await app.inject({
			method: "POST",
			url: "/users",
			payload: {
				name: "Henrique",
				email: "henrique@teste.com",
			},
		});

		expect(response.statusCode).toBe(201);
		expect(response.json()).toEqual({
			user: expect.objectContaining({
				id: 1,
				name: "Henrique",
				email: "henrique@teste.com",
			}),
		});
	});

	it("retorna 409 quando o email já existe", async () => {
		const userRepository = new InMemoryUserRepository();
		await userRepository.create({
			name: "Primeiro",
			email: "repetido@teste.com",
		});

		const app = buildApp({ userRepository });
		await app.ready();

		const response = await app.inject({
			method: "POST",
			url: "/users",
			payload: {
				name: "Segundo",
				email: "repetido@teste.com",
			},
		});

		expect(response.statusCode).toBe(409);
		expect(response.json()).toEqual({
			message: "Email already exists",
		});
	});

	it("retorna 400 para payload inválido", async () => {
		const app = buildApp({
			userRepository: new InMemoryUserRepository(),
		});

		await app.ready();

		const response = await app.inject({
			method: "POST",
			url: "/users",
			payload: {
				name: "",
				email: "email-invalido",
			},
		});

		expect(response.statusCode).toBe(400);
	});
});
