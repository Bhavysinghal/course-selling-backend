import express from "express";
import { adminRouter } from "./routes/admin.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { courseRouter } from "./routes/course.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

export default app;
