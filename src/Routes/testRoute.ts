import { Router } from "express";

import { getHello, userTest } from "../Controller/testController";

const routerTest = Router();

routerTest.get("/", getHello);
routerTest.post("/data", userTest);

export default routerTest;
