import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  adminSignup,
  adminSignin,
  createCourse,
  updateCourse,
  deleteCourse,
  getAdminCourses,
} from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/signup", adminSignup);

adminRouter.post("/signin", adminSignin);

adminRouter.post("/course", adminMiddleware, createCourse);
adminRouter.put("/course", adminMiddleware, updateCourse);
adminRouter.delete("/course", adminMiddleware, deleteCourse);
adminRouter.get("/course/bulk", adminMiddleware, getAdminCourses);

export { adminRouter };
