import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
	async create(request: Request, response: Response) {

		const { username, email, password, name } = request.body;

		// A better form validation could be built with assistance of a library like express-validator
		if(!username || !email || !password || !email) {
			return response.status(400).send("Invalid Form.");
		}

		try  {
			const usr = await (new UserService()).create({username, email, password, name});

			return response.status(200).json(usr);

		} catch (err) {
			let msg = 'Unkown error.'
			if(err instanceof Error) msg = err.message;
			return response.status(400).send(msg);
		}
	}

	async readOne(request: Request, response: Response) {
		const username = request.params.username as string;

		if(!username) {
			return response.status(400).end('Name not informed.');
		}

		try  {
			const usr = await (new UserService()).readOne(username);
			return response.status(200).json(usr);

		} catch (err) {
			let msg = 'Unkown error.'
			if(err instanceof Error) msg = err.message;
			return response.status(400).send(msg);
		}
	}

	async readByPage(request: Request, response: Response) {

		const page = parseInt(request.query.page as string);

		if(!page) {
			return response.redirect(301, "/users?page=1");
		}

		const result = await (new UserService()).readByPage(page);

		return response.status(200).json({
			page: page,
			users: result
		});
	}

	async update(request: Request, response: Response) {

		const username = request.params.username as string;

		if(!username) {
			return response.status(400).end('Name not informed.');
		}

		const { newUsername, email, password, name } = request.body;

		try  {
			const usr = await (new UserService()).update(username, { username: newUsername, email, password, name});
			return response.status(200).json(usr);
		} catch (err) {
			let msg = 'Unkown error.'
			if(err instanceof Error) msg = err.message;
			return response.status(400).send(msg);
		}
	}

	async delete(request: Request, response: Response) {
		const username = request.params.username as string;

		if(!username) {
			return response.status(400).end('Name not informed.');
		}

		try  {
			await (new UserService()).delete(username);
			return response.status(200).end();

		} catch (err) {
			let msg = 'Unkown error.'
			if(err instanceof Error) msg = err.message;
			return response.status(400).send(msg);
		}
	}
}

export { UserController }
