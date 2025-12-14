import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin, Course } from "../models/index.js";
import { JWT_ADMIN_PASSWORD } from "../config/index.js";
import {
  adminSigninSchema,
  adminSignupSchema,
  createCourseSchema,
  updateCourseSchema,
  deleteCourseSchema,
} from "../validators/index.js";

export async function adminSignup(req, res) {
  const parsed = adminSignupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "invaled data" });
  }
  const { email, password, firstName, lastName } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await Admin.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    return res.status(201).json({ message: "Admin Signup successful" });
  } catch (error) {
    return res.status(409).json({ message: "Admin already exists" });
  }
}

export async function adminSignin(req, res) {
  const parsed = adminSigninSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "invaled data" });
  }
  const { email, password } = parsed.data;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(403).json({ message: "Invalid credentials" });
  }
  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    return res.status(403).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    {
      adminId: admin._id,
    },
    JWT_ADMIN_PASSWORD,
    {
      expiresIn: "1h",
    },
  );
  res.json({ token });
}

export async function createCourse(req, res) {
  const parsed = createCourseSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "invaled data" });
  }
  const course = await Course.create({
    ...parsed.data,
    creatorId: req.adminId,
  });
  res.status(201).json({
    message: "Course created",
    courseId: course._id,
  });
}

export async function updateCourse(req, res) {
  const parsed = updateCourseSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "invaled data" });
  }
  const { courseId, ...updates } = parsed.data;

  const course = await Course.findOne({
    _id: courseId,
    creatorId: req.adminId,
  });
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  await Course.updateOne(
    {
      _id: courseId,
    },
    { $set: updates },
  );
  res.json({ message: "Course updated" });
}

export async function deleteCourse(req, res) {
  const parsed = deleteCourseSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const { courseId } = parsed.data;

  const deleted = await Course.deleteOne({
    _id: courseId,
    creatorId: req.adminId,
  });

  if (!deleted.deletedCount) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json({ message: "Course deleted" });
}

export async function getAdminCourses(req, res) {
  const courses = await Course.find({
    creatorId: req.adminId,
  });

  res.json({ courses });
}
