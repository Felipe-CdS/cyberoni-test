import { hash } from "bcryptjs";
import { prisma } from "../server"
import { IUser } from "../entities/User"

class UserService {
	async create({ username, email, password, name }: IUser) {

		const hashedPassword = await hash(password, 12);

		try {
			const usr = await prisma.user.create({
				data: { 
					username: username,
					email: email,
					password: hashedPassword,
					name: name
				}
			});

			if(!usr){
				throw new Error();
			}

			return ({
				username: usr.username,
				email: usr.email,
				name: usr.name
			});

		} catch (e) {
			// Todo: Improve error handling to catch different cases.
			throw new Error("User already exists or could not be created.");
		}
	}

	async readOne(username: string) {
		const usr = await prisma.user.findUnique({
			where: { username: username },
		});

		if(!usr){
			throw new Error("Search error.");
		}

		return ({
			username: usr.username,
			email: usr.email,
			name: usr.name
		});
	}

	async readByPage(page: number) {
		const result: any[] = [];

		const users = await prisma.user.findMany({
			orderBy: { username: 'asc' },
			skip: 10 * (page - 1),
			take: 10 * page,
		});


		if(!users){
			throw new Error("Search error.");
		}

		users.map((usr) => {
			result.push({
					username: usr.username,
					email: usr.email,
					name: usr.name
				});
		})

		return result;
	}

	async update(oldUsername: string, { username, email, password, name }: IUser) {

		var changeFlag = false;
		var changes = {
			username: "",
			email: "",
			password: "",
			name: ""
		}

		if(username && username.length > 0) {
			changes.username = username;
			changeFlag = true;
		}

		if(email && email.length > 0) {
			changes.email = email;
			changeFlag = true;
		}

		if(password && password.length > 0) {
			changes.password = await hash(password, 12);
			changeFlag = true;
		}

		if(name && name.length > 0) {
			changes.name = name;
			changeFlag = true;
		}

		if(!changeFlag){
			return null;
		}

		for (var propName in changes) {
			if (changes[propName as keyof typeof changes] === "") delete changes[propName as keyof typeof changes];
		}

		const updatedUsr = await prisma.user.update({
			where: { username: oldUsername },
			data: changes,
		});

		return ({
			username: updatedUsr.username,
			email: updatedUsr.email,
			name: updatedUsr.name
		});
	}

	async delete(username: string) {
		await prisma.user.delete({
			where: { username: username },
		});
	}
}


export { UserService }

