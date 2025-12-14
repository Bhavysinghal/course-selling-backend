import { Router } from "express";
import { userMiddleware } from "../middlewares/user.middleware.js";
import {
  purchaseCourse,
  previewCourses,
} from "../controllers/course.controller.js";

const courseRouter = Router();

courseRouter.get("/preview", previewCourses);
courseRouter.post("/purchase", userMiddleware, purchaseCourse);

export { courseRouter };
