import express from 'express';
import run from './server';
import 'dotenv/config';
import { addUserTest } from './Controller/testController';

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

app.use('/user', addUserTest);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});  

run();



