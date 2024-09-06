import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const seed1 = await prisma.user.create({
		data: { 
			username: "seed1",
			email: "seed1@seed1",
			password: "123",
			name: "seed1",
		}
	})

	const seed2 = await prisma.user.create({
		data: { 
			username: "seed2",
			email: "seed2@seed2",
			password: "123",
			name: "seed2",
		}
	})

	const seed3 = await prisma.user.create({
		data: { 
			username: "seed3",
			email: "seed3@seed3",
			password: "123",
			name: "seed3",
		}
	})

	const postSeed1 = await prisma.post.create({
		data: { 
			title: "Title 1",
			content: "123",
			authorId: seed1.id,
		}
	})

	const postSeed2 = await prisma.post.create({
		data: { 
			title: "Title 2",
			content: "abc",
			authorId: seed1.id,
		}
	})

	const postSeed3 = await prisma.post.create({
		data: { 
			title: "Title 3",
			content: "xyz",
			authorId: seed2.id,
		}
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
