import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { lucia } from "./middleware/userMiddleWare";
import routerComment from "./Routes/commentRoute";
import routerExperience from "./Routes/experienceRoute";
import routerFollower from "./Routes/follower.Route";
import routerJob from "./Routes/jobsRoute";
import routerLike from "./Routes/likeRoute";
import routerPost from "./Routes/postRoute";
import routerTest from "./Routes/testRoute";
import routerUser from "./Routes/userRoute";
import run from "./server";

const app = express();
const port = process.env.PORT || 3003;

app.use(cookieParser());
app.use(helmet());
app.use(morgan("tiny"));
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", routerTest);
app.use("/user", routerUser);
app.use("/comment", routerComment);
app.use("/experience", routerExperience);
app.use("/job", routerJob);
app.use("/post", routerPost);
app.use("/like", routerLike);
app.use("/follower", routerFollower);

try {
  await lucia.deleteExpiredSessions();
  console.log("les sessions expirées ont été supprimées");
} catch (error) {
  console.error("erreur lors de la suppression des sessions expirées", error);
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

run();
