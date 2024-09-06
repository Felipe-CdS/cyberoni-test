import express, { Application } from "express";
import { PrismaClient } from '@prisma/client'
import { router } from "./routes";

export const prisma = new PrismaClient();

const app: Application = express();

app.use(express.json());

app.use(router);

app.listen(process.env.PORT || 0, () => {
	console.log("Server Up!");
});

export { app }
