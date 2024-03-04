import express from 'express';
import { PrismaClient } from '@prisma/client';
import run from './server';
import 'dotenv/config';
import testController from './Controller/testController';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

app.get('/', async (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});  

run();
testController();


