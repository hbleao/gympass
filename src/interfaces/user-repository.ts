import type { User } from "@/interfaces/user";

export interface UserRepository {
	findByEmail(email: string): Promise<User | null>;
	create(data: {
		name: string;
		email: string;
		password_hash: string;
	}): Promise<User>;
}
