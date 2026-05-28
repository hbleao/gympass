import { prisma } from "@/db/prisma";
import type { UserRepository } from "@/interfaces/user-repository";
import type { Prisma } from "@/lib/prisma/generated/prisma/client/client";

export class PrismaUserRepository implements UserRepository {
	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password_hash: data.password_hash,
			},
		});

		return user;
	}

	async findByEmail(email: string) {
		return await prisma.user.findUnique({
			where: {
				email,
			},
		});
	}
}
