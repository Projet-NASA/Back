import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express'

export const getHello = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World!' })
}
const prisma = new PrismaClient();

export const addUserTest = async (req: Request,res: Response) => {
    const { name, email } = req.body;
    const user = await prisma.users.create({
        data: {
            name ,
            email,
        },
    });
    res.status(201).json({ user });
}