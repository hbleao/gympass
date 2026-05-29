import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import type { User } from "@/interfaces/user";
import type { UserRepository } from "@/interfaces/user-repository";
import { compare } from "bcrypt";

interface AuthenticateUseCaseRequest {
	email: string;
	password: string;
}

interface AuthenticateUseCaseResponse {
	user: User;
}

export class AuthenticateUseCase {
	private readonly userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async execute({
		email,
		password,
	}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) throw new InvalidCredentialsError();

		const doesPasswordMatches = await compare(password, user.password_hash);

		if (!doesPasswordMatches) throw new InvalidCredentialsError();

		return {
			user,
		};
	}
}
