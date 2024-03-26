import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routerTest from "./Routes/testRoute";
import routerUser from "./Routes/userRoute";
import routerComment from "./Routes/commentRoute";
import routerExperience from "./Routes/experienceRoute";
import routerJob from "./Routes/jobsRoute";
import routerPost from "./Routes/postRoute";
import routerLike from "./Routes/likeRoute";
import run from "./server";

const app = express();
const port = process.env.PORT || 3003;

app.use(helmet());
app.use(morgan("tiny"));

app.use(cors());
app.use(express.json());

app.use("/", routerTest);
app.use("/user", routerUser);
app.use("/comment", routerComment);
app.use("/experience", routerExperience);
app.use("/job", routerJob);
app.use("/post", routerPost);
app.use("/like", routerLike);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

run();
