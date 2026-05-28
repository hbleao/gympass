import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import type { UserRepository } from "@/interfaces/user-repository";
import bcrypt from "bcrypt";

export class RegisterUserCase {
	private usersRepository: UserRepository;

	constructor(usersRepository: UserRepository) {
		this.usersRepository = usersRepository;
	}

	async execute(request: {
		name: string;
		email: string;
		password: string;
	}) {
		const userWithEmailExists = await this.usersRepository.findByEmail(
			request.email,
		);

		if (userWithEmailExists) {
			throw new UserAlreadyExistsError();
		}

		const passwordHash = await bcrypt.hash(request.password, 10);

		const user = await this.usersRepository.create({
			name: request.name,
			email: request.email,
			password_hash: passwordHash,
		});

		return {
			user,
		};
	}
}
