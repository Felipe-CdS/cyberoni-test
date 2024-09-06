import request from "supertest"
import { app } from "../src/server"
import { prisma } from "../src/server"

describe("POST /posts", () => {
	it("Create a new post.", async () => {
		await request(app)
			.post("/posts")
			.send({
				"username": "seed1",
				"title": "AAAAA",
				"content": "bbbbbb",
			})
			.expect(200);
		});
});

describe("GET /posts", () => {
	it("Get a single post.", async () => {

		const post =  await prisma.post.findMany({ where: { title: "Title 1" } });
		const author =  await prisma.user.findUnique({ where: { username: "seed1" } });

		const { body, status } = await request(app).get(`/posts/${post[0].postId}`);

		expect(status).toBe(200);
		expect(body)
		.toEqual(post[0]);
	});

	it("Get all posts of a single user.", async () => {

		const author = await prisma.user.findUnique({ where: { username: "seed1" } });
		const posts = await prisma.post.findMany({ where: { authorId: author!.id } });

		const { body, status } = await request(app).get(`/posts?username=seed1`);

		expect(status).toBe(200);
		expect(body)
		.toEqual(posts);
	});
});

describe("PATCH /posts", () => {
	it("Update post title.", async () => {

		const post =  await prisma.post.findMany({ where: { title: "Title 1" } });

		const { body, status } = await request(app)
						.patch(`/posts/${post[0].postId}`)
						.send({
							"title": "New Title",
						});

		expect(status).toBe(200);
		expect(body)
		.toEqual({
			"title": "New Title",
			"content": post[0].content,
			"postId": post[0].postId,
			"authorId": post[0].authorId,
		});
	});

	it("Update post content.", async () => {

		const post =  await prisma.post.findMany({ where: { title: "New Title" } });

		const { body, status } = await request(app)
						.patch(`/posts/${post[0].postId}`)
						.send({
							"content": "New Content",
						});

		expect(status).toBe(200);
		expect(body)
		.toEqual({
			"title": post[0].title,
			"content": "New Content",
			"postId": post[0].postId,
			"authorId": post[0].authorId,
		});
	});
});

describe("DELETE /posts", () => {

	it("Delete post.", async () => {

		const post =  await prisma.post.findMany({ where: { title: "Title 3" } });

		const { body, status } = await request(app).delete(`/posts/${post[0].postId}`);

		expect(status).toBe(200);
	});
});
