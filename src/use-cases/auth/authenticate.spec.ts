import { InMemoryUserRepository } from "@/repositories/in-memory-repository";
import { describe, it, expect } from "vitest";
import bcrypt from "bcrypt";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";

const makeSut = async () => {
	const password = "123456";
	const passwordHash = await bcrypt.hash(password, 10);

	const user = {
		name: "valid_user",
		email: "valid_email@portoseguro.com",
		password_hash: passwordHash,
	};

	const inMemoryUserRepository = new InMemoryUserRepository();
	await inMemoryUserRepository.create(user);

	const authenticateUseCase = new AuthenticateUseCase(inMemoryUserRepository);

	return {
		user,
		password,
		authenticateUseCase,
	};
};

describe("Authenticate Use Case", () => {
	it("should be able to authenticate", async () => {
		const { user, password, authenticateUseCase } = await makeSut();

		const { user: userCredentials } = await authenticateUseCase.execute({
			email: user.email,
			password: password,
		});

		expect(userCredentials.id).toBeTruthy();
	});

	it("should not be able to authenticate with wrong email", async () => {
		const { password, authenticateUseCase } = await makeSut();

		await expect(
			async () =>
				await authenticateUseCase.execute({
					email: "invalid_user_email@gmail.com",
					password: password,
				}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it("should not be able to authenticate with wrong password", async () => {
		const { user, password, authenticateUseCase } = await makeSut();

		await expect(
			async () =>
				await authenticateUseCase.execute({
					email: user.email,
					password: "12345",
				}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
