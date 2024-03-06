import express from 'express';
import run from './server';
import 'dotenv/config';
import routerTest from './Routes/testRoute';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3003;

app.use(helmet())
app.use(morgan('tiny'))

app.use(cors());
app.use(express.json());

app.use('/test', routerTest);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});  

run();



