import { PrismaUserRepository } from "@/repositories/prisma-user-repository";
import { AuthenticateUseCase } from "../auth/authenticate";

export const makeAuthenticateFactoryUseCase = () => {
	const prismaUserRepository = new PrismaUserRepository();
	const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository);

	return {
		prismaUserRepository,
		authenticateUseCase,
	};
};
