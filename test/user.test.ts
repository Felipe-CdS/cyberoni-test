import request from "supertest"
import { app } from "../src/server"

describe("GET /users", () => {
	it("Get a single user by username.", async () => {
		const { body, status } = await request(app).get("/users/seed1");

		expect(status).toBe(200);
		expect(body)
		.toEqual({
			    "email": "seed1@seed1",
			    "username": "seed1",
			    "name": "seed1"
			});
	});

	it("Get users list.", async () => {
		const { body, status } = await request(app).get("/users?page=1");

		expect(status).toBe(200);
		expect(body)
		.toEqual({
			    "page": 1,
			    "users": [
				{
				    "username": "seed1",
				    "email": "seed1@seed1",
				    "name": "seed1"
				},
				{
				    "username": "seed2",
				    "email": "seed2@seed2",
				    "name": "seed2"
				},
				{
				    "username": "seed3",
				    "email": "seed3@seed3",
				    "name": "seed3"
				}
			    ]
			});
	});
});

describe("POST /users", () => {
	it("Create a new user and return 200.", async () => {
		await request(app)
			.post("/users")
			.send({
				"username": "user123",
				"email": "user@user",
				"name": "user user",
				"password": "12345"
			})
			.set('Accept', 'application/json')
			.expect(200);
		});

	it("Try to create a user with an email that already exists.", async () => {
		await request(app)
			.post("/users")
			.send({
				"username": "user1",
				"email": "seed1@seed1",
				"name": "user user",
				"password": "12345"
			})
			.set('Accept', 'application/json')
			.expect(400);
		});
});

describe("PATCH /users", () => {
	it("Change a user's email", async () => {

		const { body, status } = await request(app)
			.patch("/users/seed2")
			.send({
				"email": "newemail@seed2",
			});

		expect(status).toBe(200);
		expect(body)
		.toEqual({
			    "email": "newemail@seed2",
			    "username": "seed2",
			    "name": "seed2"
		});
	});
});

describe("DELETE /users", () => {
	it("Delete a user.", async () => {
		const { body, status } = await request(app).delete("/users/seed3");

		expect(status).toBe(200);
	});
});
