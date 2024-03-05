import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express'

export const getHello = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World!' })
}
const prisma = new PrismaClient();

export const userTest = async (req: Request,res: Response) => {
    const { name, email } = req.body;
    try {
        const user = await prisma.user.create({
        data: {
            name ,
            email,
        },
    });
    res.status(200).json({ message : 'User added successfully'});
    

    }catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
    
}