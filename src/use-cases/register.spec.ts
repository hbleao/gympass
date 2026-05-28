import bcrypt from "bcrypt";
import { expect, it, describe } from "vitest";

import { InMemoryUserRepository } from "@/repositories/in-memory-repository";
import { RegisterUserCase } from "./register";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";

const makeSut = () => {
	const registerUserCase = new RegisterUserCase(new InMemoryUserRepository());
	const newUser = {
		name: "Test User",
		email: "test@example.com",
		password: "123456",
	};

	return {
		registerUserCase,
		newUser,
	};
};

describe("Register Use Case", () => {
	it("should be able to register a new user", async () => {
		const { registerUserCase, newUser } = makeSut();
		const { user } = await registerUserCase.execute(newUser);

		expect(user.id).toBeDefined();
	});

	it("should hash user password uppon registration", async () => {
		const { registerUserCase, newUser } = makeSut();
		const { user } = await registerUserCase.execute(newUser);

		const isPasswordValid = await bcrypt.compare(
			newUser.password,
			user.password_hash,
		);
		expect(isPasswordValid).toBe(true);
	});

	it("should throw an error when the email already exists", async () => {
		const { registerUserCase, newUser } = makeSut();

		await registerUserCase.execute(newUser);

		await expect(registerUserCase.execute(newUser)).rejects.toThrowError(
			"User with same email already exists",
		);

		await expect(registerUserCase.execute(newUser)).rejects.toBeInstanceOf(
			UserAlreadyExistsError,
		);
	});
});
