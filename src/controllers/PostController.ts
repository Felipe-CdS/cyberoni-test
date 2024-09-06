import { Request, Response } from "express";
import { PostService } from "../services/PostService";
import { IPost } from "../entities/Post"

class PostController {
	async create(request: Request, response: Response) {

		const { username, title, content } = request.body;

		if(!username || !title || !content) {
			return response.status(400).send("Invalid Form.");
		}

		try  {
			const post = await (new PostService()).create(username, title, content);

			return response.status(200).json(post);

		} catch (err) {
			let msg = 'Unkown error.'
			if(err instanceof Error) msg = err.message;
			return response.status(400).send(msg);
		}
	}

	async read(request: Request, response: Response) {
		const postId = request.params.id as string;

		if(!postId) {
			return response.status(404).end('Id not informed.');
		}

		try  {
			const post = await (new PostService()).read(postId);


			return response.status(200).json(post);
		} catch (err) {
			let msg = 'Unkown error.'
			if(err instanceof Error) msg = err.message;
			return response.status(400).send(msg);
		}
	}

	async readAllByUser(request: Request, response: Response) {

		const username = request.query.username as string;

		if(!username) {
			return response.status(400).end('Name not informed.');
		}

		try  {
			const posts = await (new PostService()).readAllByUser(username);
			return response.status(200).json(posts);

		} catch (err) {
			let msg = 'Unkown error.'
			if(err instanceof Error) msg = err.message;
			return response.status(400).send(msg);
		}
	}

	async update(request: Request, response: Response) {

		var post: IPost | null = null;
		const postId = request.params.id as string;
		const { title, content } = request.body;

		if(!postId) {
			return response.status(404).end('Id not informed.');
		}

		if(title) {
			try  {
				post = await (new PostService()).updateTitle(postId, title);
			} catch (err) {
				let msg = 'Unkown error.'
				if(err instanceof Error) msg = err.message;
				return response.status(400).send(msg);
			}
		}

		if(content) {
			try  {
				post = await (new PostService()).updateContent(postId, content);
			} catch (err) {
				let msg = 'Unkown error.'
				if(err instanceof Error) msg = err.message;
				return response.status(400).send(msg);
			}
		}

		return response.status(200).json(post);
	}

	async delete(request: Request, response: Response) {

		const postId = request.params.id as string;

		if(!postId) {
			return response.status(404).end('Id not informed.');
		}

		try  {
			await (new PostService()).delete(postId);
			return response.status(200).end();
		} catch (err) {
			let msg = 'Unkown error.'
			if(err instanceof Error) msg = err.message;
			return response.status(400).send(msg);
		}
	}
}

export { PostController }
