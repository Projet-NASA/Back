import express from 'express';
import run from './server';
import 'dotenv/config';
import routerTest from './Routes/testRoute';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.use('/test', routerTest);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});  

run();



