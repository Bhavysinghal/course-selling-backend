import { Course, Purchase } from "../models/index.js";
import { purchaseCourseSchema } from "../validators/index.js";

export async function purchaseCourse(req, res) {
  const parsed = purchaseCourseSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid data",
    });
  }
  const courseId = parsed.data;
  const userId = req.userId;

  const existingPurchase = await Purchase.findOne({
    userId,
    courseId,
  });
  if (existingPurchase) {
    return res
      .status(400)
      .json({ message: "You have already bought this course" });
  }
  await Purchase.create({
    userId,
    courseId,
  });
  res.status(201).json({ message: "Course purchase successfully" });
}

export async function previewCourses(req, res) {
  const courses = await Course.find({});
  res.json({ courses });
}
