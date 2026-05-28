import type { User } from "@/interfaces/user";
import type { UserRepository } from "@/interfaces/user-repository";

export class InMemoryUserRepository implements UserRepository {
	public users: User[] = [];

	async create(data: { name: string; email: string; password_hash: string }) {
		const user = {
			id: crypto.randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date(),
		};

		this.users.push(user);
		return user;
	}

	async findByEmail(email: string) {
		return this.users.find((user) => user.email === email) ?? null;
	}
}
