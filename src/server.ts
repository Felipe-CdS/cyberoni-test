import express, { Application } from "express";
import { PrismaClient } from '@prisma/client'
import { router } from "./routes";

export const prisma = new PrismaClient();

const app: Application = express();

app.use(express.json());

app.use(router);

var port: number = 3000;

if(process.env.NODE_ENV == "test") port = 0;

app.listen(process.env.PORT || port, () => {
	console.log(`Server Up! Port: ${port}`);
});

export { app }
