import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routerTest from "./Routes/testRoute";
import routerUser from "./Routes/userRoute";
import run from "./server";

const app = express();
const port = process.env.PORT || 3003;

app.use(helmet());
app.use(morgan("tiny"));

app.use(cors());
app.use(express.json());

app.use("/test", routerTest);

app.use("/user", routerUser);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

run();
