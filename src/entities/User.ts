import { hash, compare } from "bcryptjs";

class User {
	readonly id: string;

	username: string;

	email: string;

	password: string;

	name: string;

	static async comparePassword(candidate: string, hashed: string) {
		return await compare(candidate, hashed);
	}
}

interface IUser {
	username: string;
	email: string;
	password: string;
	name: string;
}

export { User, IUser }
