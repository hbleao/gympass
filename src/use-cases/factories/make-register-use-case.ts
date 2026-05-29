import { PrismaUserRepository } from "@/repositories/prisma-user-repository";
import { RegisterUserCase } from "../users/register";

export const makeRegisterFactoryUseCase = () => {
	const prismaUserRepository = new PrismaUserRepository();
	const registerUseCase = new RegisterUserCase(prismaUserRepository);

	return {
		prismaUserRepository,
		registerUseCase,
	};
};
