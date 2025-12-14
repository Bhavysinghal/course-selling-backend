import { Router } from "express";
import { userMiddleware } from "../middlewares/user.middleware.js";
import {
  signup,
  signin,
  getPurchases,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

userRouter.post("/purchases", userMiddleware, getPurchases);

export { userRouter };
