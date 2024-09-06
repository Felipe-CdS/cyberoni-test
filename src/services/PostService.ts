import { prisma } from "../server"
import { IPost } from "../entities/Post"

class PostService {
	async create(username: string, title: string, content: string) {

		const author = await prisma.user.findUnique({
			where: { username: username },
		});

		if(!author){
			throw new Error("Author not found.");
		}

		try {
			const post = await prisma.post.create({
				data: { 
					title: title,
					content: content,
					authorId: author.id,
				}
			});

			if(!post){
				throw new Error();
			}

			return post;

		} catch (e) {
			throw new Error("Post couldn't be created.");
		}
	}

	async read(postId: string) {
		try {
			return await prisma.post.findUnique({
				where: { postId: postId }
			});
		} catch (e) {
			throw new Error("Error searching.");
		}
	}

	async readAllByUser(username: string) {

		const author = await prisma.user.findUnique({
			where: { username: username },
		});

		if(!author){
			throw new Error("Author not found.");
		}

		try {
			return await prisma.post.findMany({
				where: { authorId: author.id }
			});
		} catch (e) {
			throw new Error("Error searching.");
		}
	}

	async updateTitle(postId: string, newTitle: string) {

		var post: IPost | null;

		try {
			post = await prisma.post.findUnique({
				where: { postId: postId }
			});
		} catch (e) {
			throw new Error("Error searching.");
		}

		try {
			return await prisma.post.update({
				where: { postId: postId },
				data: { title: newTitle }
			});
		} catch (e) {
			throw new Error("Error searching.");
		}
	}

	async updateContent(postId: string, newContent: string) {

		var post: IPost | null;

		try {
			post = await prisma.post.findUnique({
				where: { postId: postId }
			});
		} catch (e) {
			throw new Error("Error searching.");
		}

		try {
			return await prisma.post.update({
				where: { postId: postId },
				data: { content: newContent }
			});
		} catch (e) {
			throw new Error("Error searching.");
		}
	}

	async delete(postId: string) {

		const deleted = await prisma.post.delete({
			where: { postId: postId },
		});
		return deleted;
	}
}


export { PostService }

