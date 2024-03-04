import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express'

export const getHello = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World!' })
}
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
    },
  });
  console.log("New User:", newUser);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
export default main;