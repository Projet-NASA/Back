import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routerComment from "./Routes/commentRoute";
import routerExperience from "./Routes/experienceRoute";
import routerFollower from "./Routes/follower.Route";
import routerJob from "./Routes/jobsRoute";
import routerLike from "./Routes/likeRoute";
import routerPost from "./Routes/postRoute";
import routerTest from "./Routes/testRoute";
import routerUser from "./Routes/userRoute";
import run from "./server";
import cookieParser from 'cookie-parser';


const app = express();
const port = process.env.PORT || 3003;

app.use(cookieParser());
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
app.use("/follower", routerFollower);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

run();
